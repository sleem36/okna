import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';

const GALLERY_HERO = {
  title: 'Галерея',
  panelText: 'Мягких окон от 1100 рублей за кв. метр.',
  buttonText: 'ОФОРМИТЬ ЗАКАЗ',
  buttonHref: '#contacts_order',
  img: '/uploads/2023/05/Rectangle-253-1.png',
};

const GALLERY_PHOTOS = [
  '/uploads/2024/09/2-18.jpg', '/uploads/2024/09/3-15.jpg', '/uploads/2024/09/3-13.jpg', '/uploads/2024/09/2-15.jpg',
  '/uploads/2024/09/2-13.jpg', '/uploads/2024/09/3-12.jpg', '/uploads/2024/09/1-17.jpg', '/uploads/2024/09/2-12.jpg',
  '/uploads/2024/09/3-10.jpg', '/uploads/2024/09/2-10.jpg', '/uploads/2024/09/5-1.jpg', '/uploads/2024/09/2-8.jpg',
  '/uploads/2024/09/3-6.jpg', '/uploads/2024/09/2-6.jpg', '/uploads/2024/09/2-5.jpg', '/uploads/2024/09/7.jpg',
  '/uploads/2024/09/1-4.jpg', '/uploads/2024/09/1-3.jpg', '/uploads/2024/09/1-2.jpg', '/uploads/2024/09/1-1.jpg',
];

const GALLERY_VIDEOS = [
  { src: '/uploads/2024/09/1.mp4' },
  { src: '/uploads/2024/09/2-1.mp4' },
  { src: '/uploads/2024/09/3.mp4' },
  { src: '/uploads/2024/09/4-1.mp4' },
  { src: '/uploads/2024/09/5.mp4' },
];

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

export default function GalleryPageContent() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Галерея' }]} />

      <section id="win_main">
        <div className="container">
          <div className="main__wrapper">
            <div className="main__block">
              <div className="main__text">
                <div className="main__text-title">
                  <div className="panel__text mobile_title">{GALLERY_HERO.panelText}</div>
                  <h1>{GALLERY_HERO.title}</h1>
                </div>
              </div>
              <div className="main__img">
                <img src={GALLERY_HERO.img} alt="" style={{ width: '89%', height: '104%', objectFit: 'cover' }} />
              </div>
            </div>
            <div className="main__panel">
              <div className="panel__wrapper">
                <Link href={GALLERY_HERO.buttonHref} className="panel__btn">
                  <div>{GALLERY_HERO.buttonText}</div>
                </Link>
                <div className="panel__arrow">
                  <img src="/theme/img/mainArrow.svg" alt="" />
                </div>
                <div className="panel__text">{GALLERY_HERO.panelText}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery">
        <div className="container">
          <div className="gallery">
            <div className="gallery-nav">
              <div className="gallery-nav-item photo_otch active" role="button" tabIndex={0}>Фотоотчеты</div>
              <div className="gallery-nav-item video_otch" role="button" tabIndex={0}>Видеоотчеты</div>
            </div>
            <div className="gallery-content">
              <div className="gallery-photo gallery_swiper active">
                <div className="swiper photo">
                  <div className="swiper-wrapper">
                    {GALLERY_PHOTOS.map((src, i) => (
                      <div key={i} className="swiper-slide">
                        <img src={src} alt="" />
                      </div>
                    ))}
                  </div>
                  <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
                </div>
                <div className="gallery__content-navigation">
                  <div className="photo-prev" tabIndex={0} role="button" aria-label="Предыдущий слайд"><NavSvgPrev /></div>
                  <div className="swiper-pagination photo-pagination" />
                  <div className="photo-next" tabIndex={0} role="button" aria-label="Следующий слайд"><NavSvgNext /></div>
                </div>
              </div>
              <div className="gallery-video gallery_swiper">
                <div className="swiper video-swiper">
                  <div className="swiper-wrapper">
                    {GALLERY_VIDEOS.map((v, i) => (
                      <div key={i} className="swiper-slide">
                        <video className="video-item" src={v.src} preload="metadata" />
                        <div className="gallery_video_play"><img src="/theme/img/play.svg" alt="" /></div>
                      </div>
                    ))}
                  </div>
                  <span className="swiper-notification" aria-live="assertive" aria-atomic="true" />
                </div>
                <div className="gallery__content-navigation">
                  <div className="video-prev" tabIndex={0} role="button" aria-label="Предыдущий слайд"><NavSvgPrev /></div>
                  <div className="swiper-pagination video-pagination" />
                  <div className="video-next" tabIndex={0} role="button" aria-label="Следующий слайд"><NavSvgNext /></div>
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
    </>
  );
}
