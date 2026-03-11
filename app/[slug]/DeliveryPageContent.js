import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import {
  DELIVERY_HERO,
  DELIVERY_COST_TITLE,
  DELIVERY_COST_BLOCKS,
  DELIVERY_COST_FOOTNOTE,
  DELIVERY_OTHER_SERVICES,
} from '../../lib/delivery-page-data';

const WORKS_TABS = [
  { index: 0, label: 'Все' },
  { index: 1, label: 'Террасы' },
  { index: 2, label: 'Беседки' },
  { index: 3, label: 'Дачи' },
  { index: 4, label: 'Веранды' },
  { index: 5, label: 'Промышленные помещения' },
];
const WORKS_SLIDES = [
  [{ img: '/uploads/2023/05/пер.jpg', title: '', link: '#' }, { img: '/uploads/2024/08/1-1.jpg', title: '', link: '#' }, { img: '/uploads/2024/08/1-2.jpg', title: '', link: '#' }],
  [{ img: '/uploads/2024/09/1-5.jpg', title: 'Терраса с Раменского', link: '#' }, { img: '/uploads/2024/09/1-6.jpg', title: 'Терраса из Щелковского', link: '#' }, { img: '/uploads/2024/09/1-7.jpg', title: 'Терраса в Ногинском', link: '#' }],
  [{ img: '/uploads/2023/05/пер.jpg', title: 'Беседка в Ногинском районе', link: '#' }, { img: '/uploads/2024/08/1-1.jpg', title: 'Беседка в Сергиево-посадском районе', link: '#' }, { img: '/uploads/2024/08/1-2.jpg', title: 'Беседка из СНТ Галактика', link: '#' }],
  [{ img: '/uploads/2024/09/1-18.jpg', title: 'Дача в Дмитровском', link: '#' }, { img: '/uploads/2024/09/1-19.jpg', title: 'Дача в Хотьково', link: '#' }, { img: '/uploads/2024/09/1-20.jpg', title: 'Дача в Одинцовском', link: '#' }],
  [{ img: '/uploads/2024/08/1-21.jpg', title: 'Веранда Солнечногорск', link: '#' }, { img: '/uploads/2024/08/1-24.jpg', title: 'Веранда Бронницы', link: '#' }, { img: '/uploads/2024/08/1-23.jpg', title: 'Веранда СНТ Здоровье', link: '#' }],
  [{ img: '/uploads/2024/09/1-11.jpg', title: 'Промышленное помещение из Ногинского', link: '#' }, { img: '/uploads/2024/09/1-12.jpg', title: 'Промышленное помещение из Ногинска', link: '#' }, { img: '/uploads/2024/09/1-13.jpg', title: 'Уличный шатер Сергиево-посадский', link: '#' }],
];
const REVIEWS_IMAGES = Array.from({ length: 29 }, (_, i) => `/uploads/2023/11/${i + 1}.jpg`);

export default function DeliveryPageContent() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Доставка мягких окон' }]} />

      <section id="win_main">
        <div className="container">
          <div className="main__wrapper">
            <div className="main__block">
              <div className="main__text">
                <div className="main__text-title">
                  <div className="panel__text mobile_title">{DELIVERY_HERO.panelText}</div>
                  <h1>{DELIVERY_HERO.title}</h1>
                </div>
              </div>
              <div className="main__img">
                <img src={DELIVERY_HERO.img} alt="" style={{ width: '89%', height: '104%', objectFit: 'cover' }} />
              </div>
            </div>
            <div className="main__panel">
              <div className="panel__wrapper">
                <Link href={DELIVERY_HERO.buttonHref} className="panel__btn">
                  <div>{DELIVERY_HERO.buttonText}</div>
                </Link>
                <div className="panel__arrow">
                  <img src="/theme/img/mainArrow.svg" alt="" />
                </div>
                <div className="panel__text">{DELIVERY_HERO.panelText}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cost_measuring">
        <div className="container">
          <div className="cost__wrapper">
            <div className="cost-title">
              <h2><span>{DELIVERY_COST_TITLE.h2}</span> {DELIVERY_COST_TITLE.subtitle}</h2>
              <p>{DELIVERY_COST_TITLE.info}</p>
            </div>
            <div className="cost__content">
              <div className="cost__content-blocks">
                {DELIVERY_COST_BLOCKS.map((block) => (
                  <div key={block.title} className="cost__content-block">
                    <div className="content-block-title">
                      <div className="content-block-title-text">{block.title}</div>
                    </div>
                    <div className="content-block-decor delivery" />
                    <div className="content-block-price">{block.price}</div>
                  </div>
                ))}
                <div className="cost__content-info">
                  <p className="cost-title">{DELIVERY_COST_FOOTNOTE}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="other_services">
        <div className="container">
          <div className="ou__wrapper">
            <div className="ou-title">
              <h2>Другие <span>услуги</span></h2>
            </div>
            <div className="ou-examples">
              {DELIVERY_OTHER_SERVICES.map((item) => (
                <div key={item.href} className="ou-example">
                  <img src={item.img} alt="" />
                  <span className="ou-exapmle-span">{item.label}</span>
                  <div className="ou-hid">
                    <Link href={item.href}>Посмотреть</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="works">
        <div className="container">
          <div className="works__wrapper">
            <div className="works-title">
              <h2>Наши <span>работы</span></h2>
            </div>
            <div className="works__content">
              <div className="works__content-titles">
                {WORKS_TABS.map((tab) => (
                  <div key={tab.index} className={`works__content-title${tab.index === 0 ? ' active' : ''}`} data-index={tab.index}>
                    <span>{tab.label}</span>
                  </div>
                ))}
              </div>
              <div className="works-swipe">
                {WORKS_SLIDES.map((slides, idx) => (
                  <div key={idx} className="works__content-slider">
                    <div className={`swiper works${idx === 0 ? ' active' : ''}`} data-index={idx}>
                      <div className="swiper-wrapper">
                        {slides.map((slide, slideIdx) => (
                          <div key={slideIdx} className="swiper-slide">
                            <img src={slide.img} alt="" />
                            <p>{slide.title}</p>
                            <div className="swiper-slide-hidden">
                              <Link href={slide.link} className="swiper-slide-hidden-link">Посмотреть</Link>
                            </div>
                          </div>
                        ))}
                      </div>
                      <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews">
        <div className="container">
          <div className="reviews__wrapper">
            <div className="reviews-title">
              <h2>Отзывы</h2>
            </div>
            <div className="reviews__content">
              <div className="reviews__content-slider">
                <div className="swiper review">
                  <div className="swiper-wrapper">
                    {REVIEWS_IMAGES.map((src, i) => (
                      <div key={i} className="swiper-slide" data-swiper-slide-index={i}>
                        <div className="swiper-slide-bg">
                          <img src={src} alt="" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="reviews-prev" tabIndex={-1} role="button" aria-label="Previous slide">
                    <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8.90078 1.03835L9.80078 1.90415L2.60078 8.83048L9.80078 16.0956L8.90078 16.9614L1.70078 9.69628L0.800781 8.83048L8.90078 1.03835Z" fill="#263238" stroke="#263238" strokeWidth="0.692308" />
                    </svg>
                  </div>
                  <div className="swiper-pagination review-pagination" />
                  <div className="reviews-next" tabIndex={0} role="button" aria-label="Next slide">
                    <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M2.03672 16.9616L1.13672 16.0958L8.33672 9.16952L1.13672 1.90437L2.03672 1.03857L9.23672 8.30372L10.1367 9.16952L2.03672 16.9616Z" fill="#263238" stroke="#263238" strokeWidth="0.692308" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts_order">
        <div className="container">
          <div className="price_window_order contacts_order">
            <div className="price_window_order-title">
              <h3>Оставить заявку на консультацию</h3>
              <p />
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
