import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import data from '../../lib/data';
import Breadcrumbs from '../../components/Breadcrumbs';
import OrderFormBlock from '../../components/OrderFormBlock';

export async function generateStaticParams() {
  const pages = data.getPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const page = data.getPageBySlug(params.slug);
  if (!page) return { title: 'Страница не найдена' };
  return { title: `${page.title} — Мягкие окна Стиль`, description: page.excerpt || '' };
}

export default function PageBySlug({ params }) {
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
