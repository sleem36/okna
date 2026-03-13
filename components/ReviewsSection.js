import Image from 'next/image';
import { REVIEWS_IMAGES } from '../lib/shared-sections-data';

const NavSvgPrev = () => (
  <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.90078 1.03835L9.80078 1.90415L2.60078 8.83048L9.80078 16.0956L8.90078 16.9614L1.70078 9.69628L0.800781 8.83048L8.90078 1.03835Z" fill="#263238" stroke="#263238" strokeWidth="0.692308" />
  </svg>
);

const NavSvgNext = () => (
  <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M2.03672 16.9616L1.13672 16.0958L8.33672 9.16952L1.13672 1.90437L2.03672 1.03857L9.23672 8.30372L10.1367 9.16952L2.03672 16.9616Z" fill="#263238" stroke="#263238" strokeWidth="0.692308" />
  </svg>
);

export default function ReviewsSection({ images = REVIEWS_IMAGES, showTitle = true }) {
  return (
    <section id="reviews">
      <div className="container">
        <div className="reviews__wrapper">
          {showTitle && (
            <div className="reviews-title">
              <h2>Отзывы</h2>
            </div>
          )}
          <div className="reviews__content">
            <div className="reviews__content-slider">
              <div className="swiper review">
                <div className="swiper-wrapper">
                  {images.map((src, i) => (
                    <div key={i} className="swiper-slide" data-swiper-slide-index={i}>
                      <div className="swiper-slide-bg">
                        <Image src={src} alt="Отзыв клиента" width={600} height={800} style={{ width: '100%', height: 'auto' }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="reviews-prev" tabIndex={-1} role="button" aria-label="Previous slide">
                  <NavSvgPrev />
                </div>
                <div className="swiper-pagination review-pagination" />
                <div className="reviews-next" tabIndex={0} role="button" aria-label="Next slide">
                  <NavSvgNext />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
