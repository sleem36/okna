import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import data from '../../lib/data';
import Breadcrumbs from '../../components/Breadcrumbs';
import OrderFormBlock from '../../components/OrderFormBlock';
import EdgingPageContent from './EdgingPageContent';
import FurnituraPageContent from './FurnituraPageContent';
import DoorsPageContent from './DoorsPageContent';
import DeliveryPageContent from './DeliveryPageContent';

const EDGING_SLUG = 'myagkie-okna-s-okantovkoy';
const FURNITURA_SLUG = 'furnitura-dlya-myagkikh-okon';
const DOORS_SLUG = 'myagkie-okna-dver';
const DELIVERY_SLUG = 'dostavka-myagkih-okon';

export async function generateStaticParams() {
  const pages = data.getPages();
  const slugs = pages.map((p) => ({ slug: p.slug }));
  [EDGING_SLUG, FURNITURA_SLUG, DOORS_SLUG, DELIVERY_SLUG].forEach((slug) => {
    if (!slugs.some((s) => s.slug === slug)) slugs.push({ slug });
  });
  return slugs;
}

export async function generateMetadata({ params }) {
  if (params.slug === EDGING_SLUG) {
    return {
      title: 'Окантовка для мягких окон купить в Москве | Стоимость оконтовки | Мягкие окна Стиль',
      description: 'Окантовка для мягких окон. Прочные, гибкие материалы, быстрая установка и долговечность. Быстрая доставка до двери. Мягкие окна «Стиль» уже более 7 лет занимаются производством',
    };
  }
  if (params.slug === FURNITURA_SLUG) {
    return {
      title: 'Фурнитура для мягких окон купить в Москве | Цена на фурнитуру | Мягкие окна Стиль',
      description: 'Фурнитура для мягких окон. Прочные, гибкие материалы, быстрая установка и долговечность. Как правильно выбрать и установить фурнитуру, чтобы обеспечить надежность мягких окон. Мягкие окна «Стиль»',
    };
  }
  if (params.slug === DOORS_SLUG) {
    return {
      title: 'Мягкие двери купить в Москве | Цены на двери для мягких окон | Мягкие окна Стиль',
      description: 'Мягкие двери. Прочные, гибкие материалы, быстрая установка и долговечность. Быстрая доставка до двери. Мягкие окна «Стиль» уже более 7 лет занимаются производством',
    };
  }
  if (params.slug === DELIVERY_SLUG) {
    return {
      title: 'Доставка мягких окон | Мягкие окна Стиль',
      description: 'Доставка мягких окон. Прочные, гибкие материалы, быстрая установка и долговечность. Быстрая доставка до двери. Мягкие окна «Стиль» уже более 7 лет занимаются производством',
    };
  }
  const page = data.getPageBySlug(params.slug);
  if (!page) return { title: 'Страница не найдена' };
  return { title: `${page.title} — Мягкие окна Стиль`, description: page.excerpt || '' };
}

export default function PageBySlug({ params }) {
  if (params.slug === EDGING_SLUG) {
    return <EdgingPageContent />;
  }
  if (params.slug === FURNITURA_SLUG) {
    return <FurnituraPageContent />;
  }
  if (params.slug === DOORS_SLUG) {
    return <DoorsPageContent />;
  }
  if (params.slug === DELIVERY_SLUG) {
    return <DeliveryPageContent />;
  }
  const page = data.getPageBySlug(params.slug);
  if (!page) notFound();

  const panelText = page.excerpt || 'Производитель мягких окон от 1100 рублей за кв. метр.';

  return (
    <>
      <Breadcrumbs items={[{ label: page.title }]} />

      <section id="win_main">
          <div className="container">
            <div className="main__wrapper">
              <div className="main__block">
                <div className="main__text">
                  <div className="main__text-title">
                    <div className="panel__text mobile_title">{panelText}</div>
                    <h1>{page.title}</h1>
                  </div>
                </div>
                <div className="main__img">
                  {page.featured_image ? (
                    <Image
                      src={page.featured_image}
                      alt={page.title}
                      width={800}
                      height={500}
                      unoptimized
                      style={{ width: '89%', height: '104%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '89%', height: '104%', minHeight: 300, background: '#f0f0f0' }} />
                  )}
                </div>
              </div>
              <div className="main__panel">
                <div className="panel__wrapper">
                  <Link href="#window_order" className="panel__btn">
                    <div>Оформить заказ</div>
                  </Link>
                  <div className="panel__arrow">
                    <img src="/theme/img/mainArrow.svg" alt="" />
                  </div>
                  <div className="panel__text">{panelText}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {page.content && (
          <section style={{ paddingTop: '60px', paddingBottom: '60px' }}>
            <div className="container">
              <div
                className="page-content"
                dangerouslySetInnerHTML={{ __html: page.content }}
                style={{ maxWidth: '900px' }}
              />
            </div>
          </section>
        )}

        <OrderFormBlock />
    </>
  );
}
