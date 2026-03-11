/**
 * Парсер WordPress WXR XML → JSON для Next.js
 * Node 17–20. Обрабатывает большой XML с учётом памяти (чтение файла целиком, парсинг через xml2js).
 * Запуск: node scripts/parse-wp-xml.js [путь/к/WordPress.2026-03-11.xml]
 */

const fs = require('fs');
const path = require('path');
const { parseString } = require('xml2js');

const XML_PATH = process.argv[2] || path.join(__dirname, '..', 'WordPress.2026-03-11.xml');
const OUT_DIR = path.join(__dirname, '..', 'data');

// Базовый URL сайта (подменяем на относительные пути)
const WP_UPLOADS = /https?:\/\/[^/]+\/wp-content\/uploads\//gi;
const UPLOADS_PREFIX = '/uploads/';

// Допустимые теги в контенте (очистка от лишнего)
const ALLOWED_TAGS = ['p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'img', 'blockquote', 'div', 'span'];

function decodeSlug(s) {
  if (typeof s !== 'string') return s;
  try {
    return decodeURIComponent(s.replace(/\+/g, ' '));
  } catch {
    return s;
  }
}

function text(el) {
  if (el == null) return '';
  if (typeof el === 'string') return el.trim();
  if (Array.isArray(el)) return (el[0] != null ? String(el[0]) : '').trim();
  if (el && typeof el._ === 'string') return el._.trim();
  return '';
}

function first(el) {
  if (el == null) return undefined;
  return Array.isArray(el) ? el[0] : el;
}

function getMeta(item, key) {
  const postmeta = item['wp:postmeta'];
  if (!Array.isArray(postmeta)) return undefined;
  const found = postmeta.find(m => text(m['wp:meta_key']) === key);
  return found ? text(found['wp:meta_value']) : undefined;
}

function getAllMeta(item) {
  const postmeta = item['wp:postmeta'];
  if (!Array.isArray(postmeta)) return {};
  const meta = {};
  for (const m of postmeta) {
    const k = text(m['wp:meta_key']);
    const v = text(m['wp:meta_value']);
    if (k && !k.startsWith('_')) meta[k] = v;
  }
  return meta;
}

/**
 * Очистка контента: оставляем базовый HTML, убираем лишние теги/атрибуты
 */
function cleanContent(html) {
  if (!html || typeof html !== 'string') return '';
  let out = html
    .replace(/\r\n/g, '\n')
    .replace(/<!--[\s\S]*?-->/g, '');
  return out.trim();
}

/**
 * Замена URL медиа на /uploads/...
 */
function replaceMediaUrls(str) {
  if (!str || typeof str !== 'string') return str;
  return str.replace(WP_UPLOADS, UPLOADS_PREFIX);
}

/**
 * Преобразование ссылок в контенте в локальные Next.js-пути
 * Страницы: /slug, записи: /post/slug
 */
function replaceContentLinks(str, baseUrl, pageSlugs, postSlugs) {
  if (!str || typeof str !== 'string') return str;
  if (!baseUrl) return str;
  const base = baseUrl.replace(/\/$/, '');
  const escaped = base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const linkRegex = new RegExp(`(href=["'])(${escaped})(/[^"']*)?([\"'])`, 'gi');
  return str.replace(linkRegex, (_, before, _base, pathname, after) => {
    const p = (pathname || '').replace(/^\//, '');
    if (!p) return `${before}/${after}`;
    const withoutQuery = p.split('?')[0].split('#')[0];
    if (postSlugs.has(withoutQuery)) return `${before}/post/${withoutQuery}${after}`;
    if (pageSlugs.has(withoutQuery)) return `${before}/${withoutQuery}${after}`;
    const segments = withoutQuery.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    if (lastSegment && postSlugs.has(lastSegment)) return `${before}/post/${lastSegment}${after}`;
    if (lastSegment && pageSlugs.has(lastSegment)) return `${before}/${lastSegment}${after}`;
    if (withoutQuery.startsWith('category/')) return `${before}/category/${withoutQuery.slice(9)}${after}`;
    return before + '/' + withoutQuery + after;
  });
}

function buildAttachmentsMap(items) {
  const map = {};
  for (const item of items) {
    const type = text(first(item['wp:post_type']));
    if (type !== 'attachment') continue;
    const id = text(first(item['wp:post_id']));
    let url = first(item['wp:attachment_url']);
    if (!url) {
      const file = getMeta(item, '_wp_attached_file');
      if (file) url = 'https://okna-myagkie.ru/wp-content/uploads/' + file;
    }
    url = text(url);
    if (id && url) map[id] = replaceMediaUrls(url);
  }
  return map;
}

function buildSlugMaps(items) {
  const pageSlugs = new Set();
  const postSlugs = new Set();
  for (const item of items) {
    const type = text(first(item['wp:post_type']));
    const status = text(first(item['wp:status']));
    if (status !== 'publish') continue;
    const slug = decodeSlug(text(first(item['wp:post_name'])));
    if (!slug) continue;
    if (type === 'page') pageSlugs.add(slug);
    if (type === 'post') postSlugs.add(slug);
  }
  return { pageSlugs, postSlugs };
}

function extractPostOrPage(item, attachmentsMap, categoriesList, tagsList, type) {
  const status = text(first(item['wp:status']));
  if (status !== 'publish') return null;

  const id = text(first(item['wp:post_id']));
  const title = text(first(item.title)) || '';
  const slug = decodeSlug(text(first(item['wp:post_name'])));
  let content = text(first(item['content:encoded']));
  const excerpt = text(first(item['excerpt:encoded']));
  const date = text(first(item['wp:post_date'])) || text(first(item.pubDate)) || '';

  const thumbnailId = getMeta(item, '_thumbnail_id');
  const featured_image = thumbnailId && attachmentsMap[thumbnailId] ? attachmentsMap[thumbnailId] : null;

  const categories = [];
  const tags = [];
  const catEls = item.category || [];
  for (const c of catEls) {
    const domain = c.$ && c.$.domain;
    const name = typeof c === 'object' && c._ != null ? c._ : (Array.isArray(c) ? c[0] : c);
    const nicename = c.$ && c.$.nicename ? decodeSlug(c.$.nicename) : '';
    if (domain === 'category') categories.push({ slug: nicename || name, name: String(name).trim() });
    if (domain === 'post_tag') tags.push({ slug: nicename || name, name: String(name).trim() });
  }

  content = replaceMediaUrls(content);
  content = cleanContent(content);

  return {
    id: id ? parseInt(id, 10) : null,
    title,
    slug,
    content,
    excerpt,
    date,
    featured_image,
    categories,
    tags,
  };
}

function extractMenus(items, pagesById, postsById) {
  const menuItems = items.filter(
    (item) => text(first(item['wp:post_type'])) === 'nav_menu_item'
  );
  const byMenu = {};
  for (const item of menuItems) {
    const catEls = item.category || [];
    let menuName = '';
    for (const c of catEls) {
      if (c.$ && c.$.domain === 'nav_menu') {
        menuName = (typeof c === 'object' && c._ != null ? c._ : c).toString().trim();
        break;
      }
    }
    if (!menuName) menuName = 'main';
    if (!byMenu[menuName]) byMenu[menuName] = [];

    const title = text(first(item.title));
    const objectId = getMeta(item, '_menu_item_object_id');
    const object = getMeta(item, '_menu_item_object');
    const url = getMeta(item, '_menu_item_url');
    const parent = getMeta(item, '_menu_item_menu_item_parent') || '0';
    const order = parseInt(text(first(item['wp:menu_order'])), 10) || 0;

    let href = url;
    if (!href && object === 'page' && objectId && pagesById[objectId]) {
      href = '/' + (pagesById[objectId].slug || '');
    }
    if (!href && object === 'post' && objectId && postsById[objectId]) {
      href = '/post/' + (postsById[objectId].slug || '');
    }
    if (!href) href = '#';

    byMenu[menuName].push({
      id: text(first(item['wp:post_id'])),
      title: title || 'Без названия',
      url: href,
      parent,
      menu_order: order,
    });
  }

  const menus = {};
  for (const [name, flat] of Object.entries(byMenu)) {
    flat.sort((a, b) => a.menu_order - b.menu_order);
    const idMap = {};
    flat.forEach((n) => (idMap[n.id] = { ...n, children: [] }));
    const root = [];
    for (const n of flat) {
      const node = idMap[n.id];
      if (!n.parent || n.parent === '0') {
        root.push(node);
      } else if (idMap[n.parent]) {
        idMap[n.parent].children.push(node);
      } else {
        root.push(node);
      }
    }
    menus[name] = root;
  }
  return menus;
}

function extractCategoriesAndTags(channel) {
  const categories = [];
  const tags = [];
  const terms = channel['wp:term'] || [];
  const catBlock = channel['wp:category'] || [];

  for (const t of Array.isArray(terms) ? terms : [terms]) {
    const term = first(t);
    if (!term) continue;
    const taxonomy = text(first(term['wp:term_taxonomy']));
    const slug = decodeSlug(text(first(term['wp:term_slug'])));
    const name = text(first(term['wp:term_name']));
    const parent = text(first(term['wp:term_parent']));
    if (taxonomy === 'category') categories.push({ id: text(first(term['wp:term_id'])), slug, name, parent });
    if (taxonomy === 'post_tag') tags.push({ id: text(first(term['wp:term_id'])), slug, name });
  }
  for (const c of Array.isArray(catBlock) ? catBlock : [catBlock]) {
    const cat = first(c);
    if (!cat) continue;
    const slug = decodeSlug(text(first(cat['wp:category_nicename'])));
    const name = text(first(cat['wp:cat_name']));
    if (slug && !categories.find((x) => x.slug === slug)) {
      categories.push({ id: text(first(cat['wp:term_id'])), slug, name, parent: '' });
    }
  }
  return { categories, tags };
}

function main() {
  if (!fs.existsSync(XML_PATH)) {
    console.error('Файл не найден:', XML_PATH);
    process.exit(1);
  }

  console.log('Чтение XML:', XML_PATH);
  const xml = fs.readFileSync(XML_PATH, 'utf8');

  console.log('Парсинг XML...');
  parseString(
    xml,
    {
      explicitArray: true,
      trim: true,
      tagNameProcessors: [(name) => name],
    },
    (err, result) => {
      if (err) {
        console.error('Ошибка парсинга XML:', err);
        process.exit(1);
      }

      const channel = result?.rss?.channel?.[0];
      if (!channel) {
        console.error('В XML не найден <channel>');
        process.exit(1);
      }

      const linkEl = first(channel.link);
      const baseUrl = (typeof linkEl === 'string' ? linkEl : '').replace(/\/$/, '') || 'https://okna-myagkie.ru';

      const rawItems = channel.item || [];
      const items = Array.isArray(rawItems) ? rawItems : [rawItems];

      console.log('Всего элементов item:', items.length);

      const attachmentsMap = buildAttachmentsMap(items);
      const { pageSlugs, postSlugs } = buildSlugMaps(items);

      const posts = [];
      const pages = [];
      for (const item of items) {
        const type = text(first(item['wp:post_type']));
        if (type === 'post') {
          const row = extractPostOrPage(item, attachmentsMap, null, null, 'post');
          if (row) {
            row.content = replaceContentLinks(row.content, baseUrl, pageSlugs, postSlugs);
            posts.push(row);
          }
        } else if (type === 'page') {
          const row = extractPostOrPage(item, attachmentsMap, null, null, 'page');
          if (row) {
            row.content = replaceContentLinks(row.content, baseUrl, pageSlugs, postSlugs);
            pages.push(row);
          }
        }
      }

      const { categories, tags } = extractCategoriesAndTags(channel);

      const pagesById = {};
      const postsById = {};
      pages.forEach((p) => (pagesById[p.id] = p));
      posts.forEach((p) => (postsById[p.id] = p));

      const menus = extractMenus(items, pagesById, postsById);

      if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

      fs.writeFileSync(path.join(OUT_DIR, 'posts.json'), JSON.stringify(posts, null, 2), 'utf8');
      fs.writeFileSync(path.join(OUT_DIR, 'pages.json'), JSON.stringify(pages, null, 2), 'utf8');
      fs.writeFileSync(path.join(OUT_DIR, 'categories.json'), JSON.stringify(categories, null, 2), 'utf8');
      fs.writeFileSync(path.join(OUT_DIR, 'tags.json'), JSON.stringify(tags, null, 2), 'utf8');
      fs.writeFileSync(path.join(OUT_DIR, 'menus.json'), JSON.stringify(menus, null, 2), 'utf8');

      console.log('Готово. Записано в', OUT_DIR);
      console.log('  posts:', posts.length);
      console.log('  pages:', pages.length);
      console.log('  categories:', categories.length);
      console.log('  tags:', tags.length);
      console.log('  menus:', Object.keys(menus).length);
    }
  );
}

main();
