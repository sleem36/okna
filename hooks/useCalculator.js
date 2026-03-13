"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function useCalculator() {
  const pathname = usePathname();
  useEffect(() => {
    const calcForm = document.getElementById("calc1");
    if (!calcForm) return;

    const rangeMeters = calcForm.querySelector(".range:not(.range_delivery)");
    const bubbleMeters = calcForm.querySelector(".bubble:not(.bubble_delivery)");
    const inputSquares = calcForm.querySelector(".calculate__form-inp.squares");
    const rangeDelivery = calcForm.querySelector(".range_delivery");
    const bubbleDelivery = calcForm.querySelector(".bubble_delivery");
    const inputDelivery = calcForm.querySelector(".calculate__form-inp.delivery");
    const priceSpan = calcForm.querySelector(".form-block-title.price span");
    const priceHidden = calcForm.querySelector("input.calc_price");
    const montageCheck = calcForm.querySelector('input[name="montage"]');
    const inputMolnia = calcForm.querySelector(".lightning");
    const inputBelt = calcForm.querySelector(".belt");

    function updateCalcPrice() {
      if (!priceSpan || !priceHidden) return;
      const meters = parseInt(rangeMeters?.value || 1, 10) || 1;
      const delivery = parseInt(rangeDelivery?.value || 0, 10) || 0;
      const activeBlock = calcForm.querySelector(".form-block-type.fasteners .block-type.active");
      const pricePerM2 = activeBlock ? parseInt(activeBlock.getAttribute("data-value"), 10) || 1300 : 1300;
      const molnia = parseInt(inputMolnia?.value || 0, 10) || 0;
      const remni = parseInt(inputBelt?.value || 0, 10) || 0;
      let total = meters * pricePerM2;
      if (montageCheck?.checked) {
        total += 7000;
        if (delivery > 0) total += Math.min(1000, delivery * 10);
      }
      total += molnia * 200 + remni * 150;
      priceSpan.textContent = total.toLocaleString("ru-RU") + " руб.";
      priceHidden.value = String(total);
    }

    if (rangeMeters && bubbleMeters) {
      rangeMeters.addEventListener("input", () => {
        const v = rangeMeters.value;
        bubbleMeters.textContent = v + " м²";
        bubbleMeters.style.left = "calc(" + v + "% + " + (v > 50 ? -8 : 7.85) + "px)";
        if (inputSquares) inputSquares.value = v + " м²";
        updateCalcPrice();
      });
    }
    if (rangeDelivery && bubbleDelivery) {
      rangeDelivery.addEventListener("input", () => {
        const v = rangeDelivery.value;
        bubbleDelivery.textContent = v + " км";
        bubbleDelivery.style.left = "calc(" + v + "% + " + (v > 50 ? -8 : 8) + "px)";
        if (inputDelivery) inputDelivery.value = v + " км";
        updateCalcPrice();
      });
    }

    const fasteners = calcForm.querySelectorAll(".form-block-type.fasteners .block-type");
    const krepezhName = calcForm.querySelector('input[name="krepezh_name"]');
    const krepezhPrice = calcForm.querySelector('input[name="krepezh_price"]');
    fasteners.forEach((el) => {
      el.addEventListener("click", () => {
        fasteners.forEach((b) => b.classList.remove("active"));
        el.classList.add("active");
        if (krepezhName) krepezhName.value = el.getAttribute("data-label") || "";
        if (krepezhPrice) krepezhPrice.value = el.getAttribute("data-value") || "";
        updateCalcPrice();
      });
    });

    if (montageCheck) montageCheck.addEventListener("change", updateCalcPrice);
    if (inputMolnia) inputMolnia.addEventListener("input", updateCalcPrice);
    if (inputBelt) inputBelt.addEventListener("input", updateCalcPrice);
  }, [pathname]);
}
