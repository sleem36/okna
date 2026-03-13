import Breadcrumbs from '../../components/Breadcrumbs';
import HeroSection from '../../components/HeroSection';
import ReviewsSection from '../../components/ReviewsSection';
import ContactFormSection from '../../components/ContactFormSection';

const REVIEWS_HERO = {
  title: 'ОТЗЫВЫ',
  panelText: 'Оставьте отзыв и получите 2% кэшбэк',
  buttonText: 'ОФОРМИТЬ ЗАКАЗ',
  buttonHref: '#contacts_order',
  img: '/uploads/2023/05/Rectangle-253-1.png',
};

const HERO_IMG_STYLE = { width: '89%', height: '104%', objectFit: 'cover' };

export default function ReviewsPageContent() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Отзывы' }]} />

      <HeroSection {...REVIEWS_HERO} imgStyle={HERO_IMG_STYLE} />
      <ReviewsSection showTitle={false} />
      <ContactFormSection />
    </>
  );
}
