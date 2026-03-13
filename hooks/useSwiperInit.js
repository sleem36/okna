"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function useSwiperInit() {
  const pathname = usePathname();
  useEffect(() => {
    const intervals = [];
    const timeouts = [];

    // Reason slider
    let reasonTries = 0;
    function initReasonSwiper() {
      const el = document.querySelector(".swiper.reason");
      if (!el || el.swiper || reasonTries > 40) return;
      if (window.Swiper) {
        new window.Swiper(".swiper.reason", {
          slidesPerView: "auto",
          spaceBetween: 40,
          navigation: { nextEl: ".reason-next", prevEl: ".reason-prev" },
          pagination: { el: ".reason-pagination", clickable: true },
        });
      } else {
        reasonTries += 1;
        timeouts.push(setTimeout(initReasonSwiper, 50));
      }
    }
    initReasonSwiper();

    // Review slider
    let reviewTries = 0;
    function initReviewSwiper() {
      const el = document.querySelector(".swiper.review");
      if (!el || el.swiper || reviewTries > 60) return;
      if (window.Swiper) {
        new window.Swiper(".swiper.review", {
          loop: true,
          pagination: { el: ".review-pagination", clickable: false },
          navigation: { nextEl: ".reviews-next", prevEl: ".reviews-prev" },
          breakpoints: {
            1300: { spaceBetween: -460, slidesPerView: 2, slidesPerGroup: 1, centeredSlides: true },
          },
        });
      } else {
        reviewTries += 1;
        timeouts.push(setTimeout(initReviewSwiper, 50));
      }
    }
    initReviewSwiper();
    const reviewInterval = setInterval(() => {
      reviewTries += 1;
      initReviewSwiper();
      const el = document.querySelector(".swiper.review");
      if (el?.swiper || reviewTries > 60) clearInterval(reviewInterval);
    }, 100);
    intervals.push(reviewInterval);

    // Works tabs + swipers (inner pages)
    const worksTitles = document.querySelectorAll("#works .works__content-title");
    const worksSwipe = document.querySelector("#works .works-swipe");
    if (worksTitles.length && worksSwipe) {
      worksTitles.forEach((titleEl) => {
        titleEl.addEventListener("click", () => {
          const index = Number(titleEl.getAttribute("data-index"));
          worksTitles.forEach((t) => t.classList.remove("active"));
          titleEl.classList.add("active");
          document.querySelectorAll("#works .swiper.works").forEach((s) => s.classList.remove("active"));
          const activeSwiper = document.querySelector(`#works .swiper.works[data-index="${index}"]`);
          if (activeSwiper) activeSwiper.classList.add("active");
          worksSwipe.style.transform = `translateX(-${index * 100}%)`;
        });
      });
      function initWorksSwipers() {
        if (!window.Swiper) return;
        document.querySelectorAll("#works .swiper.works").forEach((el) => {
          if (el.swiper) return;
          new window.Swiper(el, {
            slidesPerView: 3,
            spaceBetween: 40,
            breakpoints: { 320: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
          });
        });
      }
      initWorksSwipers();
      let worksTries = 0;
      const worksInterval = setInterval(() => {
        if (window.Swiper) { clearInterval(worksInterval); initWorksSwipers(); }
        else if (++worksTries > 40) clearInterval(worksInterval);
      }, 50);
      intervals.push(worksInterval);
    }

    // Stocks slider
    let stocksTries = 0;
    function initStocksSwiper() {
      if (!window.Swiper || stocksTries > 60) return;
      const el = document.querySelector("#stocks .swiper.works");
      if (!el || el.swiper) return;
      new window.Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 40,
        pagination: { el: "#stocks .works-pagination", clickable: true },
        navigation: { nextEl: "#stocks .works-next", prevEl: "#stocks .works-prev" },
        breakpoints: { 1300: { slidesPerView: 3, slidesPerGroup: 1 } },
      });
    }
    const stocksInterval = setInterval(() => {
      stocksTries += 1;
      initStocksSwiper();
      const el = document.querySelector("#stocks .swiper.works");
      if (el?.swiper || stocksTries > 60) clearInterval(stocksInterval);
    }, 50);
    intervals.push(stocksInterval);

    // Video slider (main page)
    let videoTries = 0;
    function initVideoSwiper() {
      const el = document.querySelector(".vslider-swiper");
      if (!el || el.swiper || videoTries > 40) return;
      if (window.Swiper) {
        const swiper = new window.Swiper(".vslider-swiper", {
          slidesPerView: 1,
          spaceBetween: 0,
          navigation: { nextEl: ".vslider-swiper .swiper-button-next", prevEl: ".vslider-swiper .swiper-button-prev" },
          pagination: { el: ".vslider-swiper .swiper-pagination", clickable: true },
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
        timeouts.push(setTimeout(initVideoSwiper, 50));
      }
    }
    initVideoSwiper();

    // Gallery page
    let galleryTries = 0;
    function initGalleryPage() {
      const gallerySection = document.querySelector("#gallery");
      if (!gallerySection || galleryTries > 50) return;
      const photoOtch = gallerySection.querySelector(".photo_otch");
      const videoOtch = gallerySection.querySelector(".video_otch");
      if (photoOtch && !photoOtch.dataset.galleryBound) {
        photoOtch.dataset.galleryBound = "1";
        photoOtch.addEventListener("click", () => {
          gallerySection.querySelectorAll(".gallery-nav-item").forEach((el) => el.classList.remove("active"));
          gallerySection.querySelectorAll(".gallery_swiper").forEach((el) => el.classList.remove("active"));
          photoOtch.classList.add("active");
          gallerySection.querySelector(".gallery-photo").classList.add("active");
        });
      }
      if (videoOtch && !videoOtch.dataset.galleryBound) {
        videoOtch.dataset.galleryBound = "1";
        videoOtch.addEventListener("click", () => {
          gallerySection.querySelectorAll(".gallery-nav-item").forEach((el) => el.classList.remove("active"));
          gallerySection.querySelectorAll(".gallery_swiper").forEach((el) => el.classList.remove("active"));
          videoOtch.classList.add("active");
          gallerySection.querySelector(".gallery-video").classList.add("active");
        });
      }
      if (window.Swiper) {
        const photoEl = gallerySection.querySelector(".swiper.photo");
        if (photoEl && !photoEl.swiper) {
          new window.Swiper(photoEl, {
            slidesPerView: 1, spaceBetween: 40,
            pagination: { el: "#gallery .photo-pagination", clickable: true },
            navigation: { nextEl: "#gallery .photo-next", prevEl: "#gallery .photo-prev" },
            breakpoints: { 1300: { slidesPerView: 3, slidesPerGroup: 3 } },
          });
        }
        const videoEl = gallerySection.querySelector(".swiper.video-swiper");
        if (videoEl && !videoEl.swiper) {
          new window.Swiper(videoEl, {
            slidesPerView: 1, spaceBetween: 40,
            pagination: { el: "#gallery .video-pagination", clickable: true },
            navigation: { nextEl: "#gallery .video-next", prevEl: "#gallery .video-prev" },
            breakpoints: { 1300: { slidesPerView: 3, slidesPerGroup: 3 } },
          });
        }
      }
      if (!gallerySection.dataset.videoPlayBound) {
        gallerySection.dataset.videoPlayBound = "1";
        gallerySection.querySelectorAll(".swiper-slide").forEach((slide) => {
          const videoEl = slide.querySelector(".video-item");
          const btnPlay = slide.querySelector(".gallery_video_play");
          if (!videoEl || !btnPlay) return;
          videoEl.addEventListener("pause", () => { btnPlay.classList.remove("hidden"); videoEl.removeAttribute("controls"); });
          videoEl.addEventListener("play", () => { btnPlay.classList.add("hidden"); videoEl.setAttribute("controls", ""); });
          btnPlay.addEventListener("click", (e) => { e.preventDefault(); videoEl.paused ? videoEl.play() : videoEl.pause(); });
        });
      }
    }
    const galleryInterval = setInterval(() => {
      galleryTries += 1;
      initGalleryPage();
      const section = document.querySelector("#gallery");
      const photoDone = section?.querySelector(".swiper.photo")?.swiper;
      const videoDone = section?.querySelector(".swiper.video-swiper")?.swiper;
      if ((section && photoDone && videoDone) || galleryTries > 50) clearInterval(galleryInterval);
    }, 100);
    intervals.push(galleryInterval);

    // Article slider (blog post page)
    function initArticleSlider() {
      const articleSlider = document.querySelector(".article-slider");
      if (!articleSlider || articleSlider.dataset.articleSliderBound === "1") return;
      const activeContent = articleSlider.querySelector(".article-slide-content.active");
      if (activeContent) articleSlider.style.height = activeContent.clientHeight + "px";
      articleSlider.dataset.articleSliderBound = "1";
      articleSlider.querySelectorAll(".article-slide").forEach((slide) => {
        const description = slide.querySelector(".article-slide-content");
        const btn = slide.querySelector(".article-slide-btn");
        if (!description || !btn) return;
        btn.addEventListener("click", () => {
          articleSlider.querySelectorAll(".article-slide").forEach((s) => {
            s.querySelector(".article-slide-content")?.classList.remove("active");
            s.querySelector(".article-slide-btn")?.classList.remove("active");
          });
          articleSlider.style.height = description.clientHeight + "px";
          description.classList.add("active");
          btn.classList.add("active");
        });
      });
      function updateHeight() {
        const active = articleSlider.querySelector(".article-slide-content.active");
        if (active) articleSlider.style.height = active.clientHeight + "px";
      }
      window.addEventListener("scroll", updateHeight);
      window.addEventListener("resize", updateHeight);
    }
    let articleTries = 0;
    const articleInterval = setInterval(() => {
      articleTries += 1;
      initArticleSlider();
      if (document.querySelector(".article-slider")?.dataset?.articleSliderBound === "1" || articleTries > 30)
        clearInterval(articleInterval);
    }, 100);
    intervals.push(articleInterval);

    return () => {
      intervals.forEach(clearInterval);
      timeouts.forEach(clearTimeout);
      const as = document.querySelector(".article-slider");
      if (as) delete as.dataset.articleSliderBound;
    };
  }, [pathname]);
}
