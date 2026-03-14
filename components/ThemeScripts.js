"use client";

import { useEffect } from "react";
import useBurgerMenu from "../hooks/useBurgerMenu";
import useSwiperInit from "../hooks/useSwiperInit";
import useCostTabs from "../hooks/useCostTabs";
import useSeoToggle from "../hooks/useSeoToggle";
import useCalculator from "../hooks/useCalculator";
import useFooterDropdown from "../hooks/useFooterDropdown";
import useFormSubmit from "../hooks/useFormSubmit";

export default function ThemeScripts() {
  useEffect(() => {
    const preloader = document.querySelector(".preloader");
    if (preloader) preloader.classList.add("hidden");
  }, []);

  // Envybox: принудительно уменьшить кнопку «Позвоним вам» и перенести вправо (виджет перезаписывает CSS)
  useEffect(() => {
    function applyEnvyboxButtonStyle() {
      const btn = document.querySelector("a.cbk-phone-fixed, a.callbackkiller.cbk-phone-fixed");
      if (!btn) return;
      btn.style.setProperty("left", "auto", "important");
      btn.style.setProperty("right", "20px", "important");
      btn.style.setProperty("bottom", "20px", "important");
      btn.style.setProperty("inset", "auto 20px 20px auto", "important");
      btn.style.setProperty("transform", "scale(0.5)", "important");
      btn.style.setProperty("transform-origin", "bottom right", "important");
    }
    applyEnvyboxButtonStyle();
    const t1 = setTimeout(applyEnvyboxButtonStyle, 500);
    const t2 = setTimeout(applyEnvyboxButtonStyle, 1500);
    const observer = new MutationObserver(() => applyEnvyboxButtonStyle());
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
    };
  }, []);

  useBurgerMenu();
  useSwiperInit();
  useCostTabs();
  useSeoToggle();
  useCalculator();
  useFooterDropdown();
  useFormSubmit();

  return null;
}
