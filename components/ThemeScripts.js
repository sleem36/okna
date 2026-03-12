"use client";

import { useEffect } from "react";

export default function ThemeScripts() {
  useEffect(() => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.classList.add("hidden");
    }

    const burger = document.querySelector(".header__burger");
    const mobile = document.querySelector(".mobile");
    if (burger && mobile) {
      burger.addEventListener("click", () => {
        burger.classList.toggle("active");
        mobile.classList.toggle("active");
      });
    }

    // Мобильное меню: раскрытие подпунктов по клику на стрелку
    document.querySelectorAll(".mobile-nav-item").forEach((navItem) => {
      const title = navItem.querySelector(".mobile-nav-item-title");
      const arrow = navItem.querySelector(".mobile-arrow");
      const drop = navItem.querySelector(".mobile-nav-item-drop");
      if (!arrow || !drop) return;
      const dropHeight = drop.scrollHeight;

      arrow.addEventListener("click", (e) => {
        e.preventDefault();
        if (drop.style.height && drop.style.height !== "0px") {
          document
            .querySelectorAll(".mobile-nav-item-drop")
            .forEach((d) => (d.style.height = ""));
          document
            .querySelectorAll(".mobile-nav-item .mobile-arrow")
            .forEach((a) => (a.style.transform = ""));
          drop.style.height = "";
          arrow.style.transform = "";
        } else {
          document
            .querySelectorAll(".mobile-nav-item-drop")
            .forEach((d) => (d.style.height = ""));
          document
            .querySelectorAll(".mobile-nav-item .mobile-arrow")
            .forEach((a) => (a.style.transform = ""));
          drop.style.height = dropHeight + "px";
          arrow.style.transform = "rotate(180deg)";
        }
      });
    });

    document.querySelectorAll(".mobile-first-drop").forEach((firstDrop) => {
      const dropArrow = firstDrop.querySelector(".mobile-arrow");
      const secondDrop = firstDrop.querySelector(".mobile-second-drop");
      const titleLink = firstDrop.querySelector(
        ".mobile-nav-item-list-title a",
      );
      if (!dropArrow || !secondDrop) return;
      const secondHeight = secondDrop.scrollHeight;

      dropArrow.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (secondDrop.style.height && secondDrop.style.height !== "0px") {
          secondDrop.style.height = "";
          dropArrow.style.transform = "";
          if (titleLink) titleLink.style.color = "";
        } else {
          document
            .querySelectorAll(".mobile-second-drop")
            .forEach((d) => (d.style.height = ""));
          document
            .querySelectorAll(".mobile-first-drop .mobile-arrow")
            .forEach((a) => (a.style.transform = ""));
          document
            .querySelectorAll(".mobile-nav-item-list-title a")
            .forEach((a) => (a.style.color = ""));
          secondDrop.style.height = secondHeight + "px";
          dropArrow.style.transform = "rotate(180deg)";
          if (titleLink) titleLink.style.color = "#FF5C00";
        }
      });
    });

    // Слайдер «Причина выбрать мягкие окна» (Swiper)
    let reasonTries = 0;
    function initReasonSwiper() {
      const reasonEl = document.querySelector(".swiper.reason");
      if (!reasonEl || reasonEl.swiper || reasonTries > 40) return;
      if (typeof window !== "undefined" && window.Swiper) {
        new window.Swiper(".swiper.reason", {
          slidesPerView: "auto",
          spaceBetween: 40,
          navigation: {
            nextEl: ".reason-next",
            prevEl: ".reason-prev",
          },
          pagination: {
            el: ".reason-pagination",
            clickable: true,
          },
        });
      } else {
        reasonTries += 1;
        setTimeout(initReasonSwiper, 50);
      }
    }
    initReasonSwiper();

    // Слайдер «Отзывы» — как в теме soft-windows assets/js/main.js: на десктопе 2 слайда, overlap, centered (главная и /reviews)
    let reviewTries = 0;
    function initReviewSwiper() {
      const reviewEl = document.querySelector(".swiper.review");
      if (!reviewEl || reviewEl.swiper || reviewTries > 60) return;
      if (typeof window !== "undefined" && window.Swiper) {
        new window.Swiper(".swiper.review", {
          loop: true,
          pagination: {
            el: ".review-pagination",
            clickable: false,
          },
          navigation: {
            nextEl: ".reviews-next",
            prevEl: ".reviews-prev",
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
    const reviewInterval = setInterval(() => {
      reviewTries += 1;
      initReviewSwiper();
      const el = document.querySelector(".swiper.review");
      if (el?.swiper || reviewTries > 60) clearInterval(reviewInterval);
    }, 100);

    // Страница «Наши работы» (/our_works): вкладки и фильтр управляются React (OurWorksPageContent),
    // здесь ничего не делаем, чтобы не снимать .active с единственного блока контента.

    // Страница «Цены»: вкладки «Стоимость мягких окон» (как в оригинале — ширина в px, сдвиг translateX в px)
    const costFurnitureSection = document.querySelector("#cost_furniture");
    if (costFurnitureSection) {
      const costTitlesOdin =
        costFurnitureSection.querySelectorAll(".cost-title.odin");
      const cosrSlider = costFurnitureSection.querySelector(".cosr_slider");
      const costWrapper = costFurnitureSection.querySelector(".cost_wrapper");
      const costContents = costWrapper
        ? costWrapper.querySelectorAll(".cost__content")
        : [];
      const numSlides = costContents.length;

      function applyCostSliderWidth() {
        if (!cosrSlider || !costWrapper || !numSlides) return;
        const sliderWidth = cosrSlider.offsetWidth;
        costWrapper.style.width = `${sliderWidth * numSlides}px`;
        costWrapper.style.transition = "transform 0.8s";
        costContents.forEach((el) => {
          el.style.flex = "0 0 auto";
          el.style.width = `${sliderWidth}px`;
          el.style.maxWidth = `${sliderWidth}px`;
          el.style.minWidth = `${sliderWidth}px`;
          el.style.boxSizing = "border-box";
        });
        const activeTitle = costFurnitureSection.querySelector(
          ".cost-title.odin.active",
        );
        const idx = activeTitle
          ? Number(activeTitle.getAttribute("data-index"))
          : 0;
        costWrapper.style.transform = `translateX(-${idx * sliderWidth}px)`;
      }

      if (costTitlesOdin.length && costWrapper && numSlides) {
        applyCostSliderWidth();
        if (typeof window !== "undefined") {
          window.addEventListener("resize", applyCostSliderWidth);
        }
        costTitlesOdin.forEach((titleEl) => {
          titleEl.addEventListener("click", () => {
            const index = Number(titleEl.getAttribute("data-index"));
            costTitlesOdin.forEach((t) => t.classList.remove("active"));
            titleEl.classList.add("active");
            const sliderWidth = cosrSlider.offsetWidth;
            costWrapper.style.transform = `translateX(-${index * sliderWidth}px)`;
          });
        });
      }
    }

    // Блок «Наши работы»: переключение вкладок и инициализация слайдеров (на других страницах)
    const worksTitles = document.querySelectorAll(
      "#works .works__content-title",
    );
    const worksSwipe = document.querySelector("#works .works-swipe");
    if (worksTitles.length && worksSwipe) {
      worksTitles.forEach((titleEl) => {
        titleEl.addEventListener("click", () => {
          const index = Number(titleEl.getAttribute("data-index"));
          worksTitles.forEach((t) => t.classList.remove("active"));
          titleEl.classList.add("active");
          document
            .querySelectorAll("#works .swiper.works")
            .forEach((s) => s.classList.remove("active"));
          const activeSwiper = document.querySelector(
            `#works .swiper.works[data-index="${index}"]`,
          );
          if (activeSwiper) activeSwiper.classList.add("active");
          worksSwipe.style.transform = `translateX(-${index * 100}%)`;
        });
      });
      // Инициализация Swiper для каждого блока работ (на десктопе 3 слайда, как в оригинале)
      function initWorksSwipers() {
        if (typeof window === "undefined" || !window.Swiper) return;
        document.querySelectorAll("#works .swiper.works").forEach((el) => {
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

    // Слайдер акций на странице /stocks (#stocks .swiper.works) — как в оригинале: один swiper.works с навигацией
    // Опрос DOM, чтобы сработало и при прямой загрузке /stocks, и при клиентской навигации
    let stocksTries = 0;
    const STOCKS_POLL_MAX = 60; // ~3 сек при интервале 50ms
    function initStocksSwiper() {
      if (
        typeof window === "undefined" ||
        !window.Swiper ||
        stocksTries > STOCKS_POLL_MAX
      )
        return;
      const el = document.querySelector("#stocks .swiper.works");
      if (!el || el.swiper) return;
      // Как в теме soft-windows assets/js/main.js — workSwiperInit(): только .works.active, без loop
      new window.Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 40,
        pagination: {
          el: "#stocks .works-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: "#stocks .works-next",
          prevEl: "#stocks .works-prev",
        },
        breakpoints: {
          1300: {
            slidesPerView: 3,
            slidesPerGroup: 1,
          },
        },
      });
    }
    const stocksInterval = setInterval(() => {
      stocksTries += 1;
      initStocksSwiper();
      const el = document.querySelector("#stocks .swiper.works");
      if (el?.swiper || stocksTries > STOCKS_POLL_MAX)
        clearInterval(stocksInterval);
    }, 50);

    // Видеослайдер .vslider-swiper (docs/main/video.html)
    let videoTries = 0;
    function initVideoSwiper() {
      const el = document.querySelector(".vslider-swiper");
      if (!el || el.swiper || videoTries > 40) return;
      if (typeof window !== "undefined" && window.Swiper) {
        const swiper = new window.Swiper(".vslider-swiper", {
          slidesPerView: 1,
          spaceBetween: 0,
          navigation: {
            nextEl: ".vslider-swiper .swiper-button-next",
            prevEl: ".vslider-swiper .swiper-button-prev",
          },
          pagination: {
            el: ".vslider-swiper .swiper-pagination",
            clickable: true,
          },
          on: {
            slideChange(sw) {
              const cur = document.querySelector(".vslider-counter__current");
              if (cur) cur.textContent = sw.realIndex + 1;
            },
          },
        });
        const cur = document.querySelector(".vslider-counter__current");
        if (cur) cur.textContent = swiper.realIndex + 1;
      } else {
        videoTries += 1;
        setTimeout(initVideoSwiper, 50);
      }
    }
    initVideoSwiper();

    // Страница «Галерея» (/gallery): вкладки Фотоотчеты/Видеоотчеты и слайдеры .photo, .video-swiper (как в main.js)
    let galleryTries = 0;
    const GALLERY_POLL_MAX = 50;
    function initGalleryPage() {
      const gallerySection = document.querySelector("#gallery");
      if (!gallerySection || galleryTries > GALLERY_POLL_MAX) return;
      const photoOtch = gallerySection.querySelector(".photo_otch");
      const videoOtch = gallerySection.querySelector(".video_otch");
      if (photoOtch && !photoOtch.dataset.galleryBound) {
        photoOtch.dataset.galleryBound = "1";
        photoOtch.addEventListener("click", () => {
          gallerySection
            .querySelectorAll(".gallery-nav-item")
            .forEach((el) => el.classList.remove("active"));
          gallerySection
            .querySelectorAll(".gallery_swiper")
            .forEach((el) => el.classList.remove("active"));
          photoOtch.classList.add("active");
          gallerySection
            .querySelector(".gallery-photo")
            .classList.add("active");
        });
      }
      if (videoOtch && !videoOtch.dataset.galleryBound) {
        videoOtch.dataset.galleryBound = "1";
        videoOtch.addEventListener("click", () => {
          gallerySection
            .querySelectorAll(".gallery-nav-item")
            .forEach((el) => el.classList.remove("active"));
          gallerySection
            .querySelectorAll(".gallery_swiper")
            .forEach((el) => el.classList.remove("active"));
          videoOtch.classList.add("active");
          gallerySection
            .querySelector(".gallery-video")
            .classList.add("active");
        });
      }
      if (typeof window !== "undefined" && window.Swiper) {
        const photoEl = gallerySection.querySelector(".swiper.photo");
        if (photoEl && !photoEl.swiper) {
          new window.Swiper(photoEl, {
            slidesPerView: 1,
            spaceBetween: 40,
            pagination: { el: "#gallery .photo-pagination", clickable: true },
            navigation: {
              nextEl: "#gallery .photo-next",
              prevEl: "#gallery .photo-prev",
            },
            breakpoints: { 1300: { slidesPerView: 3, slidesPerGroup: 3 } },
          });
        }
        const videoEl = gallerySection.querySelector(".swiper.video-swiper");
        if (videoEl && !videoEl.swiper) {
          new window.Swiper(videoEl, {
            slidesPerView: 1,
            spaceBetween: 40,
            pagination: { el: "#gallery .video-pagination", clickable: true },
            navigation: {
              nextEl: "#gallery .video-next",
              prevEl: "#gallery .video-prev",
            },
            breakpoints: { 1300: { slidesPerView: 3, slidesPerGroup: 3 } },
          });
        }
      }
      // Кнопка play и play/pause видео в галерее (как в main.js)
      if (!gallerySection.dataset.videoPlayBound) {
        gallerySection.dataset.videoPlayBound = "1";
        gallerySection.querySelectorAll(".swiper-slide").forEach((slide) => {
          const videoEl = slide.querySelector(".video-item");
          const btnPlay = slide.querySelector(".gallery_video_play");
          if (!videoEl || !btnPlay) return;
          videoEl.addEventListener("pause", () => {
            btnPlay.classList.remove("hidden");
            videoEl.removeAttribute("controls");
          });
          videoEl.addEventListener("play", () => {
            btnPlay.classList.add("hidden");
            videoEl.setAttribute("controls", "");
          });
          btnPlay.addEventListener("click", (e) => {
            e.preventDefault();
            if (videoEl.paused) {
              videoEl.play();
            } else {
              videoEl.pause();
            }
          });
        });
      }
    }
    const galleryInterval = setInterval(() => {
      galleryTries += 1;
      initGalleryPage();
      const section = document.querySelector("#gallery");
      const photoDone = section?.querySelector(".swiper.photo")?.swiper;
      const videoDone = section?.querySelector(".swiper.video-swiper")?.swiper;
      if (
        (section && photoDone && videoDone) ||
        galleryTries > GALLERY_POLL_MAX
      )
        clearInterval(galleryInterval);
    }, 100);

    // Слайдер «Другие статьи» на странице поста (.article-slider)
    function initArticleSlider() {
      const articleSlider = document.querySelector(".article-slider");
      if (!articleSlider || articleSlider.dataset.articleSliderBound === "1")
        return;
      const activeContent = articleSlider.querySelector(
        ".article-slide-content.active",
      );
      if (activeContent) {
        articleSlider.style.height = activeContent.clientHeight + "px";
      }
      articleSlider.dataset.articleSliderBound = "1";
      articleSlider.querySelectorAll(".article-slide").forEach((slide) => {
        const description = slide.querySelector(".article-slide-content");
        const btn = slide.querySelector(".article-slide-btn");
        if (!description || !btn) return;
        btn.addEventListener("click", () => {
          articleSlider.querySelectorAll(".article-slide").forEach((s) => {
            s.querySelector(".article-slide-content")?.classList.remove(
              "active",
            );
            s.querySelector(".article-slide-btn")?.classList.remove("active");
          });
          articleSlider.style.height = description.clientHeight + "px";
          description.classList.add("active");
          btn.classList.add("active");
        });
      });
      window.addEventListener("scroll", () => {
        const active = articleSlider.querySelector(
          ".article-slide-content.active",
        );
        if (active) articleSlider.style.height = active.clientHeight + "px";
      });
      window.addEventListener("resize", () => {
        const active = articleSlider.querySelector(
          ".article-slide-content.active",
        );
        if (active) articleSlider.style.height = active.clientHeight + "px";
      });
    }
    let articleTries = 0;
    const articleInterval = setInterval(() => {
      articleTries += 1;
      initArticleSlider();
      if (
        document.querySelector(".article-slider")?.dataset
          ?.articleSliderBound === "1" ||
        articleTries > 30
      )
        clearInterval(articleInterval);
    }, 100);

    // SEO-блок: кнопка «Читать далее» раскрывает/сворачивает текст (главная — .seo_block-subtitle-expandable, страницы Окантовка/Фурнитура — .seo_block-subtitle)
    function handleSeoBtnClick(e) {
      const seoBtn = e.target.closest(".js-seo-btn");
      if (!seoBtn) return;
      const wrapper = seoBtn.closest(".seo_block__wrapper");
      if (!wrapper) return;
      let block = wrapper.querySelector(".seo_block-subtitle-expandable");
      if (!block) block = wrapper.querySelector(".seo_block-subtitle");
      if (!block) return;
      e.preventDefault();
      const fullHeight = block.scrollHeight;
      const currentMax = block.style.maxHeight || "";
      const isExpandable = block.classList.contains(
        "seo_block-subtitle-expandable",
      );
      const isClosed =
        !currentMax ||
        currentMax === "0px" ||
        currentMax === "13em" ||
        (isExpandable && currentMax === "0");
      if (isClosed) {
        block.style.maxHeight = fullHeight + "px";
        seoBtn.classList.add("disable");
        seoBtn.textContent = "свернуть";
      } else {
        block.style.maxHeight = isExpandable ? "0" : "13em";
        seoBtn.classList.remove("disable");
        seoBtn.textContent = "читать далее";
      }
    }
    document.body.addEventListener("click", handleSeoBtnClick);

    // Калькулятор #calc1 — ползунки, тип крепежа, расчёт стоимости
    const calcForm = document.getElementById("calc1");
    if (calcForm) {
      const rangeMeters = calcForm.querySelector(".range:not(.range_delivery)");
      const bubbleMeters = calcForm.querySelector(
        ".bubble:not(.bubble_delivery)",
      );
      const inputSquares = calcForm.querySelector(
        ".calculate__form-inp.squares",
      );
      const rangeDelivery = calcForm.querySelector(".range_delivery");
      const bubbleDelivery = calcForm.querySelector(".bubble_delivery");
      const inputDelivery = calcForm.querySelector(
        ".calculate__form-inp.delivery",
      );
      const priceSpan = calcForm.querySelector(".form-block-title.price span");
      const priceHidden = calcForm.querySelector("input.calc_price");
      const montageCheck = calcForm.querySelector('input[name="montage"]');
      const inputMolnia = calcForm.querySelector(".lightning");
      const inputBelt = calcForm.querySelector(".belt");

      function setBubble(range, bubble, suffix) {
        if (!range || !bubble) return;
        const val = range.value;
        bubble.textContent = val + suffix;
        bubble.style.left =
          "calc(" + val + "% + " + (val > 50 ? -8 : 8) + "px)";
      }
      if (rangeMeters && bubbleMeters) {
        rangeMeters.addEventListener("input", () => {
          const v = rangeMeters.value;
          bubbleMeters.textContent = v + " м²";
          bubbleMeters.style.left =
            "calc(" + v + "% + " + (v > 50 ? -8 : 7.85) + "px)";
          if (inputSquares) inputSquares.value = v + " м²";
          updateCalcPrice();
        });
      }
      if (rangeDelivery && bubbleDelivery) {
        rangeDelivery.addEventListener("input", () => {
          const v = rangeDelivery.value;
          bubbleDelivery.textContent = v + " км";
          bubbleDelivery.style.left =
            "calc(" + v + "% + " + (v > 50 ? -8 : 8) + "px)";
          if (inputDelivery) inputDelivery.value = v + " км";
          updateCalcPrice();
        });
      }

      const krepezhName = calcForm.querySelector('input[name="krepezh_name"]');
      const krepezhPrice = calcForm.querySelector(
        'input[name="krepezh_price"]',
      );
      const fasteners = calcForm.querySelectorAll(
        ".form-block-type.fasteners .block-type",
      );
      fasteners.forEach((el) => {
        el.addEventListener("click", () => {
          fasteners.forEach((b) => b.classList.remove("active"));
          el.classList.add("active");
          if (krepezhName)
            krepezhName.value = el.getAttribute("data-label") || "";
          if (krepezhPrice)
            krepezhPrice.value = el.getAttribute("data-value") || "";
          updateCalcPrice();
        });
      });

      function updateCalcPrice() {
        if (!priceSpan || !priceHidden) return;
        const meters = parseInt(rangeMeters?.value || 1, 10) || 1;
        const delivery = parseInt(rangeDelivery?.value || 0, 10) || 0;
        const activeBlock = calcForm.querySelector(
          ".form-block-type.fasteners .block-type.active",
        );
        const pricePerM2 = activeBlock
          ? parseInt(activeBlock.getAttribute("data-value"), 10) || 1300
          : 1300;
        const molnia = parseInt(inputMolnia?.value || 0, 10) || 0;
        const remni = parseInt(inputBelt?.value || 0, 10) || 0;
        let total = meters * pricePerM2;
        if (montageCheck?.checked) {
          total += 7000;
          if (delivery > 0) total += Math.min(1000, delivery * 10);
        }
        total += molnia * 200 + remni * 150;
        priceSpan.textContent = total.toLocaleString("ru-RU") + " руб.";
        if (priceHidden) priceHidden.value = String(total);
      }
      if (montageCheck)
        montageCheck.addEventListener("change", updateCalcPrice);
      if (inputMolnia) inputMolnia.addEventListener("input", updateCalcPrice);
      if (inputBelt) inputBelt.addEventListener("input", updateCalcPrice);
    }

    // Футер: раскрытие списков по клику на стрелку
    document.querySelectorAll(".footer-nav-item-list").forEach((item) => {
      const arrow = item.querySelector(".footer-arrow");
      const dropList = item.querySelector(".footer-nav-item-drop-list");
      const title = item.querySelector(".footer-nav-item-list-title a");
      if (!arrow || !dropList) return;

      arrow.addEventListener("click", () => {
        const dropHeight = dropList.scrollHeight;
        if (dropList.style.height && dropList.style.height !== "0px") {
          dropList.style.height = "";
          if (title) title.style.color = "rgba(38, 50, 56, 0.8)";
          arrow.style.transform = "";
        } else {
          document
            .querySelectorAll(".footer-nav-item-drop-list")
            .forEach((d) => (d.style.height = ""));
          document
            .querySelectorAll(".footer-nav-item-list-title a")
            .forEach((a) => (a.style.color = "rgba(38, 50, 56, 0.8)"));
          document
            .querySelectorAll(".footer-arrow")
            .forEach((a) => (a.style.transform = ""));
          dropList.style.height = dropHeight + "px";
          if (title) title.style.color = "#FF5C00";
          arrow.style.transform = "rotate(180deg)";
        }
      });
    });

    // Формы заявок (main_form / contacts_form): отправка на /api/contact
    let formsTries = 0;
    const FORMS_POLL_MAX = 80;
    function bindOrderForms() {
      document.querySelectorAll("form.main_form, form#main1").forEach((form) => {
        if (form.dataset.boundSubmit === "1") return;
        form.dataset.boundSubmit = "1";
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const formData = new FormData(form);
          const name = (formData.get("name") || "").toString();
          const phone = (formData.get("phone") || "").toString();
          const message = (formData.get("message") || "").toString();
          const page = window.location?.pathname || "";
          try {
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, phone, message, page, formId: form.id || "" }),
            });
            if (res.ok) {
              form.reset();
              alert("Заявка отправлена. Мы свяжемся с вами в ближайшее время.");
            } else {
              alert("Не удалось отправить заявку. Попробуйте ещё раз позже.");
            }
          } catch (err) {
            console.error("contact form error", err);
            alert("Ошибка при отправке заявки. Попробуйте ещё раз позже.");
          }
        });
      });
    }
    bindOrderForms();
    const formsInterval = setInterval(() => {
      formsTries += 1;
      bindOrderForms();
      if (formsTries > FORMS_POLL_MAX) clearInterval(formsInterval);
    }, 200);

    return () => {
      document.body.removeEventListener("click", handleSeoBtnClick);
      clearInterval(stocksInterval);
      clearInterval(reviewInterval);
      clearInterval(galleryInterval);
      clearInterval(articleInterval);
      clearInterval(formsInterval);
    };
  }, []);

  return null;
}
