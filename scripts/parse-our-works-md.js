/**
 * Парсит docs/our-works-dump-table.md и записывает data/our-works.json.
 * Запуск: node scripts/parse-our-works-md.js
 * После обновления таблицы в .md снова запустите скрипт.
 */

const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, '..', 'docs', 'our-works-dump-table.md');
const outPath = path.join(__dirname, '..', 'data', 'our-works.json');

const raw = fs.readFileSync(mdPath, 'utf8');
const lines = raw.split(/\r?\n/).filter((line) => line.trim());

// Пропускаем заголовок (# Наши работы), пустую строку, строку с заголовками таблицы, разделитель | --- |
const tableLines = lines.filter((line) => line.startsWith('|') && line.includes('|')).slice(2);

function toPath(p) {
  if (!p || p.trim() === '—' || p.trim() === '-') return null;
  return p.trim().replace(/^\/wp-uploads\//, '/uploads/');
}

function trimCell(s) {
  return (s || '').trim();
}

const works = [];

for (const line of tableLines) {
  const cells = line.split('|').map(trimCell);
  // cells[0] пустой из-за ведущего |, дальше: 1=#, 2=id, 3=slug, 4=title, 5=text, 6=edgingType, 7=mountBase, 8=material, 9=edgingText, 10=type, 11=areaS, 12=time, 13=width, 14=furnitureText, 15=imagePath, 16=imagePath2, 17=imagePath3
  if (cells.length < 16) continue;
  const id = cells[2];
  const slug = cells[3];
  const title = cells[4];
  const imagePath = toPath(cells[15]) || toPath(cells[16]) || toPath(cells[17]);
  if (!imagePath) continue;

  works.push({
    id: id === '' ? undefined : Number(id) || id,
    slug: slug || undefined,
    title: trimCell(cells[4]) || '',
    text: trimCell(cells[5]) || '',
    edgingType: trimCell(cells[6]) || '', // standart, premium, luxe
    mountBase: trimCell(cells[7]) || '', // wood, metal, brick
    material: trimCell(cells[8]) || '', // pvh, poly
    edgingText: trimCell(cells[9]) || '',
    type: trimCell(cells[10]) || '', // besedki, verandi, teassi, pomeshenia, dachi
    areaS: trimCell(cells[11]) || '',
    time: trimCell(cells[12]) || '',
    width: trimCell(cells[13]) || '',
    furnitureText: trimCell(cells[14]) || '',
    imagePath: imagePath,
    imagePath2: toPath(cells[16]),
    imagePath3: toPath(cells[17]),
  });
}

const dir = path.dirname(outPath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(works, null, 2), 'utf8');
console.log(`Written ${works.length} items to ${outPath}`);
