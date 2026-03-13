"use client";
import { useEffect } from "react";

export default function useFooterDropdown() {
  useEffect(() => {
    const cleanups = [];
    document.querySelectorAll(".footer-nav-item-list").forEach((item) => {
      const arrow = item.querySelector(".footer-arrow");
      const dropList = item.querySelector(".footer-nav-item-drop-list");
      const title = item.querySelector(".footer-nav-item-list-title a");
      if (!arrow || !dropList) return;

      function handleClick() {
        const dropHeight = dropList.scrollHeight;
        if (dropList.style.height && dropList.style.height !== "0px") {
          dropList.style.height = "";
          if (title) title.style.color = "rgba(38, 50, 56, 0.8)";
          arrow.style.transform = "";
        } else {
          document.querySelectorAll(".footer-nav-item-drop-list").forEach((d) => (d.style.height = ""));
          document.querySelectorAll(".footer-nav-item-list-title a").forEach((a) => (a.style.color = "rgba(38, 50, 56, 0.8)"));
          document.querySelectorAll(".footer-arrow").forEach((a) => (a.style.transform = ""));
          dropList.style.height = dropHeight + "px";
          if (title) title.style.color = "#FF5C00";
          arrow.style.transform = "rotate(180deg)";
        }
      }
      arrow.addEventListener("click", handleClick);
      cleanups.push(() => arrow.removeEventListener("click", handleClick));
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
