import Breadcrumbs from '../../components/Breadcrumbs';
import HeroSection from '../../components/HeroSection';
import ContactFormSection from '../../components/ContactFormSection';

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

const HERO_IMG_STYLE = { width: '89%', height: '104%', objectFit: 'cover' };

export default function HowOrderPageContent() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Как заказать' }]} />

      <HeroSection {...HOW_ORDER_HERO} imgStyle={HERO_IMG_STYLE} />

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

      <ContactFormSection />
    </>
  );
}
