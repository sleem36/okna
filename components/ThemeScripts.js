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

  useBurgerMenu();
  useSwiperInit();
  useCostTabs();
  useSeoToggle();
  useCalculator();
  useFooterDropdown();
  useFormSubmit();

  return null;
}
