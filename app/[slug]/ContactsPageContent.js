import Breadcrumbs from '../../components/Breadcrumbs';
import HeroSection from '../../components/HeroSection';
import ContactFormSection from '../../components/ContactFormSection';

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

      <HeroSection
        {...CONTACTS_HERO}
        wrapperClassName="main__wrapper all_wrapper"
        textClassName="main__text contacts_main_text"
      />

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
                  <img src="/theme/img/Phone.svg" alt="Телефон" />
                  <a href="tel:+7 (925) 000 99 77 ">
                    <span>+7 (925) </span>000 99 77
                  </a>
                </div>
                <div className="contacts-block contacts-mail">
                  <img src="/theme/img/mail.svg" alt="Email" />
                  <a href="mailto:okna.stil.myagkie@yandex.ru">okna.stil.myagkie@yandex.ru</a>
                </div>
                <div className="contacts-block contacts-work">
                  <img src="/theme/img/Clock.svg" alt="Время работы" />
                  <p>9.00 - 21.00 ежедневно</p>
                </div>
                <div className="contacts-block contacts-address">
                  <img src="/theme/img/MapPin.svg" alt="Адрес" />
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
                title="Мягкие окна Стиль на карте"
              />
            </div>
          </div>
        </div>
      </section>

      <ContactFormSection />
    </>
  );
}
