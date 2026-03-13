import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import HeroSection from '../../components/HeroSection';
import ContactFormSection from '../../components/ContactFormSection';
import CalculatorSection from '../../components/CalculatorSection';
import SeoBlock from '../../components/SeoBlock';
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

const HERO_IMG_STYLE = { width: '89%', height: '104%', objectFit: 'cover' };

export default function CenaPageContent() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Цены' }]} />

      <HeroSection {...CENA_HERO} imgStyle={HERO_IMG_STYLE} />

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

      <CalculatorSection fasteners={CENA_CALC_FASTENERS} />
      <ContactFormSection />
      <SeoBlock title={CENA_SEO_TITLE} html={CENA_SEO_HTML} />
    </>
  );
}
