import Breadcrumbs from '../../components/Breadcrumbs';
import HeroSection from '../../components/HeroSection';
import ContactFormSection from '../../components/ContactFormSection';

const STOCKS_HERO = {
  title: 'АКЦИИ Для новых клиентов',
  panelText: 'Участникам СВО Скидка 10%',
  buttonText: 'ОФОРМИТЬ ЗАКАЗ',
  buttonHref: '#contacts_order',
  img: '/uploads/2023/05/Rectangle-253-1.png',
};

const STOCKS_SLIDES = [
  { img: '/uploads/2023/05/Rectangle-225.png', title: 'Участникам СВО Скидка 10%' },
  { img: '/uploads/2023/05/111-4.png', title: 'Пенсионерам скидка 5%' },
  { img: '/uploads/2023/05/Rectangle-253-1.png', title: 'При единовременном заказе с соседом скидка 5%' },
  { img: '/uploads/2024/08/4-1.jpg', title: 'Оставьте отзыв получите кэшбэк 2%' },
];

const HERO_IMG_STYLE = { width: '89%', height: '104%', objectFit: 'cover' };

export default function StocksPageContent() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Акции' }]} />

      <HeroSection {...STOCKS_HERO} imgStyle={HERO_IMG_STYLE} />

      <section id="stocks">
        <div className="container">
          <div className="works__content-slider">
            <div className="swiper works active">
              <div className="swiper-wrapper">
                {STOCKS_SLIDES.map((slide, i) => (
                  <div key={i} className="swiper-slide">
                    <img src={slide.img} alt="" />
                    <p>{slide.title}</p>
                  </div>
                ))}
              </div>
              <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
            </div>
          </div>
          <div className="works__content-navigation">
            <div className="works-prev" tabIndex={0} role="button" aria-label="Предыдущий слайд">
              <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.90078 1.03835L9.80078 1.90415L2.60078 8.83048L9.80078 16.0956L8.90078 16.9614L1.70078 9.69628L0.800781 8.83048L8.90078 1.03835Z" fill="#263238" stroke="#263238" strokeWidth="0.692308" />
              </svg>
            </div>
            <div className="swiper-pagination works-pagination" />
            <div className="works-next" tabIndex={0} role="button" aria-label="Следующий слайд">
              <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.03672 16.9616L1.13672 16.0958L8.33672 9.16952L1.13672 1.90437L2.03672 1.03857L9.23672 8.30372L10.1367 9.16952L2.03672 16.9616Z" fill="#263238" stroke="#263238" strokeWidth="0.692308" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <ContactFormSection subtitle="Производитель мягких окон от 1100 рублей за кв. метр." />
    </>
  );
}
