import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';

const HOW_ORDER_HERO = {
  title: 'как заказать',
  panelText: 'Оставьте заявку и наши менеджеры проконсультируют вас',
  buttonText: 'ОФОРМИТЬ ЗАКАЗ',
  buttonHref: '#contacts_order',
  img: '/uploads/2023/05/Rectangle-253-1.png',
};

const HOW_ORDER_STEPS = [
  { number: '1', title: 'Оставляете заявку на расчёт' },
  { number: '2', title: 'Получаете предварительный расчёт за 30 минут' },
  { number: '3', title: 'Выезд специалиста на объект' },
  { number: '4', title: 'Делается замер, заключается договор' },
];

const HOW_ORDER_FOOTNOTE = 'Возможно изготовление по предоставленным вами чертежам';

export default function HowOrderPageContent() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Как заказать' }]} />

      <section id="win_main">
        <div className="container">
          <div className="main__wrapper">
            <div className="main__block">
              <div className="main__text">
                <div className="main__text-title">
                  <div className="panel__text mobile_title">{HOW_ORDER_HERO.panelText}</div>
                  <h1>{HOW_ORDER_HERO.title}</h1>
                </div>
              </div>
              <div className="main__img">
                <img src={HOW_ORDER_HERO.img} alt="" style={{ width: '89%', height: '104%', objectFit: 'cover' }} />
              </div>
            </div>
            <div className="main__panel">
              <div className="panel__wrapper">
                <Link href={HOW_ORDER_HERO.buttonHref} className="panel__btn">
                  <div>{HOW_ORDER_HERO.buttonText}</div>
                </Link>
                <div className="panel__arrow">
                  <img src="/theme/img/mainArrow.svg" alt="" />
                </div>
                <div className="panel__text">{HOW_ORDER_HERO.panelText}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="measuring_free">
        <div className="container">
          <div className="mf__wrapper">
            <div className="mf__cards">
              {HOW_ORDER_STEPS.map((step) => (
                <div key={step.number} className="mf__cards-card">
                  <div className="mf__cards-card-top">
                    <div className="mf__cards-card-number">{step.number}</div>
                  </div>
                  <div className="mf__cards-card-title">{step.title}</div>
                </div>
              ))}
            </div>
            <div className="mf-text">{HOW_ORDER_FOOTNOTE}</div>
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
