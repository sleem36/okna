import { notFound } from 'next/navigation';
import Link from 'next/link';
import data from '../../../lib/data';
import Breadcrumbs from '../../../components/Breadcrumbs';

function formatArticleDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  const day = String(d.getDate()).padStart(2, '0');
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const y = d.getFullYear();
  return ` ${day}.${m}.${y} `;
}

function normalizeSlug(slug) {
  if (!slug || typeof slug !== 'string') return '';
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export async function generateStaticParams() {
  const posts = data.getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const resolved = typeof params?.then === 'function' ? await params : params;
  const slug = normalizeSlug(resolved?.slug ?? '');
  const post = data.getPostBySlug(slug);
  if (!post) return { title: 'Запись не найдена' };
  return {
    title: `${post.title} — Мягкие окна Стиль`,
    description: post.excerpt ? post.excerpt.replace(/<[^>]+>/g, '').slice(0, 160) : '',
  };
}

export default async function BlogPostPage({ params }) {
  const resolved = typeof params?.then === 'function' ? await params : params;
  const slug = normalizeSlug(resolved?.slug ?? '');
  const post = data.getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = data.getPosts();
  const otherPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 6);

  return (
    <>
      <Breadcrumbs items={[{ label: post.title }]} />

      <main>
        <section id="article">
          <div className="container">
            <div className="article-name">
              <Link href="/blog">Статьи</Link> - <span>{post.title}</span>
            </div>
            <h1>{post.title}</h1>
            <div className="date">{formatArticleDate(post.date)}</div>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
          </div>
        </section>

        {otherPosts.length > 0 && (
          <section id="other_article">
            <div className="container">
              <div className="other_article">
                <h2>Другие статьи</h2>
                <div className="one-line line" />
                <div className="two-line line" />
                <div className="one-rectangle rectangle" />
                <div className="two-rectangle rectangle" />
                <div className="article-slider">
                  {otherPosts.map((other, idx) => (
                    <div key={other.slug} className="article-slide">
                      <div className={`article-slide-content ${idx === 0 ? 'active' : ''}`}>
                        <div className="article-slide-description">
                          <h3>{other.title}</h3>
                          {other.excerpt && <p>{(other.excerpt.replace(/<[^>]+>/g, '').slice(0, 280) || '')}{(other.excerpt.replace(/<[^>]+>/g, '').length > 280 ? '…' : '')}</p>}
                          <Link href={`/blog/${encodeURIComponent(other.slug)}`}>Читать далее</Link>
                        </div>
                        {other.featured_image ? (
                          <img src={other.featured_image} alt="" />
                        ) : (
                          <img src="/uploads/2023/05/Rectangle-225.png" alt="" />
                        )}
                      </div>
                      <div className={`article-slide-btn ${idx === 0 ? 'active' : ''}`}>{idx + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section id="contacts_order">
          <div className="container">
            <div className="price_window_order contacts_order">
              <div className="price_window_order-title">
                <h3>Оставить заявку на консультацию</h3>
                <p>Производитель мягких окон от 1100 рублей за кв. метр.</p>
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
                <button type="submit" className="btn price_window_form-btn contacts_form-btn">
                  Оставить заявку
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
