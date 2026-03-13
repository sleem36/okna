import Link from 'next/link';
import Image from 'next/image';
import { WORKS_TABS, WORKS_SLIDES } from '../lib/shared-sections-data';

export default function WorksSection({ tabs = WORKS_TABS, slides = WORKS_SLIDES }) {
  return (
    <section id="works">
      <div className="container">
        <div className="works__wrapper">
          <div className="works-title">
            <h2>Наши <span>работы</span></h2>
          </div>
          <div className="works__content">
            <div className="works__content-titles">
              {tabs.map((tab) => (
                <div key={tab.index} className={`works__content-title${tab.index === 0 ? ' active' : ''}`} data-index={tab.index}>
                  <span>{tab.label}</span>
                </div>
              ))}
            </div>
            <div className="works-swipe">
              {slides.map((group, idx) => (
                <div key={idx} className="works__content-slider">
                  <div className={`swiper works${idx === 0 ? ' active' : ''}`} data-index={idx}>
                    <div className="swiper-wrapper">
                      {group.map((slide, slideIdx) => (
                          <div key={slideIdx} className="swiper-slide">
                            <Image src={slide.img} alt={slide.title || 'Наши работы'} width={400} height={300} style={{ width: '100%', height: 'auto' }} />
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
  );
}
