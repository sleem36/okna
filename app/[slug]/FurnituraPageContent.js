import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import HeroSection from '../../components/HeroSection';
import ContactFormSection from '../../components/ContactFormSection';
import WorksSection from '../../components/WorksSection';
import ReviewsSection from '../../components/ReviewsSection';
import CalculatorSection from '../../components/CalculatorSection';
import SeoBlock from '../../components/SeoBlock';
import {
  FURNITURA_HERO,
  FURNITURA_HO,
  FURNITURA_HO_ITEMS,
  FURNITURA_OTHER_MATERIALS,
  FURNITURA_COST_BLOCKS,
  FURNITURA_SEO_TITLE,
  FURNITURA_SEO_HTML,
} from '../../lib/furnitura-page-data';

const HERO_IMG_STYLE = { width: '89%', height: '104%', objectFit: 'cover' };

export default function FurnituraPageContent() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Фурнитура' }]} />

      <HeroSection {...FURNITURA_HERO} imgStyle={HERO_IMG_STYLE} titleStyle={{ whiteSpace: 'pre-line' }} />

      <section id="ho_furniture">
        <div className="container">
          <div className="ho__wrapper">
            <div className="ho__header">
              <div className="ho-title">
                <h2>{FURNITURA_HO.title}</h2>
                <span>{FURNITURA_HO.subtitle}</span>
              </div>
              <div className="ho__header-info">{FURNITURA_HO.info}</div>
            </div>
            <div className="ho__blocks">
              {FURNITURA_HO_ITEMS.map((item) => (
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

      <CalculatorSection />

      <section id="other_materials">
        <div className="container">
          <div className="ou__wrapper">
            <div className="ou-title">
              <h2>Другие <span>материалы</span></h2>
            </div>
            <div className="ou-examples">
              {FURNITURA_OTHER_MATERIALS.map((item) => (
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

      <section id="cost_furniture">
        <div className="container">
          <div className="cost__wrapper">
            <div className="cost-title">
              <h2><span>Стоимость</span> фурнитуры</h2>
              <p />
            </div>
            <div className="cost__content">
              <div className="cost__content-blocks">
                {FURNITURA_COST_BLOCKS.map((block) => (
                  <div key={block.title} className="cost__content-block">
                    <div className="content-block-title">
                      <div className="content-block-title-text furniture_page">{block.title}</div>
                    </div>
                    <div className="content-block-decor" />
                    <div className="content-block-price">{block.price}</div>
                  </div>
                ))}
                <div className="cost__content-btns">
                  <Link href="/myagkie-okna-czena" className="btn cost-btn">Все цены</Link>
                </div>
                <div className="cost__content-info">
                  <p className="cost-title" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactFormSection />
      <SeoBlock title={FURNITURA_SEO_TITLE} html={FURNITURA_SEO_HTML} />
    </>
  );
}
