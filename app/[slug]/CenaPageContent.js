import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import {
  CENA_HERO,
  CENA_COST_TABS,
  CENA_COST_BY_AREA,
  CENA_PRICE_CARDS,
  CENA_MF_CARDS,
  CENA_ZAMER_TITLE,
  CENA_ZAMER_BLOCKS,
  CENA_ZAMER_INFO,
  CENA_MONTAZH_BLOCKS,
  CENA_MONTAZH_LIST,
  CENA_DELIVERY_TITLE,
  CENA_DELIVERY_BLOCKS,
  CENA_DELIVERY_FOOTNOTE,
  CENA_CALC_FASTENERS,
  CENA_SEO_TITLE,
  CENA_SEO_HTML,
} from '../../lib/cena-page-data';

export default function CenaPageContent() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Цены' }]} />

      <section id="win_main">
        <div className="container">
          <div className="main__wrapper">
            <div className="main__block">
              <div className="main__text">
                <div className="main__text-title">
                  <div className="panel__text mobile_title">{CENA_HERO.panelText}</div>
                  <h1>{CENA_HERO.title}</h1>
                </div>
              </div>
              <div className="main__img">
                <img src={CENA_HERO.img} alt="" style={{ width: '89%', height: '104%', objectFit: 'cover' }} />
              </div>
            </div>
            <div className="main__panel">
              <div className="panel__wrapper">
                <Link href={CENA_HERO.buttonHref} className="panel__btn">
                  <div>{CENA_HERO.buttonText}</div>
                </Link>
                <div className="panel__arrow">
                  <img src="/theme/img/mainArrow.svg" alt="" />
                </div>
                <div className="panel__text">{CENA_HERO.panelText}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cost_furniture">
        <div className="container">
          <div className="cost__wrapper">
            <h2><span>Стоимость мягких окон</span></h2>
            <div className="cost-titles">
              {CENA_COST_TABS.map((tab) => (
                <div key={tab.index} className={`cost-title odin${tab.index === 0 ? ' active' : ''}`} data-index={tab.index}>
                  <span>{tab.label}</span>
                </div>
              ))}
            </div>
            <div className="cosr_slider">
              <div className="cost_wrapper">
                {CENA_COST_BY_AREA.map((blocks, idx) => (
                  <div key={idx} data-index={idx} className="cost__content">
                    <div className="cost__content-blocks">
                      {blocks.map((block) => (
                        <div key={block.price} className="cost__content-block">
                          <div className="content-block-title">
                            <div className="content-block-title-text">{block.title}</div>
                          </div>
                          <div className="content-block-decor delivery" />
                          <div className="content-block-price">{block.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="price_window__wrapper">
            <div className="price_window-title">
              <h2><span>Стоимость</span> окон</h2>
            </div>
            <div className="price_window__cards">
              {CENA_PRICE_CARDS.map((card) => (
                <div key={card.price} className="price_window__card">
                  <div className="empty-pwc-left" />
                  <div className="empty-pwc-right" />
                  <div className="price__card-img">
                    <img src={card.img} alt="" />
                    <div className="price__card-price">{card.price}</div>
                  </div>
                  <ul className="price__card-menu">
                    {card.items.map((item) => (
                      <li key={item} className="price__card-menu-item">{item}</li>
                    ))}
                  </ul>
                  <Link href="#contacts_order" className="price__card-btn btn">Оставить заявку</Link>
                </div>
              ))}
            </div>
            <div className="price_window_order" id="price_window_order">
              <div className="price_window_order-title">
                <h3>Не смогли определиться с выбором?</h3>
              </div>
              <form className="price_window_form" id="main1" action="#">
                <div className="price_window_form-inp">
                  <input type="text" name="name" required maxLength={35} />
                  <span className="floating-label floating-label-name">Имя</span>
                </div>
                <div className="price_window_form-inp">
                  <input type="tel" name="phone" required />
                  <span className="floating-label floating-label-name">Номер телефона</span>
                </div>
                <button type="submit" className="btn price_window_form-btn">Оставить заявку</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="measuring_free">
        <div className="container">
          <div className="mf__wrapper">
            <div className="mf-title">
              <h2><span>Бесплатный замер</span><a className="footnote-btn" href="#footnote">*</a></h2>
            </div>
            <div className="mf__cards">
              {CENA_MF_CARDS.map((card) => (
                <div key={card.number} className="mf__cards-card">
                  <div className="mf__cards-card-top">
                    <div className="mf__cards-card-number">{card.number}</div>
                  </div>
                  <div className="mf__cards-card-title">{card.title}</div>
                </div>
              ))}
            </div>
            <div className="mf-btns">
              <Link href="#contacts_order" className="btn mf-btn">Заказать замер</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="cost_measuring">
        <div className="container">
          <div className="cost__wrapper">
            <div className="cost-title">
              <h2><span>{CENA_ZAMER_TITLE.h2}</span> {CENA_ZAMER_TITLE.subtitle}</h2>
              <p>{CENA_ZAMER_TITLE.info}</p>
            </div>
            <div className="cost__content">
              <div className="cost__content-blocks">
                {CENA_ZAMER_BLOCKS.map((block) => (
                  <div key={block.title} className="cost__content-block">
                    <div className="content-block-title">
                      <div className="content-block-title-text">{block.title}</div>
                    </div>
                    <div className="content-block-decor" />
                    <div className="content-block-price">{block.price}</div>
                  </div>
                ))}
                <div className="cost__content-info">
                  <p className="cost-title">{CENA_ZAMER_INFO}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cost_montazh">
        <div className="container">
          <div className="cost__wrapper">
            <div className="cost-title">
              <h2><span>Стоимость</span> монтажа</h2>
              <p></p>
            </div>
            <div className="cost__content">
              <div className="cost__content-blocks">
                {CENA_MONTAZH_BLOCKS.map((block) => (
                  <div key={block.title} className="cost__content-block">
                    <div className="content-block-title">
                      <div className="content-block-title-text">{block.title}</div>
                    </div>
                    <div className="content-block-decor" />
                    <div className="content-block-price">{block.price}</div>
                  </div>
                ))}
                <div className="cost__content-info">
                  <ul className="cost__content-list">
                    {CENA_MONTAZH_LIST.map((item) => (
                      <li key={item} className="cost__content-list-item">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cost_delivery">
        <div className="container">
          <div className="cost__wrapper">
            <div className="cost-title">
              <h2><span>{CENA_DELIVERY_TITLE.h2}</span> {CENA_DELIVERY_TITLE.subtitle}</h2>
              <p>{CENA_DELIVERY_TITLE.info}</p>
            </div>
            <div className="cost__content">
              <div className="cost__content-blocks">
                {CENA_DELIVERY_BLOCKS.map((block) => (
                  <div key={block.title} className="cost__content-block">
                    <div className="content-block-title">
                      <div className="content-block-title-text">{block.title}</div>
                    </div>
                    <div className="content-block-decor delivery" />
                    <div className="content-block-price">{block.price}</div>
                  </div>
                ))}
                <div className="cost__content-info">
                  <p className="cost-title">{CENA_DELIVERY_FOOTNOTE}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="calculate">
        <div className="container">
          <div className="calculate__wrapper">
            <div className="calculate__title">
              <h2><span>Рассчитайте стоимость</span> ваших мягких окон</h2>
              <p></p>
            </div>
            <form className="calculate__form" id="calc1" action="#">
              <div className="calculate__form-calculator">
                <div className="calculate__form-title">Калькулятор стоимости</div>
                <div className="calculate__form-block range__slider" data-min="0" data-max="100">
                  <input type="range" className="calculate__form-inp range" defaultValue={1} max={100} min={0} />
                  <output className="bubble">1 м²</output>
                  <input type="text" name="meters" className="calculate__form-inp squares" placeholder="1 м²" defaultValue="1" />
                </div>
                <div className="form-block-title">Доставка</div>
                <div className="calculate__form-block range__slider" data-min="0" data-max="100">
                  <input type="range" className="calculate__form-inp range range_delivery" defaultValue={0} max={100} min={0} />
                  <output className="bubble bubble_delivery">0 км</output>
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
                    {CENA_CALC_FASTENERS.map((f) => (
                      <div key={f.index} data-value={f.value} data-index={f.index} data-label={f.label} className={`block-type${f.index === 0 ? ' active' : ''}`}>
                        <img src={f.img} alt="" />
                        {f.label}
                      </div>
                    ))}
                  </div>
                  <input type="hidden" name="krepezh_name" defaultValue={CENA_CALC_FASTENERS[0].label} />
                  <input type="hidden" name="krepezh_price" defaultValue={String(CENA_CALC_FASTENERS[0].value)} />
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
                    Стоимость: <span>54 700 руб.</span>
                    <input type="hidden" className="calc_price" name="calc_price" defaultValue="54700" />
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
              <button type="submit" className="btn price_window_form-btn contacts_form-btn">Оставить заявку</button>
            </form>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="seo_block__wrapper">
            <div className="seo_block-title"><h2></h2></div>
            <div className="seo_block-subtitle" dangerouslySetInnerHTML={{ __html: CENA_SEO_HTML }} />
            <div className="btn js-seo-btn">Читать далее</div>
          </div>
        </div>
      </section>
    </>
  );
}
