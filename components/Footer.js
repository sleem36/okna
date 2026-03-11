import Link from 'next/link';
import Image from 'next/image';

function FooterNavItem({ item }) {
  const hasChildren = item.children && item.children.length > 0;
  const isDirectLink = item.title === 'Наши работы' || item.title === 'Контакты';

  return (
    <div className="footer-nav-item">
      {isDirectLink ? (
        <div className="footer-nav-item-title">
          <Link href={item.url || '#'} className="footer-nav-item-title-link">
            {item.title}
          </Link>
        </div>
      ) : (
        <div className="footer-nav-item-title">{item.title}</div>
      )}
      {hasChildren && (
        <div className="footer-drop_list">
          {item.children.map((child) => (
            <div key={child.id} className="footer-nav-item-list">
              <div className="footer-nav-item-list-title">
                <Link href={child.url || '#'}>{child.title}</Link>
                {child.children && child.children.length > 0 && (
                  <img src="/theme/img/arrow.png" alt="" className="footer-arrow" />
                )}
              </div>
              {child.children && child.children.length > 0 && (
                <ul className="footer-nav-item-drop-list">
                  {child.children.map((sub) => (
                    <li key={sub.id} className="footer-drop-list-item">
                      <Link href={sub.url || '#'}>{sub.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Footer({ menus = {}, site = {} }) {
  const contacts = site.contacts || {};
  const menuItems = menus['Хедер'] || menus.main || [];
  const phoneHref = (contacts.phone || '').replace(/\D/g, '').replace(/^8/, '7');

  return (
    <footer>
      <div className="container">
        <div className="logo">
          <Link href="/">
            {contacts.logo && (
              <Image src={contacts.logo} alt="" width={120} height={40} unoptimized />
            )}
            {contacts.name}
          </Link>
        </div>
        <div className="footer-nav">
          {menuItems.map((item) => (
            <FooterNavItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-info">
            <div className="footer-window">{contacts.desc}</div>
            <div className="copyright">{contacts.rights}</div>
            <div className="header-phone" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex' }}>
                <img src="/theme/img/phone.png" alt="" />
                <a href={`tel:${phoneHref ? '+' + phoneHref : '#'}`}>{contacts.phone || ''}</a>
              </div>
              <br />
              {contacts.address && <p>{contacts.address}</p>}
            </div>
            <div className="footer-social">
              <a href={contacts.whatsapp || '#'} target="_blank" rel="noreferrer">
                <img src="/theme/img/watsap.svg" alt="whatsapp" />
              </a>
              <a href={contacts.tg || '#'} target="_blank" rel="noreferrer">
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
            <a href="/uploads/2023/06/Политика-конфиденциальности.docx" target="_blank" rel="noreferrer">
              Политика сбора данных
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
