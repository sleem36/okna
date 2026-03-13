"use client";
import { useEffect } from "react";

export default function useBurgerMenu() {
  useEffect(() => {
    const burger = document.querySelector(".header__burger");
    const mobile = document.querySelector(".mobile");
    if (!burger || !mobile) return;

    function handleBurgerClick() {
      burger.classList.toggle("active");
      mobile.classList.toggle("active");
    }
    burger.addEventListener("click", handleBurgerClick);

    const mobileArrowCleanups = [];
    document.querySelectorAll(".mobile-nav-item").forEach((navItem) => {
      const arrow = navItem.querySelector(".mobile-arrow");
      const drop = navItem.querySelector(".mobile-nav-item-drop");
      if (!arrow || !drop) return;
      const dropHeight = drop.scrollHeight;

      function handleArrowClick(e) {
        e.preventDefault();
        if (drop.style.height && drop.style.height !== "0px") {
          document.querySelectorAll(".mobile-nav-item-drop").forEach((d) => (d.style.height = ""));
          document.querySelectorAll(".mobile-nav-item .mobile-arrow").forEach((a) => (a.style.transform = ""));
          drop.style.height = "";
          arrow.style.transform = "";
        } else {
          document.querySelectorAll(".mobile-nav-item-drop").forEach((d) => (d.style.height = ""));
          document.querySelectorAll(".mobile-nav-item .mobile-arrow").forEach((a) => (a.style.transform = ""));
          drop.style.height = dropHeight + "px";
          arrow.style.transform = "rotate(180deg)";
        }
      }
      arrow.addEventListener("click", handleArrowClick);
      mobileArrowCleanups.push(() => arrow.removeEventListener("click", handleArrowClick));
    });

    const firstDropCleanups = [];
    document.querySelectorAll(".mobile-first-drop").forEach((firstDrop) => {
      const dropArrow = firstDrop.querySelector(".mobile-arrow");
      const secondDrop = firstDrop.querySelector(".mobile-second-drop");
      const titleLink = firstDrop.querySelector(".mobile-nav-item-list-title a");
      if (!dropArrow || !secondDrop) return;
      const secondHeight = secondDrop.scrollHeight;

      function handleFirstDropClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (secondDrop.style.height && secondDrop.style.height !== "0px") {
          secondDrop.style.height = "";
          dropArrow.style.transform = "";
          if (titleLink) titleLink.style.color = "";
        } else {
          document.querySelectorAll(".mobile-second-drop").forEach((d) => (d.style.height = ""));
          document.querySelectorAll(".mobile-first-drop .mobile-arrow").forEach((a) => (a.style.transform = ""));
          document.querySelectorAll(".mobile-nav-item-list-title a").forEach((a) => (a.style.color = ""));
          secondDrop.style.height = secondHeight + "px";
          dropArrow.style.transform = "rotate(180deg)";
          if (titleLink) titleLink.style.color = "#FF5C00";
        }
      }
      dropArrow.addEventListener("click", handleFirstDropClick);
      firstDropCleanups.push(() => dropArrow.removeEventListener("click", handleFirstDropClick));
    });

    return () => {
      burger.removeEventListener("click", handleBurgerClick);
      mobileArrowCleanups.forEach((fn) => fn());
      firstDropCleanups.forEach((fn) => fn());
    };
  }, []);
}
