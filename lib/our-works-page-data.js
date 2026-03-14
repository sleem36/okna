/** Данные страницы «Наши работы» (our_works). Источник: docs/our-works-dump-table.md → data/our-works.json */

import worksEntries from '../data/our-works.json';

/** Маппинг type из таблицы на индекс вкладки: 0=Все, 1=Террасы, 2=Беседки, 3=Дачи, 4=Веранды, 5=Промышленные */
const TYPE_TO_TAB = {
  teassi: 1,   // Террасы
  besedki: 2,  // Беседки
  dachi: 3,    // Дачи
  verandi: 4,  // Веранды
  pomeshenia: 5, // Промышленные помещения
};

/** Подпись типа объекта для страницы работы */
export const TYPE_LABELS = {
  teassi: 'Террасы',
  besedki: 'Беседки',
  dachi: 'Дачи',
  verandi: 'Веранды',
  pomeshenia: 'Промышленные помещения',
};

/** Нормализация slug для сравнения (декодирование URL, trim) */
function normalizeSlug(s) {
  if (s == null || typeof s !== 'string') return '';
  try {
    return decodeURIComponent(s).trim().toLowerCase();
  } catch {
    return s.trim().toLowerCase();
  }
}

/** Получить работу по slug (для страницы /our_works/[slug]) */
export function getWorkBySlug(slug) {
  const need = normalizeSlug(slug);
  if (!need) return null;
  const entry = worksEntries.find((w) => normalizeSlug(w.slug) === need);
  return entry || null;
}

/** Все slug работ для generateStaticParams */
export function getAllWorkSlugs() {
  return worksEntries.filter((w) => w.slug).map((w) => ({ slug: w.slug }));
}

/** Нормализация типа окантовки (standard → standart для единообразия с фильтром) */
function normalizeEdgingType(v) {
  if (!v || typeof v !== 'string') return v || '';
  const s = v.trim().toLowerCase();
  return s === 'standard' ? 'standart' : s;
}

/** Преобразуем запись из JSON в формат карточки для сетки (img, title, link + поля для фильтра) */
function toSlide(entry) {
  return {
    id: entry.id,
    slug: entry.slug,
    title: entry.title,
    img: entry.imagePath,
    link: entry.slug ? `/our_works/${entry.slug}` : '#',
    edgingType: normalizeEdgingType(entry.edgingType),
    mountBase: entry.mountBase,
    material: entry.material,
    type: entry.type,
    typeIndex: TYPE_TO_TAB[entry.type] ?? 0,
  };
}

export const OUR_WORKS_ENTRIES = worksEntries.map(toSlide);

export const OUR_WORKS_HERO = {
  title: 'наши работы',
  panelText: 'Производитель мягких окон от 1100 рублей за кв. метр.',
  buttonText: 'ОФОРМИТЬ ЗАКАЗ',
  buttonHref: '#window_order',
  img: '/uploads/2023/05/Rectangle-253-1.png',
};

export const WORKS_TABS = [
  { index: 0, label: 'Все' },
  { index: 1, label: 'Террасы' },
  { index: 2, label: 'Беседки' },
  { index: 3, label: 'Дачи' },
  { index: 4, label: 'Веранды' },
  { index: 5, label: 'Промышленные помещения' },
];

/** Все работы для вкладки «Все» */
export const ALL_SLIDES = OUR_WORKS_ENTRIES;

/** Работы по вкладкам: [0]=все, [1]=террасы, [2]=беседки, [3]=дачи, [4]=веранды, [5]=пром. помещения */
export const WORKS_SLIDES = [
  OUR_WORKS_ENTRIES,
  OUR_WORKS_ENTRIES.filter((s) => s.typeIndex === 1),
  OUR_WORKS_ENTRIES.filter((s) => s.typeIndex === 2),
  OUR_WORKS_ENTRIES.filter((s) => s.typeIndex === 3),
  OUR_WORKS_ENTRIES.filter((s) => s.typeIndex === 4),
  OUR_WORKS_ENTRIES.filter((s) => s.typeIndex === 5),
];

/** Соответствие имён фильтров форме: name атрибут чекбокса → значение в данных */
export const FILTER_EDGING = { standart: 'standart', luxe: 'luxe', premium: 'premium' };
export const FILTER_MOUNT = { wood: 'wood', metal: 'metal', brick: 'brick' };
export const FILTER_MATERIAL = { pvh: 'pvh', poly: 'poly', tone: 'tone' };
