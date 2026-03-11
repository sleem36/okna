import Link from 'next/link';

// Структура футера как в docs/main/footer.html — все ссылки и названия
const FOOTER_NAV = [
  {
    title: 'Продукция',
    link: null,
    children: [
      { title: 'Окантовка', href: '/myagkie-okna-s-okantovkoy' },
      { title: 'Фурнитура', href: '/furnitura-dlya-myagkikh-okon' },
      { title: 'Мягкие двери', href: '/myagkie-okna-dver' },
    ],
  },
  {
    title: 'Услуги',
    link: null,
    children: [
      { title: 'Доставка мягких окон', href: '/dostavka-myagkih-okon' },
      { title: 'Замер мягких окон', href: '/zamer-myagkih-okon' },
      { title: 'Монтаж мягких окон', href: '/montazh-myagkih-okon' },
    ],
  },
  {
    title: 'Наши работы',
    link: '/our_works',
    children: null,
  },
  {
    title: 'О компании',
    link: null,
    children: [
      { title: 'Цены', href: '/myagkie-okna-czena' },
      { title: 'Акции', href: '/stocks' },
      { title: 'Как заказать', href: '/how_order' },
      { title: 'Отзывы', href: '/reviews' },
      { title: 'Галерея', href: '/gallery' },
      { title: 'Статьи', href: '/blog' },
    ],
  },
  {
    title: 'Калькулятор',
    link: null,
    children: null,
  },
  {
    title: 'Контакты',
    link: '/contacts',
    children: null,
  },
];

export default function Footer({ site = {} }) {
  const contacts = site.contacts || {};
  const logo = contacts.logo || '/uploads/2023/05/logo.png';
  const name = contacts.name || 'ИЗГОТОВЛЕНИЕ И УСТАНОВКА МЯГКИХ ОКОН';
  const phone = contacts.phone || '+7 (925) 000 99 77 ';
  const address = contacts.address || 'Московская область, г. Ногинск ул. Климова д. 50';
  const footerWindow = contacts.footerWindow || 'Мягкие окна «Стиль» - производство и монтаж мягких окон';
  const copyright = contacts.copyright || 'Все права защищены © 2017 – 2025 ИП Шагалкина Яна Анатольевна. Цены на сайте для ознакомления — не являются публичной офертой, определяемой положениями статьи 437 Гражданского кодекса Российской Федерации. Компания оставляет за собой права без уведомления пользователя изменять цены на сайте.';
  const policyHref = contacts.policyHref || '/uploads/2023/06/Политика-конфиденциальности.docx';

  return (
    <footer>
      <div className="container">
        <div className="logo">
          <Link href="/">
            <img src={logo} alt="" />
            {name}
          </Link>
        </div>
        <div className="footer-nav">
          {FOOTER_NAV.map((item) => (
            <div key={item.title} className="footer-nav-item">
              {item.link ? (
                <div className="footer-nav-item-title">
                  <Link href={item.link} className="footer-nav-item-title-link">
                    {item.title}
                  </Link>
                </div>
              ) : (
                <div className="footer-nav-item-title">{item.title}</div>
              )}
              {item.children && item.children.length > 0 ? (
                <div className="footer-drop_list">
                  {item.children.map((child) => (
                    <div key={child.title} className="footer-nav-item-list">
                      <div className="footer-nav-item-list-title">
                        <Link href={child.href}>{child.title}</Link>
                      </div>
                      <ul className="footer-nav-item-drop-list" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="footer-drop_list" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-info">
            <div className="footer-window">{footerWindow}</div>
            <div className="copyright">{copyright}</div>
            <div className="header-phone" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex' }}>
                <img src="/theme/img/phone.png" alt="" />
                <a href={`tel:${phone.replace(/\s/g, '')}`}>
                  <span>+7 (925) </span>000 99 77
                </a>
              </div>
              <br />
              <p>{address}</p>
            </div>
            <div className="footer-social">
              <a href={contacts.whatsapp || 'https://wa.me/+79250009977'} target="_blank" rel="noreferrer">
                <img src="/theme/img/watsap.svg" alt="whatsapp" />
              </a>
              <a href={contacts.tg || 'https://t.me/+79250009977'} target="_blank" rel="noreferrer">
                <img src="/theme/img/telegram.svg" alt="telegram" />
              </a>
            </div>
          </div>
          <div className="developer">
            Разработка сайта:
            <a href="https://your-startup.space/" target="_blank" rel="noreferrer">
              <img src="/theme/img/startup.svg" alt="" />
            </a>
          </div>
        </div>
        <div className="container">
          <p>
            Данный сайт носит исключительно информационный характер и ни при каких условиях не
            является публичной офертой, определяемой положениями ч. 2 ст. 437 Гражданского кодекса
            Российской Федерации.{' '}
            <a href={policyHref} target="_blank" rel="noreferrer">
              Политика сбора данных
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
