import Link from "next/link";
import data from "../../lib/data";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata = {
  title: "Статьи — Мягкие окна Стиль",
  description: "Статьи и записи блога",
};

const BLOG_HERO = {
  title: "Статьи",
  panelText: "Мягких окон от 1100 рублей за кв. метр.",
  buttonText: "ОФОРМИТЬ ЗАКАЗ",
  buttonHref: "#contacts_order",
  img: "/uploads/2023/05/Rectangle-253-1.png",
};

// В оригинале на странице блога только 3 статьи с этими картинками (как в blog.html)
const BLOG_LIST_SLUGS = ["статья1", "запись3", "статья-5"];
const BLOG_LIST_IMAGES = {
  статья1: "/uploads/2023/05/Rectangle-195.png", // дом
  запись3: "/uploads/2023/05/Rectangle-225.png", // веранда/солярий
  "статья-5": "/uploads/2023/05/Rectangle-226.png", // рулетка
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return ` ${y}-${m}-${day} ${h}:${min}:${s} `;
}

export default function BlogPage() {
  const allPosts = data.getPosts();
  const posts = BLOG_LIST_SLUGS.map((slug) =>
    allPosts.find((p) => p.slug === slug),
  ).filter(Boolean);

  return (
    <>
      <Breadcrumbs items={[{ label: "Статьи" }]} />

      <section id="main">
        <div className="container">
          <div className="main__wrapper">
            <div className="main__block">
              <div className="main__text">
                <div className="main__text-title">
                  <div className="panel__text mobile_title">
                    {BLOG_HERO.panelText}
                  </div>
                  <h1>{BLOG_HERO.title}</h1>
                </div>
              </div>
              <div className="main__img">
                <img src={BLOG_HERO.img} alt="" />
              </div>
            </div>
            <div className="main__panel">
              <div className="panel__wrapper">
                <Link href={BLOG_HERO.buttonHref} className="panel__btn">
                  <div>{BLOG_HERO.buttonText}</div>
                </Link>
                <div className="panel__arrow">
                  <img src="/theme/img/mainArrow.svg" alt="" />
                </div>
                <div className="panel__text">{BLOG_HERO.panelText}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="blogs">
        <div className="container">
          <div className="blogs-container">
            {posts.length === 0 && (
              <p style={{ padding: "2rem", color: "#666" }}>
                Записей пока нет. Запустите <code>npm run parse-blog</code> для
                загрузки статей из blog.xml.
              </p>
            )}
            {posts.map((post) => (
              <div key={post.id || post.slug} className="blog first">
                <div className="blog-img">
                  <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                    <img
                      src={
                        BLOG_LIST_IMAGES[post.slug] ||
                        post.featured_image ||
                        "/uploads/2023/05/Rectangle-225.png"
                      }
                      alt=""
                    />
                  </Link>
                </div>
                <div className="blog-content">
                  <h2>
                    <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                      {post.title || "Без названия"}
                    </Link>
                  </h2>
                  <div className="date">{formatDate(post.date)}</div>
                  {post.excerpt && (
                    <p>{post.excerpt.replace(/<[^>]+>/g, "")}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts_order">
        <div className="container">
          <div className="price_window_order contacts_order">
            <div className="price_window_order-title">
              <h3>Оставить заявку на консультацию</h3>
            </div>
            <form
              className="price_window_form main_form contacts_form"
              id="main2"
              action="#"
            >
              <div className="price_window_form-inp contacts_form-inp">
                <input type="text" name="name" required maxLength={35} />
                <span className="floating-label floating-label-name">Имя</span>
              </div>
              <div className="price_window_form-inp contacts_form-inp">
                <input type="tel" name="phone" required />
                <span className="floating-label floating-label-name">
                  Номер телефона
                </span>
              </div>
              <button
                type="submit"
                className="btn price_window_form-btn contacts_form-btn"
              >
                Оставить заявку
              </button>
              <p className="form-consent">
                Нажимая на кнопку, Вы соглашаетесь на{' '}
                <a href="/privacy">обработку своих данных</a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
