import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';

const CONTACTS_HERO = {
  title: 'Контакты',
  panelText: 'Свяжитесь с нашим специалистом и он объяснит все ньюансы',
  buttonText: 'Получить консультацию',
  buttonHref: '#contacts_order',
  img: '/uploads/2023/05/Rectangle-253-1.png',
};

export default function ContactsPageContent() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Контакты' }]} />

      <section id="win_main">
        <div className="container">
          <div className="main__wrapper all_wrapper">
            <div className="main__block">
              <div className="main__text contacts_main_text">
                <div className="main__text-title">
                  <div className="panel__text mobile_title">{CONTACTS_HERO.panelText}</div>
                  <h1>{CONTACTS_HERO.title}</h1>
                </div>
              </div>
              <div className="main__img">
                <img src={CONTACTS_HERO.img} alt="" />
              </div>
            </div>
            <div className="main__panel">
              <div className="panel__wrapper">
                <Link href={CONTACTS_HERO.buttonHref} className="panel__btn">
                  <div>{CONTACTS_HERO.buttonText}</div>
                </Link>
                <div className="panel__arrow">
                  <img src="/theme/img/mainArrow.svg" alt="" />
                </div>
                <div className="panel__text">{CONTACTS_HERO.panelText}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts_comm">
        <div className="container">
          <div className="contacts_comm__wrapper all_wrapper">
            <div className="contacts_comm-info">
              <div className="contacts_comm-title">
                <h2>
                  <span>Свяжитесь</span> с нами
                </h2>
              </div>
              <div className="contacts_comm-contacts">
                <div className="contacts-block contacts-phone">
                  <img src="/theme/img/Phone.svg" alt="" />
                  <a href="tel:+7 (925) 000 99 77 ">
                    <span>+7 (925) </span>000 99 77
                  </a>
                </div>
                <div className="contacts-block contacts-mail">
                  <img src="/theme/img/mail.svg" alt="" />
                  <a href="mailto:okna.stil.myagkie@yandex.ru">okna.stil.myagkie@yandex.ru</a>
                </div>
                <div className="contacts-block contacts-work">
                  <img src="/theme/img/Clock.svg" alt="" />
                  <p>9.00 - 21.00 ежедневно</p>
                </div>
                <div className="contacts-block contacts-address">
                  <img src="/theme/img/MapPin.svg" alt="" />
                  <p>Московская область, г. Ногинск ул. Климова д. 50</p>
                </div>
              </div>
              <div className="contacts_comm-company">
                <div className="contacts-fio">ИП Шагалкина Яна Анатольевна</div>
                <div className="contacts-inn">ИНН 771579690162</div>
                <div className="contacts-inn">
                  <a href="/uploads/2023/06/Политика-конфедициальности.docx">Политика конфиденциальности</a>
                </div>
              </div>
            </div>
            <div className="contacts_comm-map">
              <iframe
                src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=61046453372"
                frameBorder="0"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contacts_order">
        <div className="container">
          <div className="price_window_order contacts_order">
            <div className="price_window_order-title">
              <h3>Оставить заявку на консультацию</h3>
              <p></p>
            </div>
            <form className="price_window_form main_form contacts_form" id="main2" action="#">
              <div className="price_window_form-inp contacts_form-inp">
                <input type="text" name="name" required maxLength={35} />
                <span className="floating-label floating-label-name">Имя</span>
              </div>
              <div className="price_window_form-inp contacts_form-inp">
                <input type="tel" name="phone" required />
                <span className="floating-label floating-label-name">Номер телефона</span>
              </div>
              <button type="submit" className="btn price_window_form-btn contacts_form-btn">
                Оставить заявку
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

