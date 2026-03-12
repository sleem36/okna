import smoothScroll from "../libs/scroll/smooth-scroll.js";

document.addEventListener("DOMContentLoaded", () => {
  smoothScroll();
  topFilter();
  ourSwiperInit();
  workSwiperInit();

  //прелодер

  if (document.querySelector(".preloader")) {
    document.querySelector(".preloader").classList.add("hidden");
  }
  document.querySelector(".preloader").classList.add("hidden");
  // Плаыный скролл
  var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 500,
    offset: 103,
  });

  //Свайпер работы

  function workSwiperInit() {
    if (document.querySelector(".works.active")) {
      const swiper = new Swiper(".works", {
        slidesPerView: 1,
        spaceBetween: 40,
        pagination: {
          el: ".works-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".works-next",
          prevEl: ".works-prev",
        },
        breakpoints: {
          1300: {
            slidesPerView: 3,
            slidesPerGroup: 1,
          },
        },
      });
    }
  }
  //Свайпер причины
  if (document.querySelector(".reason")) {
    const swiperss = new Swiper(".reason", {
      slidesPerView: 2,
      spaceBetween: 40,
      pagination: {
        el: ".reason-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".reason-next",
        prevEl: ".reason-prev",
      },
      breakpoints: {
        1501: {
          slidesPerView: 5,
          slidesPerGroup: 1,
        },
        1001: {
          slidesPerView: 4,
          slidesPerGroup: 1,
        },
      },
    });
  }
  //Свайпер работы
  if (document.querySelector(".review")) {
    const swiper = new Swiper(".review", {
      loop: true,
      pagination: {
        clickable: false,
        el: ".review-pagination",
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
  }
  //Свайпер галерея фото
  if (document.querySelector(".photo")) {
    const swiper = new Swiper(".photo", {
      slidesPerView: 1,
      spaceBetween: 40,
      pagination: {
        el: ".photo-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".photo-next",
        prevEl: ".photo-prev",
      },
      breakpoints: {
        1300: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
      },
    });
  }
  //Свайпер галерея видео
  if (document.querySelector(".video-swiper")) {
    const swiper = new Swiper(".video-swiper", {
      slidesPerView: 1,
      spaceBetween: 40,
      pagination: {
        el: ".video-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".video-next",
        prevEl: ".video-prev",
      },
      breakpoints: {
        1300: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
      },
    });
  }
  //Свайпер наши работы (фильтр)

  function ourSwiperInit() {
    if (document.querySelector(".m-our_works-swiper")) {
      const swiper = new Swiper(".m-our_works-swiper", {
        spaceBetween: 0,
        navigation: {
          nextEl: ".our_works-next",
          prevEl: ".our_works-prev",
        },
        pagination: {
          el: ".our_works-pagination",
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 6,
          renderBullet: function (index, className) {
            return `<span class="dot swiper-pagination-bullet">${
              index + 1
            }</span>`;
          },
        },
        breakpoints: {
          1000: {
            slidesPerView: 0,
            slidesPerGroup: 0,
          },
          300: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
        },
      });
    }
  }

  // ------------------ Калькуляьор ---------------------------
  let calculater = document.querySelector("#calculate");

  if (calculater) {
    calcPrice();
    function setBubble(range, bubble, type) {
      const val = range.value;
      const min = range.min ? range.min : 0;
      const max = range.max ? range.max : 100;
      const newVal = Number(((val - min) * 100) / (max - min));
      bubble.innerHTML = val + type;

      // Sorta magic numbers based on size of the native UI thumb
      bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
    }
    //  calculator range
    const range = document.querySelector(".range");
    const bubble = document.querySelector(".bubble");
    const type = " м²";
    if (range) {
      range.addEventListener("input", () => {
        setBubble(range, bubble, type);
      });
      setBubble(range, bubble, type);
    }

    //  calculator delivery
    const range_delivery = document.querySelector(
      ".calculate__form-inp.range.range_delivery"
    );
    const bubble_delivery = document.querySelector(".bubble.bubble_delivery");
    const type_delivery = " км²";
    if (range_delivery) {
      range_delivery.addEventListener("input", () => {
        setBubble(range_delivery, bubble_delivery, type_delivery);
      });
      setBubble(range_delivery, bubble_delivery, type_delivery);
    }

    // передача данных с input[type=text] в input[type=range]
    const delivery = document.querySelector(".calculate__form-inp.delivery");
    if (delivery) {
      delivery.addEventListener("input", () => {
        range_delivery.value = delivery.value;
        calcPrice();
        setBubble(range_delivery, bubble_delivery, type_delivery);
      });
      range_delivery.addEventListener("change", () => {
        delivery.value = bubble_delivery.value.slice(0, -3);
        calcPrice();
      });
    }

    const squares = document.querySelector(".squares");
    if (squares) {
      squares.addEventListener("input", () => {
        range.value = squares.value;
        calcPrice();
        setBubble(range, bubble, type);
      });
      range.addEventListener("change", () => {
        squares.value = range.value;
        calcPrice();
      });
    }

    // клик на тип

    const edging_types = document.querySelectorAll(".block-type");

    if (edging_types) {
      edging_types.forEach((edging_type) => {
        edging_type.addEventListener("click", () => {
          edging_types.forEach((c) => {
            c.classList.remove("active");
          });
          edging_type.classList.add("active");
          calcPrice();
        });
      });
    }

    document
      .querySelector(".calculate__form-inp.lightning")
      .addEventListener("input", () => {
        calcPrice();
      });

    document
      .querySelector(".calculate__form-inp.belt")
      .addEventListener("input", () => {
        calcPrice();
      });

    document
      .querySelector(".control-checkbox")
      .addEventListener("click", () => {
        calcPrice();
      });

    // расчёт цены

    function calcPrice() {
      let calculate = document.querySelector("#calculate");
      let price = document.querySelector(".form-block-title.price span");
      if (calculate) {
        let squares = calculate.querySelector(
          ".calculate__form-inp.squares"
        ).value;
        let fasteners =
          calculate.querySelector(".block-type.active").dataset.value;
        let delivery_value = 0;
        let montage = 0;

        if (
          calculate.querySelector(".calculate__form-inp.delivery").value == ""
        ) {
          delivery_value = 0;
        } else {
          delivery_value = calculate.querySelector(
            ".calculate__form-inp.delivery"
          ).value;
        }

        let lightning = calculate.querySelector(
          ".calculate__form-inp.lightning"
        ).value;

        let belt = calculate.querySelector(".calculate__form-inp.belt").value;

        if (calculate.querySelector(".control-checkbox input").checked) {
          if (squares < 15) {
            montage = 7000;
          }
          if (squares >= 15 && squares < 50) {
            montage = squares * 550;
          }
          if (squares >= 50) {
            montage = squares * 500;
          }
        }

        let total_price = document.querySelector("input.calc_price");
        if (squares == "" && delivery_value == "") {
          let total_cost =
            fasteners * 1 +
            lightning * 1000 +
            delivery_value * 30 +
            belt * 200 +
            montage;

          total_price.value = total_cost;

          price.innerHTML =
            total_cost
              .toString()
              .replace(
                /(?:(^\d{1,3})(?=(?:\d{3})*$)|(\d{3}))(?!$)/gm,
                "$1$2 "
              ) + " руб.";
        } else {
          let total_cost =
            fasteners * squares +
            lightning * 1000 +
            delivery_value * 30 +
            belt * 200 +
            montage;

          price.innerHTML =
            total_cost
              .toString()
              .replace(
                /(?:(^\d{1,3})(?=(?:\d{3})*$)|(\d{3}))(?!$)/gm,
                "$1$2 "
              ) + " руб.";

          total_price.value = total_cost;
        }
      }
    }

    window.addEventListener(
      "keydown",
      function (e) {
        if (
          e.keyIdentifier == "U+000A" ||
          e.keyIdentifier == "Enter" ||
          e.keyCode == 13
        ) {
          if (
            (e.target.nodeName == "INPUT" && e.target.type == "text") ||
            e.target.type == "number" ||
            e.target.type == "checkbox" ||
            e.target.type == "tel"
          ) {
            e.preventDefault();
            return false;
          }
        }
      },
      true
    );
  }
  /*---------------------Конец калькулятора---------------------*/

  // Маска телефона
  function replaceNumberForInput(value) {
    let val = "";
    const x = value
      .replace(/\D/g, "")
      .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    if (x[1] === "") {
      val = "";
    } else if (!x[2] && x[1] !== "") {
      if (x[1] === "8" || x[1] === "7") {
        val = "+7";
      } else {
        val = "+7" + x[1];
      }
    } else {
      val = !x[3]
        ? "+7" + x[2]
        : "+7 (" +
          x[2] +
          ") " +
          x[3] +
          (x[4] ? "-" + x[4] : "") +
          (x[5] ? "-" + x[5] : "");
    }

    return val;
  }

  function replaceNumberForPaste(value) {
    const r = value.replace(/\D/g, "");
    let val = r;
    if (val.charAt(0) === "7") {
      val = "8" + val.slice(1);
    }
    return replaceNumberForInput(val);
  }

  const elements = document.querySelectorAll('input[type="tel"]');

  elements.forEach((el) => {
    el.oninput = function (e) {
      if (!e.isTrusted) {
        return;
      }
      this.value = replaceNumberForInput(this.value);
    };

    el.onpaste = function () {
      setTimeout(() => {
        const pasteVal = el.value;
        this.value = replaceNumberForPaste(pasteVal);
      });
    };

    el.onchange = function () {
      setTimeout(() => {
        const pasteVal = el.value;
        this.value = replaceNumberForPaste(pasteVal);
      });
    };
  });

  /*-------------------------------Формула расчёт--------------------------------------*/

  /* видео на главной */

  let video_main = document.querySelector(".main-video");
  let btn_main = document.querySelector(".main_video_play");

  if (btn_main) {
    video_main.addEventListener("pause", () => {
      btn_main.classList.remove("hidden");
      video_main.removeAttribute("controls");
    });

    video_main.addEventListener("play", () => {
      btn_main.classList.add("hidden");
      video_main.setAttribute("controls", true);
    });

    btn_main.addEventListener("click", () => {
      if (video_main.paused) {
        video_main.play();
      } else {
        video_main.pause();
      }
    });
  }
  // мобильное меню
  const burger = document.querySelector(".header__burger");

  if (burger) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      document.querySelector(".mobile").classList.toggle("active");
    });

    document.querySelectorAll(".mobile-nav-item").forEach((nav_item) => {
      let title = nav_item.querySelector(".mobile-nav-item-title");
      let arrow = nav_item.querySelector(".mobile-arrow");
      let drop = nav_item.querySelector(".mobile-nav-item-drop");
      let drop_height = drop.scrollHeight;

      arrow.addEventListener("click", () => {
        if (drop.style.height == 0) {
          document.querySelectorAll(".mobile-nav-item").forEach((item) => {
            item.querySelector(".mobile-nav-item-drop").style.height = "";
            item.querySelector(".mobile-arrow").style.transform = "";
          });
          drop.style.height = drop_height + "px";
          arrow.style.transform = "rotate(180deg)";
        } else {
          document.querySelectorAll(".mobile-first-drop").forEach((item) => {
            if (item.querySelector(".mobile-second-drop")) {
              item.querySelector(".mobile-second-drop").style.height = "";
              item.querySelector(".mobile-arrow").style.transform = "";
            }
            item.querySelector(".mobile-nav-item-list-title a").style.color =
              "";
          });
          drop.style.height = "";
          arrow.style.transform = "";
        }
      });

      let first_drops = nav_item.querySelectorAll(".mobile-first-drop");
      first_drops.forEach((first_drop) => {
        let title = first_drop.querySelector(".mobile-nav-item-list-title a");
        let drop_arrow = first_drop.querySelector(".mobile-arrow");
        let second_drop = first_drop.querySelector(".mobile-second-drop");

        if (drop_arrow) {
          let second_drop_height = second_drop.scrollHeight;
          drop_arrow.addEventListener("click", () => {
            drop_arrow.addEventListener("click", () => {
              if (second_drop.style.height == 0) {
                document
                  .querySelectorAll(".mobile-first-drop")
                  .forEach((item) => {
                    if (item.querySelector(".mobile-second-drop")) {
                      item.querySelector(".mobile-second-drop").style.height =
                        "";
                      item.querySelector(".mobile-arrow").style.transform = "";
                    }
                    item.querySelector(
                      ".mobile-nav-item-list-title a"
                    ).style.color = "";
                  });
                title.style.color = "#FF5C00";
                drop.style.height = drop_height + "px";
                drop.style.height = drop_height + second_drop_height + "px";
                second_drop.style.height = second_drop_height + "px";
                drop_arrow.style.transform = "rotate(180deg)";
              } else {
                second_drop.style.height = "";
                drop_arrow.style.transform = "";
                title.style.color = "";
                drop.style.height = drop_height + "px";
              }
            });
          });
        }
      });

      // 	let nav_items = document.querySelectorAll('.mobile-nav-item');
      // 	nav_items.forEach(nav_item => {
      // 		let drop_lists = nav_item.querySelectorAll('.mobile-nav-item-list');
      // 		let title = nav_item.querySelector('.mobile-nav-item-title');
      // 		let arrow = nav_item.querySelector('.mobile-arrow');
      // 		drop_lists.forEach(drop_list => {
      // 			/*lvl-1*/
      // 				if (drop_list) {
      // 				title.addEventListener('click', () => {
      // 				let drop_height = drop_list.scrollHeight;
      // 				if (drop_list.style.height == 0) {
      // 				nav_item.style.gap = 10 + 'px';
      // 				arrow.style.transform = 'rotate(180deg)'
      // 				drop_list.style.height = drop_height + 'px';
      // 				} else {
      // 				arrow.style.transform = 'rotate(0deg)'
      // 				drop_list.style.height = '';
      // 				nav_item.style.gap = '';
      // 				}
      // 	let nav_items = document.querySelectorAll('.mobile-nav-item');
      // 	nav_items.forEach(nav_item => {
      // 		let drop_lists = nav_item.querySelectorAll('.mobile-nav-item-list');
      // 		let title = nav_item.querySelector('.mobile-nav-item-title');
      // 		let arrow = nav_item.querySelector('.mobile-arrow');
      // 		drop_lists.forEach(drop_list => {
      // 			/*lvl-1*/
      // 				if (drop_list) {
      // 				title.addEventListener('click', () => {
      // 				let drop_height = drop_list.scrollHeight;
      // 				if (drop_list.style.height == 0) {
      // 				nav_item.style.gap = 10 + 'px';
      // 				arrow.style.transform = 'rotate(180deg)'
      // 				drop_list.style.height = drop_height + 'px';
      // 				} else {
      // 				arrow.style.transform = 'rotate(0deg)'
      // 				drop_list.style.height = '';
      // 				nav_item.style.gap = '';
      // 				}

      // 				/*lvl-2*/
      // 				nav_item.querySelectorAll('.mobile-nav-item-list').forEach(item => {
      // 					let sec_title = item.querySelector('.mobile-nav-item-list-title');
      // 					let sec_drop_list = item.querySelector('.mobile-nav-item-drop-list');
      // 					if (sec_drop_list) {
      // 						sec_title.addEventListener('click', () => {
      // 							let sec_drop_height = sec_drop_list.scrollHeight;
      // 							if (sec_drop_list.style.height == 0) {
      // 								nav_item.querySelectorAll('.mobile-nav-item-list').forEach(item => {
      // 									item.style.height = drop_height + 'px';
      // 								})
      // 								item.style.height = sec_drop_height + sec_title.scrollHeight + 6 + 'px'
      // 								item.querySelectorAll('.mobile-nav-item-drop-list').forEach(sec_drop_list => {
      // 									sec_drop_list.style.minHeight = '';
      // 									sec_drop_list.style.height = '';
      // 								})
      // 								document.querySelectorAll('.mobile-nav-item-list-title').forEach(sec_title => {
      // 									sec_title.style.color = '#263238';
      // 								})
      // 								sec_drop_list.style.height = sec_drop_height + 'px';
      // 								sec_title.style.color = '#FF5C00';
      // 							} else {
      // 								sec_drop_list.style.minHeight = 0 + '';
      // 								sec_drop_list.style.height = '';
      // 								sec_title.style.color = '#263238';
      // 								item.style.height = drop_height + 'px'
      // 							}
      // 						})
      // 					}
      // 				})

      // 			})
      // 		}
      // 	});
      // })
    });
  }
  // выпадающие списки на фильтре
  const filter_block = document
    .querySelectorAll(".filter-block")
    .forEach((block) => {
      let filter_boxes = block.querySelectorAll(".filter-boxes"),
        block_title = block.querySelector(".filter-block-title");
      if (block) {
        if (window.screen.width < 1001) {
          block_title.addEventListener("click", () => {
            if (block.style.gap == 0) {
              block_title.classList.add("active");
              block.style.gap = "20px";
              filter_boxes.forEach((box) => {
                let drop_list_height = box.scrollHeight;
                box.style.height = drop_list_height + "px";
                box.style.opacity = "1";
                box.style.pointerEvents = "all";
              });
            } else {
              block_title.classList.remove("active");
              block.style.gap = "";
              filter_boxes.forEach((box) => {
                let drop_list_height = box.scrollHeight;
                box.style.height = "";
                box.style.opacity = "0";
                box.style.pointerEvents = "none";
              });
            }
          });
        }
      }
    });

  // Читать дальше
  const seo_btn = document.querySelector(".js-seo-btn");
  if (seo_btn) {
    seo_btn.addEventListener("click", () => {
      let elem = document.querySelector(".seo_block-subtitle");
      let elemHeight = elem.scrollHeight;

      if (elem.style.maxHeight == 0) {
        elem.style.maxHeight = elemHeight + "px";
        seo_btn.classList.add("disable");
        seo_btn.innerHTML = "свернуть";
      } else {
        elem.style.maxHeight = "";
        seo_btn.innerHTML = "читать далее";
      }
    });
  }

  //Футер
  document.querySelectorAll(".footer-nav-item").forEach((nav_item) => {
    nav_item.querySelectorAll(".footer-nav-item-list").forEach((item) => {
      let title = item.querySelector(".footer-nav-item-list-title a");
      let arrow = item.querySelector(".footer-arrow");
      let drop_list = item.querySelector(".footer-nav-item-drop-list");

      // if (window.screen.width > 1000 && item) {
      // 	item.addEventListener('mouseover', () => {
      // 		let drop_height = drop_list.scrollHeight;
      // 		document.querySelectorAll('.footer-nav-item-drop-list').forEach(drop_list => {
      // 			drop_list.style.height = '';
      // 		})
      // 		document.querySelectorAll('.footer-nav-item-list-title a').forEach(title => {
      // 			title.style.color = 'rgba(38, 50, 56, 0.8)';
      // 		})
      // 		drop_list.style.height = drop_height + 'px';
      // 		title.style.color = '#FF5C00';
      // 		arrow.style.transform = 'rotate(180deg)'
      // 	})
      // 	item.addEventListener('mouseout', () => {
      // 		drop_list.style.height = '';
      // 		title.style.color = 'rgba(38, 50, 56, 0.8)';
      // 		arrow.style.transform = '';
      // 	})
      // }

      if (drop_list && arrow) {
        arrow.addEventListener("click", () => {
          let drop_height = drop_list.scrollHeight;
          if (drop_list.style.height == 0) {
            document
              .querySelectorAll(".footer-nav-item-drop-list")
              .forEach((drop_list) => {
                drop_list.style.height = "";
              });
            document
              .querySelectorAll(".footer-nav-item-list-title a")
              .forEach((title) => {
                title.style.color = "rgba(38, 50, 56, 0.8)";
              });
            document.querySelectorAll(".footer-arrow").forEach((title) => {
              arrow.style.transform = "";
            });
            drop_list.style.height = drop_height + "px";
            title.style.color = "#FF5C00";
            arrow.style.transform = "rotate(180deg)";
          } else {
            drop_list.style.height = "";
            title.style.color = "rgba(38, 50, 56, 0.8)";
            arrow.style.transform = "";
          }
        });
      }
    });
  });

  //Ещё статьи
  let article_slider = document.querySelector(".article-slider");
  if (article_slider) {
    window.addEventListener("scroll", () => {
      let descriptionFirst = document.querySelector(
        ".article-slide-content.active"
      ).clientHeight;
      article_slider.style.height = descriptionFirst + "px";
    });
    window.addEventListener("resize", () => {
      let descriptionFirst = document.querySelector(
        ".article-slide-content.active"
      ).clientHeight;
      article_slider.style.height = descriptionFirst + "px";
    });
    let artcile_slide = article_slider.querySelectorAll(".article-slide");
    artcile_slide.forEach((slide) => {
      let description = slide.querySelector(".article-slide-content");
      let btn = slide.querySelector(".article-slide-btn");
      btn.addEventListener("click", () => {
        document.querySelectorAll(".article-slide").forEach((slide) => {
          slide
            .querySelector(".article-slide-content")
            .classList.remove("active");
          slide.querySelector(".article-slide-btn").classList.remove("active");
        });
        let descriptionHeiht = description.clientHeight;
        article_slider.style.height = descriptionHeiht + "px";
        description.classList.add("active");
        btn.classList.add("active");
      });
    });
  }

  //Галерея
  let photo_otch = document.querySelector(".photo_otch");

  if (photo_otch) {
    photo_otch.addEventListener("click", () => {
      document.querySelectorAll(".gallery-nav-item").forEach((nav_item) => {
        nav_item.classList.remove("active");
      });
      document.querySelectorAll(".gallery_swiper").forEach((galery_item) => {
        galery_item.classList.remove("active");
      });
      photo_otch.classList.add("active");
      document.querySelector(".gallery-photo").classList.add("active");
    });
  }
  let video_otch = document.querySelector(".video_otch");

  if (video_otch) {
    video_otch.addEventListener("click", () => {
      document.querySelectorAll(".gallery-nav-item").forEach((nav_item) => {
        nav_item.classList.remove("active");
      });
      document.querySelectorAll(".gallery_swiper").forEach((galery_item) => {
        galery_item.classList.remove("active");
      });
      video_otch.classList.add("active");
      document.querySelector(".gallery-video").classList.add("active");
    });
  }

  let slidess = document.querySelectorAll(".swiper-slide");

  slidess.forEach((slide) => {
    let video_gallary = slide.querySelector(".video-item");
    let btn_gallary = slide.querySelector(".gallery_video_play");

    if (btn_gallary) {
      video_gallary.addEventListener("pause", () => {
        btn_gallary.classList.remove("hidden");
        video_gallary.removeAttribute("controls");
      });

      video_gallary.addEventListener("play", () => {
        btn_gallary.classList.add("hidden");
        video_gallary.setAttribute("controls", true);
      });

      btn_gallary.addEventListener("click", () => {
        if (video_gallary.paused) {
          video_gallary.play();
        } else {
          video_gallary.pause();
        }
      });
    }
  });

  let slides = document.querySelectorAll(".works__content-title");
  let wrapper = document.querySelector(".works-swipe");

  if (slides && wrapper) {
    slides.forEach(function (slide) {
      slide.addEventListener("click", () => {
        slides.forEach((slide_btn) => {
          slide_btn.classList.remove("active");
        });
        document
          .querySelectorAll(".works__content-slider .swiper.works")
          .forEach((item_slide) => {
            if (item_slide.dataset.index == slide.dataset.index) {
              if (item_slide.dataset.index == slide.dataset.index) {
                item_slide.classList.add("active");
              } else {
                item_slide.classList.remove("active");
              }
              workSwiperInit();
            }
          });
        slide.classList.add("active");
        wrapper.style.transform =
          "translateX(-" + slide.dataset.index * wrapper.clientWidth + "px)";
      });
    });
  }

  const main_form = document.querySelector("#main2");
  if (main_form) {
    let is_form_sending = false;
    main_form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = main_form.querySelector("[name]");
      const phone_form = main_form.querySelector('input[name = "phone"]');
      if (name.value.length > 35) {
        return;
      }
      if (phone_form.value.length < 18) {
        return;
      }
      if (!is_form_sending) {
        is_form_sending = true;
        // main_form.classList.add('disabled');
        const url = new URL(window.location.href);
        const data = new FormData(main_form);
        data.append("utm_source", url.searchParams.get("utm_source"));
        data.append("utm_medium", url.searchParams.get("utm_medium"));
        data.append("utm_campaign", url.searchParams.get("utm_campaign"));
        data.append("utm_content", url.searchParams.get("utm_content"));
        data.append("utm_term", url.searchParams.get("utm_term"));
        data.append("utm_gen", url.searchParams.get("utm_gen"));
        data.append("method", "add");
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/v1/methods/createOrder");
        xhr.send(data);
        xhr.onload = function () {
          if (xhr.status != 200) {
            console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
          } else {
            main_form.reset();
            ym(93768360, "reachGoal", "zayavka");
            _tmr.push({
              type: "reachGoal",
              id: 3563210,
              value: 1000,
              goal: "zayavka",
            });
            console.log("Успешно отправлено!");
            // const basket = document.querySelector(".js-basket");
            // if (basket) {
            // 	basket.innerHTML = `<div class="basket basket-empty">
            //                            <h2>Ваша корзина пуста</h2>
            //                         </div>`
            // }
          }
          is_form_sending = false;
          // main_form.classList.remove('disabled');
        };

        xhr.onerror = function () {
          console.error("Запрос не удался");
          is_form_sending = false;
          // main_form.classList.remove('disabled');
        };
      } else {
        console.log("Запрос ещё отправляется...");
      }
    });
  }
  const main_form1 = document.querySelector("#main1");
  if (main_form1) {
    let is_form_sending = false;
    main_form1.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = main_form1.querySelector("[name]");
      const phone_form = main_form1.querySelector('input[name = "phone"]');
      if (name.value.length > 35) {
        return;
      }
      if (phone_form.value.length < 18) {
        return;
      }

      if (!is_form_sending) {
        is_form_sending = true;
        // main_form.classList.add('disabled');
        const url = new URL(window.location.href);
        const data = new FormData(main_form1);
        data.append("utm_source", url.searchParams.get("utm_source"));
        data.append("utm_medium", url.searchParams.get("utm_medium"));
        data.append("utm_campaign", url.searchParams.get("utm_campaign"));
        data.append("utm_content", url.searchParams.get("utm_content"));
        data.append("utm_term", url.searchParams.get("utm_term"));
        data.append("utm_gen", url.searchParams.get("utm_gen"));
        data.append("method", "add");
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/v1/methods/createOrder");
        xhr.send(data);
        xhr.onload = function () {
          if (xhr.status != 200) {
            console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
          } else {
            main_form1.reset();
            ym(93768360, "reachGoal", "zayavka");
            _tmr.push({
              type: "reachGoal",
              id: 3563210,
              value: 1000,
              goal: "zayavka",
            });
            console.log("Успешно отправлено!");
            // const basket = document.querySelector(".js-basket");
            // if (basket) {
            // 	basket.innerHTML = `<div class="basket basket-empty">
            //                            <h2>Ваша корзина пуста</h2>
            //                         </div>`
            // }
          }
          is_form_sending = false;
          // main_form.classList.remove('disabled');
        };
        xhr.onerror = function () {
          console.error("Запрос не удался");
          is_form_sending = false;
          // main_form.classList.remove('disabled');
        };
      } else {
        console.log("Запрос ещё отправляется...");
      }
    });
  }
  const calc_form = document.querySelector("#calc1");
  if (calc_form) {
    calc_form.addEventListener("submit", (e) => {
      e.preventDefault();
      // main_form.classList.add('disabled');
      const url = new URL(window.location.href);
      const data = new FormData(calc_form);
      data.append("utm_source", url.searchParams.get("utm_source"));
      data.append("utm_medium", url.searchParams.get("utm_medium"));
      data.append("utm_campaign", url.searchParams.get("utm_campaign"));
      data.append("utm_content", url.searchParams.get("utm_content"));
      data.append("utm_term", url.searchParams.get("utm_term"));
      data.append("utm_gen", url.searchParams.get("utm_gen"));
      let xhr = new XMLHttpRequest();
      const inp = calc_form.querySelector('input[type="tel"]');
      if (inp.value.length == 18) {
        const inp = calc_form.querySelector('input[type="tel"]');
        if (inp.value.length == 18) {
          xhr.open(
            "POST",
            "/v1/methods/createCalculator"
          );
          xhr.send(data);
          xhr.onload = function () {
            if (xhr.status != 200) {
              if (xhr.status != 200) {
                console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
                is_form_sending = false;
              } else {
                is_form_sending = false;
              }
            } else {
              ym(93768360, "reachGoal", "zayavka");
              _tmr.push({
                type: "reachGoal",
                id: 3563210,
                value: 1000,
                goal: "zayavka",
              });
              calc_form.reset();
            }
          };
        } else {
          document.querySelector(".calc_error").classList.add("active");
          e.preventDefault();
          is_form_sending = false;
        }
        xhr.onerror = function () {
          console.error("Запрос не удался");
          is_form_sending = false;
          // main_form.classList.remove('disabled');
        };
      }
    });
    document.onclick = function (e) {
      if (e.target.className != "calc_error") {
        if (e.target.className != "calc_error") {
          document.querySelector(".calc_error").classList.remove("active");
        }
      }
    };
  }
  const sort_form = document.querySelector("#sort");

  if (sort_form) {
    let is_form_sending = false;
    let sort_btn_apply = sort_form.querySelector(".filter-btn.apply");
    let sort_btn_reset = sort_form.querySelector(".filter-btn.reset");
    sort_btn_reset.addEventListener("click", (e) => {
      sort_form.reset();
      e.preventDefault();
      if (!is_form_sending) {
        is_form_sending = true;
        // main_form.classList.add('disabled');
        const sort_data = new FormData(sort_form);
        const index = document.querySelector(
          ".our_works__content-slider.active"
        );
        sort_data.append("active", index.dataset.index);
        // data.append('method', 'calc');
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/v1/methods/sortPage");
        xhr.send(sort_data);

        xhr.onload = function () {
          if (xhr.status != 200) {
            console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
          } else {
            var responseHTML = xhr.responseText; // или xhr.responseHTML, в зависимости от настроек
            // Парсинг строки JSON и получение объекта
            var data = JSON.parse(responseHTML);
            //console.log(data); // Вывод в консоль для примера
            document.querySelector(".our_works__content").innerHTML = "";
            document.querySelector(".our_works__content").innerHTML = data;
            topFilter();
            // vj,bkrf
            console.log("Успешно отправлено!");
            const index = document.querySelector(
              ".works__content-title.active"
            );
            sort_data.append("active_m", index.dataset.index);
            let xsr = new XMLHttpRequest();
            xsr.open(
              "POST",
              "/v1/methods/sortMobilePage"
            );
            xsr.send(sort_data);
            xsr.onload = function () {
              if (xsr.status != 200) {
                console.log(`Ошибка ${xsr.status}: ${xsr.statusText}`);
              } else {
                var responseHTML_m = xsr.responseText; // или xhr.responseHTML, в зависимости от настроек
                // Парсинг строки JSON и получение объекта
                var data_m = JSON.parse(responseHTML_m);
                // Используйте полученный HTML на вашей веб-странице
                document.querySelector(".m-our_works__content").innerHTML = "";
                document.querySelector(".m-our_works__content").innerHTML =
                  data_m;
                topFilter();
                ourSwiperInit();
              }
              is_form_sending = false;
              // main_form.classList.remove('disabled');
            };
          }
          is_form_sending = false;
          // main_form.classList.remove('disabled');
        };
        xhr.onerror = function () {
          console.error("Запрос не удался");
          is_form_sending = false;
          // main_form.classList.remove('disabled');
        };
      } else {
        console.log("Запрос ещё отправляется...");
      }
    });
    sort_btn_apply.addEventListener("click", (e) => {
      e.preventDefault();

      if (!is_form_sending) {
        is_form_sending = true;
        // main_form.classList.add('disabled');
        const sort_data = new FormData(sort_form);
        // data.append('method', 'calc');

        const index = document.querySelector(
          ".our_works__content-slider.active"
        );
        sort_data.append("active", index.dataset.index);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/v1/methods/sortPage");
        xhr.send(sort_data);
        xhr.onload = function () {
          if (xhr.status != 200) {
            console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
          } else {
            // const basket = document.querySelector(".js-basket");
            // if (basket) {
            // 	basket.innerHTML = `<div class="basket basket-empty">
            //                            <h2>Ваша корзина пуста</h2>
            //                         </div>`
            // }
            var responseHTML = xhr.responseText; // или xhr.responseHTML, в зависимости от настроек

            // Парсинг строки JSON и получение объекта
            var data = JSON.parse(responseHTML);

            //console.log(data); // Вывод в консоль для примера
            document.querySelector(".our_works__content").innerHTML = "";
            document.querySelector(".our_works__content").innerHTML = data;
            topFilter();

            const index = document.querySelector(
              ".works__content-title.active"
            );
            sort_data.append("active_m", index.dataset.index);

            let xsr = new XMLHttpRequest();
            xsr.open(
              "POST",
              "/v1/methods/sortMobilePage"
            );
            xsr.send(sort_data);

            xsr.onload = function () {
              if (xsr.status != 200) {
                console.log(`Ошибка ${xsr.status}: ${xsr.statusText}`);
              } else {
                // const basket = document.querySelector(".js-basket");
                // if (basket) {
                // 	basket.innerHTML = `<div class="basket basket-empty">
                //                            <h2>Ваша корзина пуста</h2>
                //                         </div>`
                // }
                var responseHTML_m = xsr.responseText; // или xhr.responseHTML, в зависимости от настроек
                // Парсинг строки JSON и получение объекта
                var data_m = JSON.parse(responseHTML_m);

                document.querySelector(".m-our_works__content").innerHTML = "";
                document.querySelector(".m-our_works__content").innerHTML =
                  data_m;
                topFilter();
                ourSwiperInit();

                // const basket = document.querySelector(".js-basket");
                // if (basket) {
                // 	basket.innerHTML = `<div class="basket basket-empty">
                //                            <h2>Ваша корзина пуста</h2>
                //                         </div>`
                // }
              }
              is_form_sending = false;
              // main_form.classList.remove('disabled');
            };
          }
          is_form_sending = false;
          // main_form.classList.remove('disabled');
        };

        xhr.onerror = function () {
          console.error("Запрос не удался");
          is_form_sending = false;
          // main_form.classList.remove('disabled');
        };
      } else {
        console.log("Запрос ещё отправляется...");
      }
    });
  }

  /*--------------------Верхний фильтр в наших работах--------------------*/
  function topFilter() {
    let works_content = document.querySelector(".works__content");
    let wrapper = document.querySelector(".our_works__content");
    if (works_content && wrapper) {
      let nav_items = works_content.querySelectorAll(".works__content-title");
      let slides = works_content.querySelectorAll(".our_works__content-slider");

      let slides_m = works_content.querySelectorAll(
        ".m-our_works__content-slider"
      );
      let slide_height = 0;
      wrapper.style.height =
        document.querySelector(".our_works__content-slider.active")
          .scrollHeight + "px";

      nav_items.forEach((nav_item) => {
        nav_item.addEventListener("click", () => {
          // пк
          if (window.innerWidth > 1200) {
            works_content
              .querySelectorAll(".works__content-title")
              .forEach((item) => {
                item.classList.remove("active");
              });
            nav_item.classList.add("active");
            slides.forEach((slide) => {
              if (nav_item.dataset.index == slide.dataset.index) {
                slide.classList.add("active");
                slide_height = slide.scrollHeight;
              } else {
                slide.classList.remove("active");
              }
            });
            works_content
              .querySelectorAll(".works__content-title")
              .forEach((item) => {
                item.classList.remove("active");
              });
            nav_item.classList.add("active");
            slides.forEach((slide) => {
              if (nav_item.dataset.index == slide.dataset.index) {
                slide.classList.add("active");
                slide_height = slide.scrollHeight;
              } else {
                slide.classList.remove("active");
              }
            });
          } else {
            slides_m.forEach((slide) => {
              if (nav_item.dataset.index == slide.dataset.index) {
                slide.classList.add("active");
                wrapper.style.height = slide.scrollHeight + "px";
              } else {
                slide.classList.remove("active");
              }
            });
            // мобилка

            slides_m.forEach((slide) => {
              if (nav_item.dataset.index == slide.dataset.index) {
                slide.classList.add("active");
                slide_height = slide.scrollHeight;
              } else {
                slide.classList.remove("active");
              }
            });
          }
          // мобилка
          wrapper.style.height = `${slide_height}px`;
        });
      });
    }
  }

  /*----------------------Цена свайпер-------------------------*/

  let cosr_slider = document.querySelector(".cosr_slider");

  if (cosr_slider) {
    cosr_slider.querySelectorAll(".cost__content").forEach((cosr_slide) => {
      cosr_slide.style.width = cosr_slider.clientWidth + "px";
    });

    document.querySelectorAll(".cost-title.odin").forEach((title) => {
      title.addEventListener("click", () => {
        document.querySelectorAll(".cost-title.odin").forEach((item) => {
          item.classList.remove("active");
        });
        title.classList.add("active");
        cosr_slider.querySelector(".cost_wrapper").style.transform =
          "translate(-" + title.dataset.index * cosr_slider.clientWidth + "px)";
      });
    });
  }
  /*------------------pics slider--------------------*/
  /*------------------pics slider--------------------*/

  let project_slider = document.querySelector(".project__slider");

  if (project_slider) {
    let pic_paginations = project_slider.querySelectorAll(".pic");
    pic_paginations.forEach((pic_pagination) => {
      pic_pagination.addEventListener("click", () => {
        project_slider.querySelectorAll(".pic-main img").forEach((item) => {
          if (pic_pagination.dataset.index == item.dataset.index) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      });
    });
  }

  window.ws_OnGeneratorSendLead = sendToPixel; // Отправлена заявка в виджете «Генератор клиентов»
  window.ws_OnCallbackOnlineCall = sendToPixel; // Заказан обратный звонок в рабочее время
  window.ws_OnCallbackDeferredCall = sendToPixel; // Заказан обратный звонок в нерабочее время
  window.ws_OnChatOfflineMessage = sendToPixel; // Посетитель оставил заявку в оффлайн форме виджета «Онлайн-чат»
  window.ws_OnChatVisitorIntroduced = sendToPixel; //	Посетитель оставил контактные данные в форме виджета «Онлайн чат»

  function sendToPixel(data) {
    //console.log(data);
    _tmr.push({ type: "reachGoal", id: 3563210, value: 1000, goal: "zvonok" });
  }
});
