/**
 * Парсер экспорта блога (WordPress WXR) → data/posts.json
 * Тип записей: wp:post_type=blog. Контент в ACF: preview (кратко), detail (полный HTML), img (ID картинки).
 * Запуск: node scripts/parse-blog-xml.js [путь/к/blog.xml]
 */

const fs = require('fs');
const path = require('path');
const { parseString } = require('xml2js');

const XML_PATH = process.argv[2] || path.join(__dirname, '..', 'blog.xml');
const OUT_DIR = path.join(__dirname, '..', 'data');
const WP_UPLOADS = /https?:\/\/[^/]+\/wp-content\/uploads\//gi;
const UPLOADS_PREFIX = '/uploads/';

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
  const found = postmeta.find((m) => text(m['wp:meta_key']) === key);
  return found ? text(found['wp:meta_value']) : undefined;
}

function replaceMediaUrls(str) {
  if (!str || typeof str !== 'string') return str;
  return str.replace(WP_UPLOADS, UPLOADS_PREFIX);
}

function cleanContent(html) {
  if (!html || typeof html !== 'string') return '';
  return html
    .replace(/\r\n/g, '\n')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim();
}

function buildAttachmentsMap(items) {
  const map = {};
  const baseUploads = 'https://okna-myagkie.ru/wp-content/uploads/';
  for (const item of items) {
    if (text(first(item['wp:post_type'])) !== 'attachment') continue;
    const id = text(first(item['wp:post_id']));
    let url = first(item['wp:attachment_url']);
    if (!url) {
      const file = getMeta(item, '_wp_attached_file');
      if (file) url = baseUploads + file;
    }
    url = text(url);
    if (id && url) map[id] = replaceMediaUrls(url);
  }
  return map;
}

/**
 * В контенте ссылки на другие статьи блога переводим в /blog/slug
 */
function replaceBlogLinks(str, baseUrl) {
  if (!str || typeof str !== 'string') return str;
  const base = (baseUrl || 'https://okna-myagkie.ru').replace(/\/$/, '');
  const blogPathRegex = new RegExp(
    '(href=["\']?)' + base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '/blog/([^"\'?&#]+)(["\']?)',
    'gi'
  );
  return str.replace(blogPathRegex, (_, before, pathPart, after) => {
    const slug = decodeSlug(pathPart.replace(/\/$/, ''));
    return before + '/blog/' + slug + (after || '');
  });
}

function main() {
  if (!fs.existsSync(XML_PATH)) {
    console.error('Файл не найден:', XML_PATH);
    console.error('Использование: node scripts/parse-blog-xml.js [путь/к/blog.xml]');
    process.exit(1);
  }

  console.log('Чтение XML:', XML_PATH);
  const xml = fs.readFileSync(XML_PATH, 'utf8');

  parseString(
    xml,
    { explicitArray: true, trim: true },
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

      const attachmentsMap = buildAttachmentsMap(items);

      const posts = [];
      const blogSlugs = [];

      for (const item of items) {
        const type = text(first(item['wp:post_type']));
        if (type !== 'blog') continue;
        if (text(first(item['wp:status'])) !== 'publish') continue;

        const id = text(first(item['wp:post_id']));
        const title = text(first(item.title)) || '';
        const slug = decodeSlug(text(first(item['wp:post_name'])));
        if (!slug) continue;

        const date = text(first(item['wp:post_date'])) || text(first(item.pubDate)) || '';
        const excerpt = getMeta(item, 'preview') || '';
        let content = getMeta(item, 'detail') || '';
        const imgId = getMeta(item, 'img');
        const featured_image = imgId && attachmentsMap[imgId] ? attachmentsMap[imgId] : null;

        content = replaceMediaUrls(content);
        content = cleanContent(content);

        posts.push({
          id: id ? parseInt(id, 10) : null,
          title,
          slug,
          content,
          excerpt,
          date,
          featured_image,
          categories: [],
          tags: [],
        });
      }

      // Ссылки на другие статьи блога в контенте → /blog/slug
      posts.forEach((p) => {
        p.content = replaceBlogLinks(p.content, baseUrl);
      });

      if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
      const outPath = path.join(OUT_DIR, 'posts.json');
      fs.writeFileSync(outPath, JSON.stringify(posts, null, 2), 'utf8');

      console.log('Готово. Записано в', outPath);
      console.log('  статей блога:', posts.length);
      posts.forEach((p) => console.log('    -', p.slug, p.title));
    }
  );
}

main();
