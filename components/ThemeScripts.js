'use client';

import { useEffect } from 'react';

export default function ThemeScripts() {
  useEffect(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.classList.add('hidden');
    }

    const burger = document.querySelector('.header__burger');
    const mobile = document.querySelector('.mobile');
    if (burger && mobile) {
      burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobile.classList.toggle('active');
      });
    }

    // Мобильное меню: раскрытие подпунктов по клику на стрелку
    document.querySelectorAll('.mobile-nav-item').forEach((navItem) => {
      const title = navItem.querySelector('.mobile-nav-item-title');
      const arrow = navItem.querySelector('.mobile-arrow');
      const drop = navItem.querySelector('.mobile-nav-item-drop');
      if (!arrow || !drop) return;
      const dropHeight = drop.scrollHeight;

      arrow.addEventListener('click', (e) => {
        e.preventDefault();
        if (drop.style.height && drop.style.height !== '0px') {
          document.querySelectorAll('.mobile-nav-item-drop').forEach((d) => (d.style.height = ''));
          document.querySelectorAll('.mobile-nav-item .mobile-arrow').forEach((a) => (a.style.transform = ''));
          drop.style.height = '';
          arrow.style.transform = '';
        } else {
          document.querySelectorAll('.mobile-nav-item-drop').forEach((d) => (d.style.height = ''));
          document.querySelectorAll('.mobile-nav-item .mobile-arrow').forEach((a) => (a.style.transform = ''));
          drop.style.height = dropHeight + 'px';
          arrow.style.transform = 'rotate(180deg)';
        }
      });
    });

    document.querySelectorAll('.mobile-first-drop').forEach((firstDrop) => {
      const dropArrow = firstDrop.querySelector('.mobile-arrow');
      const secondDrop = firstDrop.querySelector('.mobile-second-drop');
      const titleLink = firstDrop.querySelector('.mobile-nav-item-list-title a');
      if (!dropArrow || !secondDrop) return;
      const secondHeight = secondDrop.scrollHeight;

      dropArrow.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (secondDrop.style.height && secondDrop.style.height !== '0px') {
          secondDrop.style.height = '';
          dropArrow.style.transform = '';
          if (titleLink) titleLink.style.color = '';
        } else {
          document.querySelectorAll('.mobile-second-drop').forEach((d) => (d.style.height = ''));
          document.querySelectorAll('.mobile-first-drop .mobile-arrow').forEach((a) => (a.style.transform = ''));
          document.querySelectorAll('.mobile-nav-item-list-title a').forEach((a) => (a.style.color = ''));
          secondDrop.style.height = secondHeight + 'px';
          dropArrow.style.transform = 'rotate(180deg)';
          if (titleLink) titleLink.style.color = '#FF5C00';
        }
      });
    });

    // Слайдер «Причина выбрать мягкие окна» (Swiper)
    let reasonTries = 0;
    function initReasonSwiper() {
      const reasonEl = document.querySelector('.swiper.reason');
      if (!reasonEl || reasonEl.swiper || reasonTries > 40) return;
      if (typeof window !== 'undefined' && window.Swiper) {
        new window.Swiper('.swiper.reason', {
          slidesPerView: 'auto',
          spaceBetween: 40,
          navigation: {
            nextEl: '.reason-next',
            prevEl: '.reason-prev',
          },
          pagination: {
            el: '.reason-pagination',
            clickable: true,
          },
        });
      } else {
        reasonTries += 1;
        setTimeout(initReasonSwiper, 50);
      }
    }
    initReasonSwiper();

    // Слайдер «Отзывы» — как в теме soft-windows assets/js/main.js: на десктопе 3 слайда (два по бокам меньше), overlap, centered
    let reviewTries = 0;
    function initReviewSwiper() {
      const reviewEl = document.querySelector('.swiper.review');
      if (!reviewEl || reviewEl.swiper || reviewTries > 40) return;
      if (typeof window !== 'undefined' && window.Swiper) {
        new window.Swiper('.swiper.review', {
          loop: true,
          pagination: {
            el: '.review-pagination',
            clickable: false,
          },
          navigation: {
            nextEl: '.reviews-next',
            prevEl: '.reviews-prev',
          },
          breakpoints: {
            1300: {
              spaceBetween: -460,
              slidesPerView: 2,
              slidesPerGroup: 1,
              centeredSlides: true,
            },
          },
        });
      } else {
        reviewTries += 1;
        setTimeout(initReviewSwiper, 50);
      }
    }
    initReviewSwiper();

    // Блок «Наши работы»: переключение вкладок и инициализация слайдеров
    const worksTitles = document.querySelectorAll('#works .works__content-title');
    const worksSwipe = document.querySelector('#works .works-swipe');
    if (worksTitles.length && worksSwipe) {
      worksTitles.forEach((titleEl) => {
        titleEl.addEventListener('click', () => {
          const index = Number(titleEl.getAttribute('data-index'));
          worksTitles.forEach((t) => t.classList.remove('active'));
          titleEl.classList.add('active');
          document.querySelectorAll('#works .swiper.works').forEach((s) => s.classList.remove('active'));
          const activeSwiper = document.querySelector(`#works .swiper.works[data-index="${index}"]`);
          if (activeSwiper) activeSwiper.classList.add('active');
          worksSwipe.style.transform = `translateX(-${index * 100}%)`;
        });
      });
      // Инициализация Swiper для каждого блока работ (на десктопе 3 слайда, как в оригинале)
      function initWorksSwipers() {
        if (typeof window === 'undefined' || !window.Swiper) return;
        document.querySelectorAll('#works .swiper.works').forEach((el) => {
          if (el.swiper) return;
          new window.Swiper(el, {
            slidesPerView: 3,
            spaceBetween: 40,
            breakpoints: {
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            },
          });
        });
      }
      initWorksSwipers();
      let worksTries = 0;
      const worksInterval = setInterval(() => {
        if (window.Swiper) {
          clearInterval(worksInterval);
          initWorksSwipers();
        } else if (++worksTries > 40) clearInterval(worksInterval);
      }, 50);
    }

    // Видеослайдер .vslider-swiper (docs/main/video.html)
    let videoTries = 0;
    function initVideoSwiper() {
      const el = document.querySelector('.vslider-swiper');
      if (!el || el.swiper || videoTries > 40) return;
      if (typeof window !== 'undefined' && window.Swiper) {
        const swiper = new window.Swiper('.vslider-swiper', {
          slidesPerView: 1,
          spaceBetween: 0,
          navigation: {
            nextEl: '.vslider-swiper .swiper-button-next',
            prevEl: '.vslider-swiper .swiper-button-prev',
          },
          pagination: {
            el: '.vslider-swiper .swiper-pagination',
            clickable: true,
          },
          on: {
            slideChange(sw) {
              const cur = document.querySelector('.vslider-counter__current');
              if (cur) cur.textContent = sw.realIndex + 1;
            },
          },
        });
        const cur = document.querySelector('.vslider-counter__current');
        if (cur) cur.textContent = swiper.realIndex + 1;
      } else {
        videoTries += 1;
        setTimeout(initVideoSwiper, 50);
      }
    }
    initVideoSwiper();

    // SEO-блок «Мягкие окна Стиль» — кнопка «Читать далее» скрывает/открывает блок .seo_block-subtitle-expandable (делегирование)
    function handleSeoBtnClick(e) {
      const seoBtn = e.target.closest('.js-seo-btn');
      if (!seoBtn) return;
      const wrapper = seoBtn.closest('.seo_block__wrapper');
      const expandable = wrapper ? wrapper.querySelector('.seo_block-subtitle-expandable') : null;
      if (!expandable) return;
      e.preventDefault();
      const elemHeight = expandable.scrollHeight;
      const isClosed = !expandable.style.maxHeight || expandable.style.maxHeight === '' || expandable.style.maxHeight === '0px';
      if (isClosed) {
        expandable.style.maxHeight = elemHeight + 'px';
        seoBtn.classList.add('disable');
        seoBtn.textContent = 'свернуть';
      } else {
        expandable.style.maxHeight = '0';
        seoBtn.classList.remove('disable');
        seoBtn.textContent = 'читать далее';
      }
    }
    document.body.addEventListener('click', handleSeoBtnClick);

    // Калькулятор #calc1 — ползунки, тип крепежа, расчёт стоимости
    const calcForm = document.getElementById('calc1');
    if (calcForm) {
      const rangeMeters = calcForm.querySelector('.range:not(.range_delivery)');
      const bubbleMeters = calcForm.querySelector('.bubble:not(.bubble_delivery)');
      const inputSquares = calcForm.querySelector('.calculate__form-inp.squares');
      const rangeDelivery = calcForm.querySelector('.range_delivery');
      const bubbleDelivery = calcForm.querySelector('.bubble_delivery');
      const inputDelivery = calcForm.querySelector('.calculate__form-inp.delivery');
      const priceSpan = calcForm.querySelector('.form-block-title.price span');
      const priceHidden = calcForm.querySelector('input.calc_price');
      const montageCheck = calcForm.querySelector('input[name="montage"]');
      const inputMolnia = calcForm.querySelector('.lightning');
      const inputBelt = calcForm.querySelector('.belt');

      function setBubble(range, bubble, suffix) {
        if (!range || !bubble) return;
        const val = range.value;
        bubble.textContent = val + suffix;
        bubble.style.left = 'calc(' + val + '% + ' + (val > 50 ? -8 : 8) + 'px)';
      }
      if (rangeMeters && bubbleMeters) {
        rangeMeters.addEventListener('input', () => {
          const v = rangeMeters.value;
          bubbleMeters.textContent = v + ' м²';
          bubbleMeters.style.left = 'calc(' + v + '% + ' + (v > 50 ? -8 : 7.85) + 'px)';
          if (inputSquares) inputSquares.value = v + ' м²';
          updateCalcPrice();
        });
      }
      if (rangeDelivery && bubbleDelivery) {
        rangeDelivery.addEventListener('input', () => {
          const v = rangeDelivery.value;
          bubbleDelivery.textContent = v + ' км';
          bubbleDelivery.style.left = 'calc(' + v + '% + ' + (v > 50 ? -8 : 8) + 'px)';
          if (inputDelivery) inputDelivery.value = v + ' км';
          updateCalcPrice();
        });
      }

      const krepezhName = calcForm.querySelector('input[name="krepezh_name"]');
      const krepezhPrice = calcForm.querySelector('input[name="krepezh_price"]');
      const fasteners = calcForm.querySelectorAll('.form-block-type.fasteners .block-type');
      fasteners.forEach((el) => {
        el.addEventListener('click', () => {
          fasteners.forEach((b) => b.classList.remove('active'));
          el.classList.add('active');
          if (krepezhName) krepezhName.value = el.getAttribute('data-label') || '';
          if (krepezhPrice) krepezhPrice.value = el.getAttribute('data-value') || '';
          updateCalcPrice();
        });
      });

      function updateCalcPrice() {
        if (!priceSpan || !priceHidden) return;
        const meters = parseInt(rangeMeters?.value || 1, 10) || 1;
        const delivery = parseInt(rangeDelivery?.value || 0, 10) || 0;
        const activeBlock = calcForm.querySelector('.form-block-type.fasteners .block-type.active');
        const pricePerM2 = activeBlock ? parseInt(activeBlock.getAttribute('data-value'), 10) || 1300 : 1300;
        const molnia = parseInt(inputMolnia?.value || 0, 10) || 0;
        const remni = parseInt(inputBelt?.value || 0, 10) || 0;
        let total = meters * pricePerM2;
        if (montageCheck?.checked) {
          total += 7000;
          if (delivery > 0) total += Math.min(1000, delivery * 10);
        }
        total += molnia * 200 + remni * 150;
        priceSpan.textContent = total.toLocaleString('ru-RU') + ' руб.';
        if (priceHidden) priceHidden.value = String(total);
      }
      if (montageCheck) montageCheck.addEventListener('change', updateCalcPrice);
      if (inputMolnia) inputMolnia.addEventListener('input', updateCalcPrice);
      if (inputBelt) inputBelt.addEventListener('input', updateCalcPrice);
    }

    // Футер: раскрытие списков по клику на стрелку
    document.querySelectorAll('.footer-nav-item-list').forEach((item) => {
      const arrow = item.querySelector('.footer-arrow');
      const dropList = item.querySelector('.footer-nav-item-drop-list');
      const title = item.querySelector('.footer-nav-item-list-title a');
      if (!arrow || !dropList) return;

      arrow.addEventListener('click', () => {
        const dropHeight = dropList.scrollHeight;
        if (dropList.style.height && dropList.style.height !== '0px') {
          dropList.style.height = '';
          if (title) title.style.color = 'rgba(38, 50, 56, 0.8)';
          arrow.style.transform = '';
        } else {
          document.querySelectorAll('.footer-nav-item-drop-list').forEach((d) => (d.style.height = ''));
          document.querySelectorAll('.footer-nav-item-list-title a').forEach((a) => (a.style.color = 'rgba(38, 50, 56, 0.8)'));
          document.querySelectorAll('.footer-arrow').forEach((a) => (a.style.transform = ''));
          dropList.style.height = dropHeight + 'px';
          if (title) title.style.color = '#FF5C00';
          arrow.style.transform = 'rotate(180deg)';
        }
      });
    });

    return () => {
      document.body.removeEventListener('click', handleSeoBtnClick);
    };
  }, []);

  return null;
}
