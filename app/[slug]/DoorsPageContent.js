import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import {
  DOORS_HERO,
  DOORS_HO,
  DOORS_HO_ITEMS,
  DOORS_OTHER_MATERIALS,
  DOORS_COST_TITLE,
  DOORS_COST_BLOCKS,
  DOORS_COST_FOOTNOTE,
  DOORS_SEO_TITLE,
  DOORS_SEO_HTML,
} from '../../lib/doors-page-data';

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
const CALC_FASTENERS = [
  { img: '/uploads/2024/08/крепления-1479.jpg', label: 'Скоба -ремень', value: 1300, index: 0 },
  { img: '/uploads/2024/08/крепления-1401.jpg', label: 'Поворотная скоба', value: 1400, index: 1 },
  { img: '/uploads/2024/08/крепления-1413-1.jpg', label: 'Французкий замок', value: 1900, index: 2 },
  { img: '/uploads/2024/08/крепления-1485-1.jpg', label: 'Люверс для жесткого крепления', value: 1200, index: 3 },
];

export default function DoorsPageContent() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Мягкие двери' }]} />

      <section id="win_main">
        <div className="container">
          <div className="main__wrapper">
            <div className="main__block">
              <div className="main__text">
                <div className="main__text-title">
                  <div className="panel__text mobile_title">{DOORS_HERO.panelText}</div>
                  <h1>{DOORS_HERO.title}</h1>
                </div>
              </div>
              <div className="main__img">
                <img src={DOORS_HERO.img} alt="" style={{ width: '89%', height: '104%', objectFit: 'cover' }} />
              </div>
            </div>
            <div className="main__panel">
              <div className="panel__wrapper">
                <Link href={DOORS_HERO.buttonHref} className="panel__btn">
                  <div>{DOORS_HERO.buttonText}</div>
                </Link>
                <div className="panel__arrow">
                  <img src="/theme/img/mainArrow.svg" alt="" />
                </div>
                <div className="panel__text">{DOORS_HERO.panelText}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ho_furniture">
        <div className="container">
          <div className="ho__wrapper">
            <div className="ho__header">
              <div className="ho-title">
                <h2>{DOORS_HO.title}</h2>
                <span>{DOORS_HO.subtitle}</span>
              </div>
              <div className="ho__header-info">{DOORS_HO.info}</div>
            </div>
            <div className="ho__blocks">
              {DOORS_HO_ITEMS.map((item) => (
                <div key={item.title} className="ho__blocks-block">
                  <img src={item.img} alt="" />
                  <div className="ho-block-content">
                    <div className="ho-block-title">{item.title}</div>
                    <div className="ho-block-info">{item.info}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="calculate">
        <div className="container">
          <div className="calculate__wrapper">
            <div className="calculate__title">
              <h2><span>Рассчитайте стоимость</span> ваших мягких окон</h2>
              <p />
            </div>
            <form className="calculate__form" id="calc1" action="#">
              <div className="calculate__form-calculator">
                <div className="calculate__form-title">Калькулятор стоимости</div>
                <div className="calculate__form-block range__slider" data-min="0" data-max="100">
                  <input type="range" className="calculate__form-inp range" defaultValue={1} max={100} min={0} />
                  <output className="bubble" style={{ left: 'calc(1% + 7.85px)' }}>1 м²</output>
                  <input type="text" name="meters" className="calculate__form-inp squares" placeholder="1 м²" defaultValue="1" />
                </div>
                <div className="form-block-title">Доставка</div>
                <div className="calculate__form-block range__slider" data-min="0" data-max="100">
                  <input type="range" className="calculate__form-inp range range_delivery" defaultValue={0} max={100} min={0} />
                  <output className="bubble bubble_delivery" style={{ left: 'calc(0% + 8px)' }}>0 км</output>
                  <input type="text" name="delivery" className="calculate__form-inp delivery" placeholder="0 км" defaultValue="0" />
                </div>
                <div className="calculate__form-block check">
                  <div className="form-block-check">
                    <label className="control control-checkbox">
                      Монтаж с доставкой <img src="/theme/img/Truck.svg" alt="" />
                      <input type="checkbox" name="montage" defaultChecked />
                      <div className="control_indicator" />
                    </label>
                  </div>
                  <p className="calculate__form-description">* Минимальная стоимость монтажа -7000 руб. Доставка в пределах МКАД+30км - 1000 руб.</p>
                </div>
                <div className="calculate__form-block">
                  <div className="form-block-title">Тип крепежа:</div>
                  <div className="form-block-type fasteners">
                    {CALC_FASTENERS.map((f) => (
                      <div key={f.index} data-value={f.value} data-index={f.index} data-label={f.label} className={`block-type${f.index === 0 ? ' active' : ''}`}>
                        <img src={f.img} alt="" />
                        {f.label}
                      </div>
                    ))}
                  </div>
                  <input type="hidden" name="krepezh_name" defaultValue={CALC_FASTENERS[0].label} />
                  <input type="hidden" name="krepezh_price" defaultValue={String(CALC_FASTENERS[0].value)} />
                </div>
              </div>
              <div className="calculate__form-order">
                <div className="calculate__form-block">
                  <div className="form-block-title">Молния (пг/м)</div>
                  <input type="number" name="molnia" className="calculate__form-inp lightning" placeholder="0" defaultValue={0} />
                </div>
                <div className="calculate__form-block">
                  <div className="form-block-title">Ремни для подвеса</div>
                  <input type="number" name="remni" className="calculate__form-inp belt" placeholder="0" defaultValue={0} />
                </div>
                <div className="calculate__form-block">
                  <div className="form-block-title price">
                    Стоимость: <span>8 300 руб.</span>
                    <input type="hidden" className="calc_price" name="calc_price" value="8300" />
                  </div>
                </div>
                <div className="calculate__form-title">Оставьте заявку на точный рассчет стоимости мягких окон</div>
                <div className="calculate__form-block">
                  <div className="form-block-title">Ваш номер телефона</div>
                  <div className="calc_error">Введите телефон полностью</div>
                  <input type="tel" name="phone" required className="calculate__form-inp tel" placeholder="+7 (925) 000-99-77" />
                </div>
                <button type="submit" className="btn calc-btn">Оставить заявку</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section id="other_materials">
        <div className="container">
          <div className="ou__wrapper">
            <div className="ou-title">
              <h2>Другие <span>материалы</span></h2>
            </div>
            <div className="ou-examples">
              {DOORS_OTHER_MATERIALS.map((item) => (
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

      <section id="cost_furniture">
        <div className="container">
          <div className="cost__wrapper">
            <div className="cost-title">
              <h2><span>{DOORS_COST_TITLE.h2}</span></h2>
              <p>{DOORS_COST_TITLE.subtitle}</p>
            </div>
            <div className="cost__content">
              <div className="cost__content-blocks">
                {DOORS_COST_BLOCKS.map((block) => (
                  <div key={block.title} className="cost__content-block">
                    <div className="content-block-title">
                      <div className="content-block-title-text">{block.title}</div>
                    </div>
                    <div className="content-block-decor" />
                    <div className="content-block-price">{block.price}</div>
                  </div>
                ))}
                <div className="cost__content-btns">
                  <Link href="/myagkie-okna-czena" className="btn cost-btn">Все цены</Link>
                </div>
                <div className="cost__content-info">
                  <p className="cost-title">{DOORS_COST_FOOTNOTE}</p>
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

      <section>
        <div className="container">
          <div className="seo_block__wrapper">
            <div className="seo_block-title">
              <h2>{DOORS_SEO_TITLE}</h2>
            </div>
            <div className="seo_block-subtitle" dangerouslySetInnerHTML={{ __html: DOORS_SEO_HTML }} />
            <div className="btn js-seo-btn">Читать далее</div>
          </div>
        </div>
      </section>
    </>
  );
}
