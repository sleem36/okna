/**
 * Чтение данных из JSON (статический прототип).
 * Позже заменить на fetch к Strapi API.
 * Используется только в серверных компонентах Next.js.
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'data');

function readJson(name) {
  const file = path.join(DATA_DIR, `${name}.json`);
  try {
    const raw = fs.readFileSync(file, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return name === 'menus' ? {} : [];
  }
}

function getPosts() {
  return readJson('posts');
}

function getPages() {
  return readJson('pages');
}

function getPostBySlug(slug) {
  const posts = getPosts();
  return posts.find((p) => p.slug === slug) || null;
}

function getPageBySlug(slug) {
  const pages = getPages();
  return pages.find((p) => p.slug === slug) || null;
}

function getCategories() {
  return readJson('categories');
}

function getTags() {
  return readJson('tags');
}

function getMenus() {
  const raw = readJson('menus');
  return typeof raw === 'object' && raw !== null ? raw : {};
}

function getPostsByCategorySlug(categorySlug) {
  const posts = getPosts();
  return posts.filter((p) => p.categories && p.categories.some((c) => c.slug === categorySlug));
}

module.exports = {
  getPosts,
  getPages,
  getPostBySlug,
  getPageBySlug,
  getCategories,
  getTags,
  getMenus,
  getPostsByCategorySlug,
};
