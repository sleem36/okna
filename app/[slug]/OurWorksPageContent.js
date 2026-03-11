'use client';

import { useRef, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import {
  OUR_WORKS_HERO,
  WORKS_TABS,
  WORKS_SLIDES,
  ALL_SLIDES,
} from '../../lib/our-works-page-data';

const FILTER_KEYS = ['standart', 'luxe', 'premium', 'wood', 'metal', 'brick', 'pvh', 'poly', 'tone'];
const INIT_FILTER = Object.fromEntries(FILTER_KEYS.map((k) => [k, false]));

function applyFilter(slides, filterState) {
  const edging = ['standart', 'luxe', 'premium'].filter((k) => filterState[k]);
  const mount = ['wood', 'metal', 'brick'].filter((k) => filterState[k]);
  const material = ['pvh', 'poly', 'tone'].filter((k) => filterState[k]);
  return slides.filter((slide) => {
    if (edging.length && !edging.includes(slide.edgingType)) return false;
    if (mount.length && !mount.includes(slide.mountBase)) return false;
    if (material.length && !material.includes(slide.material)) return false;
    return true;
  });
}

function WorksGrid({ slides }) {
  return (
    <div className="our_works-wrapper">
      {slides.map((slide, i) => (
        <div key={slide.id || i} className="swiper-slide">
          <img src={slide.img} alt="" />
          <p>{slide.title}</p>
          <div className="swiper-slide-hidden">
            <Link href={slide.link} className="swiper-slide-hidden-link">Посмотреть</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function OurWorksPageContent() {
  const slidesByTab = [ALL_SLIDES, WORKS_SLIDES[1], WORKS_SLIDES[2], WORKS_SLIDES[3], WORKS_SLIDES[4], WORKS_SLIDES[5]];
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [filterState, setFilterState] = useState(INIT_FILTER);
  const formRef = useRef(null);

  const displayedSlides = useMemo(
    () => applyFilter(slidesByTab[activeTabIndex] || [], filterState),
    [activeTabIndex, filterState]
  );

  const handleApply = useCallback((e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const next = { ...INIT_FILTER };
    FILTER_KEYS.forEach((name) => {
      const el = form.elements[name];
      if (el && el.type === 'checkbox') next[name] = !!el.checked;
    });
    setFilterState(next);
  }, []);

  const handleReset = useCallback((e) => {
    e.preventDefault();
    setFilterState(INIT_FILTER);
    const form = formRef.current;
    if (form) {
      FILTER_KEYS.forEach((name) => {
        const el = form.elements[name];
        if (el && el.type === 'checkbox') el.checked = false;
      });
    }
  }, []);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Наши работы' }]} />

      <section id="win_main">
        <div className="container">
          <div className="main__wrapper">
            <div className="main__block">
              <div className="main__text">
                <div className="main__text-title">
                  <div className="panel__text mobile_title">{OUR_WORKS_HERO.panelText}</div>
                  <h1>{OUR_WORKS_HERO.title}</h1>
                </div>
              </div>
              <div className="main__img">
                <img src={OUR_WORKS_HERO.img} alt="" style={{ width: '89%', height: '104%', objectFit: 'cover' }} />
              </div>
            </div>
            <div className="main__panel">
              <div className="panel__wrapper">
                <Link href={OUR_WORKS_HERO.buttonHref} className="panel__btn">
                  <div>{OUR_WORKS_HERO.buttonText}</div>
                </Link>
                <div className="panel__arrow">
                  <img src="/theme/img/mainArrow.svg" alt="" />
                </div>
                <div className="panel__text">{OUR_WORKS_HERO.panelText}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="our_works">
        <div className="container">
          <div className="works__wrapper">
            <div className="works-title">
              <h2>Наши <span>работы</span></h2>
            </div>
            <div className="works__content">
              <div className="works__content-titles">
                {WORKS_TABS.map((tab) => (
                  <div
                    key={tab.index}
                    role="button"
                    tabIndex={0}
                    className={`works__content-title${tab.index === activeTabIndex ? ' active' : ''}`}
                    data-index={tab.index}
                    onClick={() => setActiveTabIndex(tab.index)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTabIndex(tab.index); } }}
                  >
                    <span>{tab.label}</span>
                  </div>
                ))}
              </div>
              <div className="works__content__wrapper">
                <form className="works__content-filter" id="sort" ref={formRef} onSubmit={(e) => e.preventDefault()}>
                  <div className="filter__wrapper">
                    <div className="filter-block">
                      <div className="filter-block-title">Окантовка <img src="/theme/img/our_works_triangle.svg" alt="" /></div>
                      <div className="filter-boxes">
                        <label className="filter filter-checkbox">
                          Стандарт
                          <input name="standart" type="checkbox" />
                          <div className="filter_indicator" />
                        </label>
                        <label className="filter filter-checkbox">
                          Люкс
                          <input name="luxe" type="checkbox" />
                          <div className="filter_indicator" />
                        </label>
                        <label className="filter filter-checkbox">
                          Премиум
                          <input name="premium" type="checkbox" />
                          <div className="filter_indicator" />
                        </label>
                      </div>
                    </div>
                    <div className="filter-block">
                      <div className="filter-block-title">ОСНОВАНИЕ МОНТАЖА <img src="/theme/img/our_works_triangle.svg" alt="" /></div>
                      <div className="filter-boxes">
                        <label className="filter filter-checkbox">
                          Дерево
                          <input name="wood" type="checkbox" />
                          <div className="filter_indicator" />
                        </label>
                        <label className="filter filter-checkbox">
                          Металл
                          <input name="metal" type="checkbox" />
                          <div className="filter_indicator" />
                        </label>
                        <label className="filter filter-checkbox">
                          Кирпич
                          <input name="brick" type="checkbox" />
                          <div className="filter_indicator" />
                        </label>
                      </div>
                    </div>
                    <div className="filter-block">
                      <div className="filter-block-title">ОСНОВНОЙ МАТЕРИАЛ <img src="/theme/img/our_works_triangle.svg" alt="" /></div>
                      <div className="filter-boxes">
                        <label className="filter filter-checkbox">
                          ПВХ
                          <input name="pvh" type="checkbox" />
                          <div className="filter_indicator" />
                        </label>
                        <label className="filter filter-checkbox">
                          Полиуретан
                          <input name="poly" type="checkbox" />
                          <div className="filter_indicator" />
                        </label>
                        <label className="filter filter-checkbox">
                          Тонированная ПВХ
                          <input name="tone" type="checkbox" />
                          <div className="filter_indicator" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="filter-btns">
                    <button type="button" className="btn filter-btn apply" onClick={handleApply}>Применить</button>
                    <button type="button" className="btn filter-btn reset" onClick={handleReset}>Сбросить</button>
                  </div>
                </form>
                <div className="our_works__content">
                  <div className="our_works__content-slider active" data-index={activeTabIndex}>
                    <div className="our_works-swiper">
                      <WorksGrid slides={displayedSlides} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="window_order">
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
    </>
  );
}
