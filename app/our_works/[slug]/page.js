import Link from "next/link";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ProjectGallery from "../../../components/ProjectGallery";
import {
  getWorkBySlug,
  getAllWorkSlugs,
  TYPE_LABELS,
} from "../../../lib/our-works-page-data";

const PANEL_TEXT = "Производитель мягких окон от 1100 рублей за кв. метр.";

const INFO_BLOCKS = [
  { key: "type", title: "Тип объекта", icon: "Info.svg" },
  { key: "areaS", title: "Площадь", icon: "Crop.svg" },
  { key: "time", title: "Сроки", icon: "Timer.svg" },
  { key: "width", title: "Толщина ПВХ", icon: "ArrowsInLineVertical.svg" },
  { key: "edgingText", title: "Окантовка", icon: "CopySimple.svg" },
  { key: "furnitureText", title: "Фурнитура", icon: "GearSix.svg" },
];

export async function generateStaticParams() {
  return getAllWorkSlugs();
}

export async function generateMetadata({ params }) {
  const resolved = typeof params?.then === "function" ? await params : params;
  const slug = resolved?.slug ?? "";
  const work = getWorkBySlug(slug);
  if (!work) return { title: "Работа не найдена" };
  const title = `${work.title} — Мягкие окна Стиль`;
  const description = (work.text || "").replace(/\s+/g, " ").slice(0, 160);
  return {
    title,
    description: description || undefined,
    openGraph: { title: work.title },
  };
}

export default async function OurWorkDetailPage({ params }) {
  const resolved = typeof params?.then === "function" ? await params : params;
  const slug = resolved?.slug ?? "";
  const work = getWorkBySlug(slug);
  if (!work) {
    return (
      <div
        className="container"
        style={{ paddingTop: "120px", paddingBottom: "60px" }}
      >
        <p>Работа не найдена.</p>
        <Link href="/our_works">← Наши работы</Link>
      </div>
    );
  }

  const images = [work.imagePath, work.imagePath2, work.imagePath3].filter(
    Boolean,
  );
  const typeLabel = (work.type && TYPE_LABELS[work.type]) || work.type || "";

  const infoValues = {
    type: typeLabel,
    areaS: work.areaS || "",
    time: work.time || "",
    width: work.width || "",
    edgingText: work.edgingText || "",
    furnitureText: work.furnitureText || "",
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Наши работы", href: "/our_works" },
          { label: work.title },
        ]}
      />

      <section id="win_main">
        <div className="container">
          <div className="main__wrapper">
            <div className="main__block">
              <div className="main__text">
                <div className="main__text-title">
                  <div className="panel__text mobile_title">{PANEL_TEXT}</div>
                  <h1>{work.title}</h1>
                </div>
              </div>
              <div className="main__img">
                <img
                  src={images[0] || "/theme/img/placeholder.svg"}
                  alt=""
                  style={{ width: "89%", height: "104%", objectFit: "cover" }}
                />
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
                <div className="panel__text">{PANEL_TEXT}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="project">
        <div className="container">
          <div className="project__wrapper">
            <div className="project__content">
              <div className="project__slider">
                <ProjectGallery images={images} />
              </div>
              <div className="project__info">
                <div className="project__info-title">
                  {(work.text || "").replace(/\\r\\n/g, "\n").trim() ||
                    "Описание проекта."}
                </div>
                <div className="project__info-content">
                  {INFO_BLOCKS.map((block) => {
                    const value = infoValues[block.key];
                    if (value === undefined || value === "") return null;
                    return (
                      <div key={block.key} className="info-content-block">
                        <img src={`/theme/img/${block.icon}`} alt="" />
                        <div className="content-block-text">
                          <div className="content-block-text-title">
                            {block.title}
                          </div>
                          <div className="content-block-text-subtitle">
                            {value}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <Link href="#window_order" className="btn project-btn">
              Оформить заказ
            </Link>
          </div>
        </div>
      </section>

      <section id="window_order">
        <div className="container">
          <div className="price_window_order contacts_order">
            <div className="price_window_order-title">
              <h3>Не смогли определиться с выбором?</h3>
            </div>
            <form
              className="price_window_form main_form contacts_form"
              id="main1"
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
