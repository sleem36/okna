import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import data from '../../../lib/data';
import { SITE_MENU } from '../../../lib/menu-data';

const DATA_DIR = path.join(process.cwd(), 'data');

function getOurWorksTitles() {
  try {
    const raw = fs.readFileSync(path.join(DATA_DIR, 'our-works.json'), 'utf8');
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function normalize(str) {
  return (str || '').toString().toLowerCase().trim().replace(/\s+/g, ' ');
}

function matchQuery(text, q) {
  if (!q) return false;
  const n = normalize(text);
  const nq = normalize(q);
  return n.includes(nq) || nq.split(/\s+/).every((w) => n.includes(w));
}

const MAX_RESULTS = 15;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';

  if (!q || q.length < 2) {
    return NextResponse.json({ items: [] });
  }

  const items = [];

  // Страницы (исключаем заглушки без контента — только title, без текста)
  const pages = data.getPages();
  for (const p of pages) {
    if (!p.slug || p.slug === 'blog') continue;
    const hasContent = (p.content && p.content.trim()) || (p.excerpt && p.excerpt.trim());
    if (!hasContent) continue;
    const title = p.title || '';
    if (matchQuery(title, q)) {
      items.push({
        title,
        href: `/${p.slug}`,
        type: 'page',
      });
    }
  }

  // Статьи блога
  const posts = data.getPosts();
  for (const p of posts) {
    const title = p.title || '';
    const excerpt = (p.excerpt || '').replace(/<[^>]+>/g, '');
    if (matchQuery(title, q) || matchQuery(excerpt, q)) {
      items.push({
        title,
        href: `/blog/${encodeURIComponent(p.slug)}`,
        type: 'post',
      });
    }
  }

  // Пункты меню (все страницы сайта по названию)
  function addMenuItems(menu) {
    for (const item of menu) {
      const title = item.title || '';
      const href = item.url || (item.href || '');
      if (href && matchQuery(title, q)) {
        const fullHref = href.startsWith('/') ? href : `/${href}`;
        if (!items.some((i) => i.href === fullHref && i.title === title)) {
          items.push({ title, href: fullHref, type: 'menu' });
        }
      }
      if (item.children && item.children.length) {
        for (const ch of item.children) {
          const t = ch.title || '';
          const h = ch.href || '';
          if (h && matchQuery(t, q)) {
            const fullHref = h.startsWith('/') ? h : `/${h}`;
            if (!items.some((i) => i.href === fullHref && i.title === t)) {
              items.push({ title: t, href: fullHref, type: 'menu' });
            }
          }
        }
      }
    }
  }
  addMenuItems(SITE_MENU);

  // Наши работы
  const works = getOurWorksTitles();
  for (const w of works) {
    const title = (w.title || w.name || '').toString();
    if (title && matchQuery(title, q) && w.slug) {
      items.push({
        title,
        href: `/our_works/${encodeURIComponent(w.slug)}`,
        type: 'work',
      });
    }
  }

  // Убрать дубликаты по href, оставить первое вхождение
  const seen = new Set();
  const unique = items.filter((i) => {
    const key = i.href + '|' + i.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return NextResponse.json({
    items: unique.slice(0, MAX_RESULTS),
  });
}
