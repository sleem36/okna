import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import HeroSection from '../../components/HeroSection';
import ContactFormSection from '../../components/ContactFormSection';
import WorksSection from '../../components/WorksSection';
import ReviewsSection from '../../components/ReviewsSection';
import SeoBlock from '../../components/SeoBlock';
import {
  ZAMER_HERO,
  ZAMER_MC,
  ZAMER_MF,
  ZAMER_SM,
  ZAMER_OTHER_SERVICES,
  ZAMER_COST_TITLE,
  ZAMER_COST_BLOCKS,
  ZAMER_COST_FOOTNOTE,
  ZAMER_SEO_TITLE,
  ZAMER_SEO_HTML,
} from '../../lib/zamer-page-data';

const HERO_IMG_STYLE = { width: '89%', height: '104%', objectFit: 'cover' };

export default function ZamerPageContent() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Замер мягких окон' }]} />

      <HeroSection {...ZAMER_HERO} imgStyle={HERO_IMG_STYLE} />

      <section id="measurers_call">
        <div className="container">
          <div className="mc__wrapper">
            <div className="mc__wrapper-left">
              <div className="mc-title">
                <h2>{ZAMER_MC.title}</h2>
                <p>{ZAMER_MC.text}</p>
              </div>
              <div>
                <ul className="mc-list">
                  {ZAMER_MC.list.map((item) => (
                    <li key={item} className="mc-list-item">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mc-wrapper-right">
              <img src={ZAMER_MC.img} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section id="measuring_free">
        <div className="container">
          <div className="mf__wrapper">
            <div className="mf-title">
              <h2><span>{ZAMER_MF.title}</span><a className="footnote-btn" href={ZAMER_MF.footnoteHref}>*</a></h2>
            </div>
            <div className="mf__cards">
              {ZAMER_MF.cards.map((card) => (
                <div key={card.number} className="mf__cards-card">
                  <div className="mf__cards-card-top">
                    <div className="mf__cards-card-number">{card.number}</div>
                    <div className="mf__cards-card-square">
                      <img src={card.img} alt="" />
                    </div>
                  </div>
                  <div className="mf__cards-card-title">{card.title}</div>
                </div>
              ))}
            </div>
            <div className="mf-btns">
              <Link href={ZAMER_MF.buttonHref} className="btn mf-btn">{ZAMER_MF.buttonText}</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="self_measurement">
        <div className="price_window_order contacts_order">
          <div className="container">
            <div className="sm__wrapper">
              <div className="sm-title">
                <h2>{ZAMER_SM.title}</h2>
              </div>
              <div className="sm-text-wrapper">
                <div className="sm-text">
                  <div className="sm-text-top">
                    <p style={{ whiteSpace: 'pre-line' }}>{ZAMER_SM.text}</p>
                  </div>
                </div>
                <div className="sm-btns">
                  <Link href={ZAMER_SM.buttonHref} className="btn sm-btn">{ZAMER_SM.buttonText}</Link>
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
              {ZAMER_OTHER_SERVICES.map((item) => (
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
              <h2><span>{ZAMER_COST_TITLE.h2}</span> {ZAMER_COST_TITLE.subtitle}</h2>
              <p>{ZAMER_COST_TITLE.info}</p>
            </div>
            <div className="cost__content">
              <div className="cost__content-blocks">
                {ZAMER_COST_BLOCKS.map((block) => (
                  <div key={block.title} className="cost__content-block">
                    <div className="content-block-title">
                      <div className="content-block-title-text">{block.title}</div>
                    </div>
                    <div className="content-block-decor" />
                    <div className="content-block-price">{block.price}</div>
                  </div>
                ))}
                <div className="cost__content-info">
                  <p className="cost-title">{ZAMER_COST_FOOTNOTE}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactFormSection sectionId="window_order" />
      <SeoBlock title={ZAMER_SEO_TITLE} html={ZAMER_SEO_HTML} />
    </>
  );
}
