import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import HeroSection from '../../components/HeroSection';
import ContactFormSection from '../../components/ContactFormSection';
import WorksSection from '../../components/WorksSection';
import ReviewsSection from '../../components/ReviewsSection';
import CalculatorSection from '../../components/CalculatorSection';
import SeoBlock from '../../components/SeoBlock';
import ProductCatalog from '../../components/ProductCatalog';
import {
  EDGING_HERO,
  EDGING_EO_TITLE,
  EDGING_EO_CARDS,
  EDGING_OTHER_MATERIALS,
  EDGING_COST_BLOCKS,
  EDGING_COST_FOOTNOTE,
  EDGING_CATALOG_ITEMS,
  EDGING_SEO_TITLE,
  EDGING_SEO_HTML,
} from '../../lib/edging-page-data';

const HERO_IMG_STYLE = { width: '89%', height: '104%', objectFit: 'cover' };

export default function EdgingPageContent() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Окантовка' }]} />

      <HeroSection {...EDGING_HERO} imgStyle={HERO_IMG_STYLE} />

      <section id="edging_main">
        <div className="container">
          <div className="eo__wrapper">
            <div className="eo-title">
              <h2>{EDGING_EO_TITLE.h2}</h2>
              <p className="eo-title-info">{EDGING_EO_TITLE.info}</p>
            </div>
            <div className="eo__cards">
              {EDGING_EO_CARDS.map((card) => (
                <div key={card.title} className="eo__cards-card">
                  <img src={card.img} alt="" />
                  <div className="eo-card-title">
                    <h4>{card.title}</h4>
                  </div>
                  <div className="eo-card-info">{card.info}</div>
                  <div className="eo-card-colors">
                    <div className="card-colors-block">
                      <div className="card-colors-title">Цвета в наличии</div>
                      <div className="card-colors">
                        {card.colorsInStock.map((src) => (
                          <img key={src} className="color" src={src} alt="" />
                        ))}
                      </div>
                    </div>
                    {card.colorsOnOrder.length > 0 && (
                      <div className="card-colors-block">
                        <div className="card-colors-title">Цвета под заказ</div>
                        <div className="card-colors">
                          {card.colorsOnOrder.map((src) => (
                            <img key={src} className="color" src={src} alt="" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CalculatorSection />

      <section id="other_materials">
        <div className="container">
          <div className="ou__wrapper">
            <div className="ou-title">
              <h2>Другие <span>материалы</span></h2>
            </div>
            <div className="ou-examples">
              {EDGING_OTHER_MATERIALS.map((item) => (
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

      <WorksSection />
      <ReviewsSection />

      <ProductCatalog items={EDGING_CATALOG_ITEMS} title="Каталог товаров" />

      <section id="cost_furniture">
        <div className="container">
          <div className="cost__wrapper">
            <div className="cost-title">
              <h2><span>Стоимость</span></h2>
              <p>Изготовления мягких окон без монтажа</p>
            </div>
            <div className="cost__content">
              <div className="cost__content-blocks">
                {EDGING_COST_BLOCKS.map((block) => (
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
                  <p className="cost-title">{EDGING_COST_FOOTNOTE}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactFormSection />
      <SeoBlock title={EDGING_SEO_TITLE} html={EDGING_SEO_HTML} />
    </>
  );
}
