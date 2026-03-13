"use client";
import { useEffect } from "react";

export default function useSeoToggle() {
  useEffect(() => {
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
      const isExpandable = block.classList.contains("seo_block-subtitle-expandable");
      const isClosed =
        !currentMax || currentMax === "0px" || currentMax === "13em" ||
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
    return () => document.body.removeEventListener("click", handleSeoBtnClick);
  }, []);
}
