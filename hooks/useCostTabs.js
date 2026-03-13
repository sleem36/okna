"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function useCostTabs() {
  const pathname = usePathname();
  useEffect(() => {
    const section = document.querySelector("#cost_furniture");
    if (!section) return;

    const costTitlesOdin = section.querySelectorAll(".cost-title.odin");
    const cosrSlider = section.querySelector(".cosr_slider");
    const costWrapper = section.querySelector(".cost_wrapper");
    const costContents = costWrapper ? costWrapper.querySelectorAll(".cost__content") : [];
    const numSlides = costContents.length;
    if (!costTitlesOdin.length || !costWrapper || !numSlides) return;

    function applyCostSliderWidth() {
      if (!cosrSlider) return;
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
      const activeTitle = section.querySelector(".cost-title.odin.active");
      const idx = activeTitle ? Number(activeTitle.getAttribute("data-index")) : 0;
      costWrapper.style.transform = `translateX(-${idx * sliderWidth}px)`;
    }

    applyCostSliderWidth();
    window.addEventListener("resize", applyCostSliderWidth);

    costTitlesOdin.forEach((titleEl) => {
      titleEl.addEventListener("click", () => {
        const index = Number(titleEl.getAttribute("data-index"));
        costTitlesOdin.forEach((t) => t.classList.remove("active"));
        titleEl.classList.add("active");
        const sliderWidth = cosrSlider.offsetWidth;
        costWrapper.style.transform = `translateX(-${index * sliderWidth}px)`;
      });
    });

    return () => {
      window.removeEventListener("resize", applyCostSliderWidth);
    };
  }, [pathname]);
}
