const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'data');

function getSiteConfig() {
  try {
    const raw = fs.readFileSync(path.join(DATA_DIR, 'site.json'), 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return {
      contacts: {
        name: 'Мягкие окна Стиль',
        logo: '/theme/img/logo.png',
        phone: '+7 (999) 123-45-67',
        whatsapp: '#',
        tg: '#',
        desc: '',
        rights: '© Мягкие окна Стиль.',
        address: '',
      },
      formPageSlug: 'ostavit-zayavku',
    };
  }
}

module.exports = { getSiteConfig };
