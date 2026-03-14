import Link from 'next/link';
import { SITE_MENU } from '../lib/menu-data';
import SearchTrigger from './SearchTrigger';
import OrderFormTrigger from './OrderFormTrigger';

const HEADER_MENU = SITE_MENU;

function NavItem({ item }) {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="header-nav-item">
      {item.url ? (
        <Link href={item.url}>
          <div className="header-nav-item-title">{item.title}</div>
        </Link>
      ) : (
        <div className="header-nav-item-title">{item.title}</div>
      )}
      {hasChildren && (
        <>
          <div className="header_arrow">
            <img src="/theme/img/arrow.png" alt="" className="mobile-arrow" />
          </div>
          <div className="header-drop_list">
            <div className="drop">
              {item.children.map((child) => (
                <div key={child.href} className="header-drop_list-item">
                  <Link href={child.href}>
                    <div className="header-drop_list-item-title">{child.title}</div>
                  </Link>
                  <div className="item-drop_list" />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {/* Пустой выпадающий блок для пунктов-ссылок (как в оригинале) */}
      {!hasChildren && (
        <div className="header-drop_list">
          <div className="drop" />
        </div>
      )}
    </div>
  );
}

function MobileNavItem({ item }) {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="mobile-nav-item">
      {item.url ? (
        <div className="mobile-nav-item-title">
          <Link href={item.url}>{item.title}</Link>
          <img src="" alt="" className="mobile-arrow" />
        </div>
      ) : (
        <div className="mobile-nav-item-title">
          {item.title}
          {hasChildren && <img src="/theme/img/arrow.png" alt="" className="mobile-arrow" />}
        </div>
      )}
      {hasChildren && (
        <div className="mobile-nav-item-drop">
          {item.children.map((child) => (
            <div key={child.href} className="mobile-first-drop">
              <div className="mobile-nav-item-list-title">
                <Link href={child.href}>{child.title}</Link>
                <img src="" alt="" className="mobile-arrow" />
              </div>
              <div className="mobile-second-drop">
                <ul />
              </div>
            </div>
          ))}
        </div>
      )}
      {!hasChildren && <div className="mobile-nav-item-drop" />}
    </div>
  );
}

export default function Header({ site = {} }) {
  const contacts = site.contacts || {};
  const phone = contacts.phone || '+7 (925) 000 99 77 ';
  const phoneHref = phone.replace(/\D/g, '').replace(/^8/, '7');
  const phoneParts = phone.match(/^(\+7\s*\(\d{3}\)\s*)(.*)$/);
  const phoneSpan = phoneParts ? phoneParts[1] : '+7 (925) ';
  const phoneRest = phoneParts ? phoneParts[2].trim() : '000 99 77';

  return (
    <>
      <header>
        <div className="container">
          <div className="logo">
            <Link href="/">
              {(contacts.logo && (
                <img src={contacts.logo} alt="Мягкие окна Стиль" />
              )) || <img src="/uploads/2023/05/logo.png" alt="Мягкие окна Стиль" />}
              {contacts.name || 'ИЗГОТОВЛЕНИЕ И УСТАНОВКА МЯГКИХ ОКОН'}
            </Link>
          </div>
          <div className="header-nav">
            {HEADER_MENU.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
          </div>
          <div className="header-contacts">
            <div className="header-phone">
              <img src="/theme/img/phone.png" alt="Телефон" />
              <a href={`tel:${phoneHref ? '+' + phoneHref : '+79250009977'}`}>
                <span>{phoneSpan}</span>
                {phoneRest}
              </a>
            </div>
            <div className="header-social">
              <a href={contacts.whatsapp || 'https://wa.me/+79250009977'} target="_blank" rel="noreferrer">
                <img src="/theme/img/watsap.png" alt="WhatsApp" />
              </a>
              <a href={contacts.tg || 'https://t.me/+79250009977'} target="_blank" rel="noreferrer">
                <img src="/theme/img/telegram.png" alt="Telegram" />
              </a>
            </div>
            <SearchTrigger />
            <OrderFormTrigger className="header-btn" />
          </div>
          <div className="header__burger" aria-label="Меню">
            <span className="header__burger-top" />
            <span className="header__burger-middle" />
            <span className="header__burger-bottom" />
          </div>
        </div>
      </header>
      <div className="mobile">
        <div className="container">
          <div className="mobile__wrapper">
            <div className="mobile-nav">
              {HEADER_MENU.map((item) => (
                <MobileNavItem key={item.title} item={item} />
              ))}
            </div>
            <div className="mobile-contacts">
              <div className="header-search header-search--mobile">
                <SearchTrigger />
              </div>
              <div className="header-social">
                <a href={contacts.whatsapp || 'https://wa.me/+79250009977'} target="_blank" rel="noreferrer">
                  <img src="/theme/img/watsap.png" alt="WhatsApp" />
                </a>
                <a href={contacts.tg || 'https://t.me/+79250009977'} target="_blank" rel="noreferrer">
                  <img src="/theme/img/telegram.png" alt="Telegram" />
                </a>
              </div>
              <div className="mobile-phone-box">
                <div className="mobile-phone">
                  <img src="/theme/img/phone.png" alt="Телефон" />
                  <a href={`tel:${phoneHref ? '+' + phoneHref : '+79250009977'}`}>
                    <span>{phoneSpan}</span>
                    {phoneRest}
                  </a>
                </div>
                <OrderFormTrigger className="header-btn mobile-btn" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
