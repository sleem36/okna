import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import HeroSection from '../../components/HeroSection';
import ContactFormSection from '../../components/ContactFormSection';
import WorksSection from '../../components/WorksSection';
import ReviewsSection from '../../components/ReviewsSection';
import CalculatorSection from '../../components/CalculatorSection';
import SeoBlock from '../../components/SeoBlock';
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

const HERO_IMG_STYLE = { width: '89%', height: '104%', objectFit: 'cover' };

export default function DoorsPageContent() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Мягкие двери' }]} />

      <HeroSection {...DOORS_HERO} imgStyle={HERO_IMG_STYLE} />

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

      <CalculatorSection />

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

      <WorksSection />
      <ReviewsSection />

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

      <ContactFormSection />
      <SeoBlock title={DOORS_SEO_TITLE} html={DOORS_SEO_HTML} />
    </>
  );
}
