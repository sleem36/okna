const fs = require('fs');
const path = require('path');

const MAP = {
  'А':'A','Б':'B','В':'V','Г':'G','Д':'D','Е':'E','Ё':'Yo','Ж':'Zh',
  'З':'Z','И':'I','Й':'Y','К':'K','Л':'L','М':'M','Н':'N','О':'O',
  'П':'P','Р':'R','С':'S','Т':'T','У':'U','Ф':'F','Х':'Kh','Ц':'Ts',
  'Ч':'Ch','Ш':'Sh','Щ':'Shch','Ъ':'','Ы':'Y','Ь':'','Э':'E','Ю':'Yu','Я':'Ya',
  'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh',
  'з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o',
  'п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts',
  'ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya',
};

function transliterate(str) {
  return str.replace(/[А-ЯЁа-яё]/g, (ch) => MAP[ch] || ch);
}

function hasCyrillic(str) {
  return /[А-ЯЁа-яё]/.test(str);
}

let count = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      if (hasCyrillic(entry.name)) {
        const newName = transliterate(entry.name);
        const newPath = path.join(dir, newName);
        fs.renameSync(fullPath, newPath);
        console.log(`DIR  ${entry.name} -> ${newName}`);
        count++;
      }
    } else if (hasCyrillic(entry.name)) {
      const newName = transliterate(entry.name);
      const newPath = path.join(dir, newName);
      fs.renameSync(fullPath, newPath);
      console.log(`FILE ${entry.name} -> ${newName}`);
      count++;
    }
  }
}

const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  const alt = path.resolve(process.argv[2] || uploadsDir);
  if (!fs.existsSync(alt)) {
    console.error('Папка uploads не найдена:', alt);
    process.exit(1);
  }
  walk(alt);
} else {
  walk(uploadsDir);
}

console.log(`\nГотово! Переименовано: ${count}`);
