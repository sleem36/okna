import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import HeroSection from '../../components/HeroSection';
import ContactFormSection from '../../components/ContactFormSection';
import WorksSection from '../../components/WorksSection';
import ReviewsSection from '../../components/ReviewsSection';
import {
  DELIVERY_HERO,
  DELIVERY_COST_TITLE,
  DELIVERY_COST_BLOCKS,
  DELIVERY_COST_FOOTNOTE,
  DELIVERY_OTHER_SERVICES,
} from '../../lib/delivery-page-data';

const HERO_IMG_STYLE = { width: '89%', height: '104%', objectFit: 'cover' };

export default function DeliveryPageContent() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Доставка мягких окон' }]} />

      <HeroSection {...DELIVERY_HERO} imgStyle={HERO_IMG_STYLE} />

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

      <WorksSection />
      <ReviewsSection />
      <ContactFormSection />
    </>
  );
}
