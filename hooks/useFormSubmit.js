"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

function showNotification(form, message, isSuccess) {
  let note = form.parentElement.querySelector(".form-notification");
  if (!note) {
    note = document.createElement("div");
    note.className = "form-notification";
    form.parentElement.insertBefore(note, form.nextSibling);
  }
  note.textContent = message;
  note.className = "form-notification " + (isSuccess ? "form-notification--success" : "form-notification--error");
  note.style.display = "block";
  if (isSuccess) {
    setTimeout(() => { note.style.display = "none"; }, 5000);
  }
}

export default function useFormSubmit() {
  const pathname = usePathname();
  useEffect(() => {
    let tries = 0;
    function bindOrderForms() {
      document.querySelectorAll("form.main_form, form#main1").forEach((form) => {
        if (form.dataset.boundSubmit === "1") return;
        form.dataset.boundSubmit = "1";
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const submitBtn = form.querySelector('button[type="submit"]');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.dataset.originalText = submitBtn.textContent;
            submitBtn.textContent = "Отправка...";
          }
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
              showNotification(form, "Заявка отправлена. Мы свяжемся с вами в ближайшее время.", true);
            } else if (res.status === 429) {
              showNotification(form, "Слишком много заявок. Пожалуйста, подождите минуту.", false);
            } else {
              showNotification(form, "Не удалось отправить заявку. Попробуйте ещё раз позже.", false);
            }
          } catch (err) {
            console.error("contact form error", err);
            showNotification(form, "Ошибка при отправке заявки. Попробуйте ещё раз позже.", false);
          } finally {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = submitBtn.dataset.originalText || "Оставить заявку";
            }
          }
        });
      });
    }
    bindOrderForms();
    const interval = setInterval(() => {
      tries += 1;
      bindOrderForms();
      if (tries > 80) clearInterval(interval);
    }, 200);

    return () => clearInterval(interval);
  }, [pathname]);
}
