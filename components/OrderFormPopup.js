'use client';

import { useState, useEffect } from 'react';

export default function OrderFormPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener('openOrderPopup', onOpen);
    return () => window.removeEventListener('openOrderPopup', onOpen);
  }, []);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      document.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="order-popup-overlay"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-popup-title"
    >
      <div className="order-popup-box" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="order-popup-close"
          onClick={() => setOpen(false)}
          aria-label="Закрыть"
        >
          ×
        </button>
        <div className="order-popup-content">
          <h2 id="order-popup-title" className="order-popup-title">
            Оставить заявку
          </h2>
          <form
            className="price_window_form main_form contacts_form"
            id="popup_order"
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const submitBtn = form.querySelector('button[type="submit"]');
              if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.dataset.originalText = submitBtn.textContent;
                submitBtn.textContent = 'Отправка...';
              }
              const formData = new FormData(form);
              const name = (formData.get('name') || '').toString();
              const phone = (formData.get('phone') || '').toString();
              const page = typeof window !== 'undefined' ? window.location.pathname : '';
              fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, message: '', page, formId: 'popup_order' }),
              })
                .then((res) => {
                  let note = form.parentElement.querySelector('.form-notification');
                  if (!note) {
                    note = document.createElement('div');
                    note.className = 'form-notification';
                    form.parentElement.appendChild(note);
                  }
                  if (res.ok) {
                    form.reset();
                    note.textContent = 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.';
                    note.className = 'form-notification form-notification--success';
                    note.style.display = 'block';
                    setTimeout(() => setOpen(false), 2000);
                  } else if (res.status === 429) {
                    note.textContent = 'Слишком много заявок. Пожалуйста, подождите минуту.';
                    note.className = 'form-notification form-notification--error';
                    note.style.display = 'block';
                  } else {
                    note.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз позже.';
                    note.className = 'form-notification form-notification--error';
                    note.style.display = 'block';
                  }
                })
                .catch(() => {
                  const note = form.parentElement.querySelector('.form-notification') || document.createElement('div');
                  note.className = 'form-notification form-notification--error';
                  note.textContent = 'Ошибка при отправке заявки.';
                  form.parentElement.appendChild(note);
                  note.style.display = 'block';
                })
                .finally(() => {
                  if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = submitBtn.dataset.originalText || 'Оставить заявку';
                  }
                });
            }}
          >
            <div className="price_window_form-inp contacts_form-inp">
              <input type="text" name="name" required maxLength={35} />
              <span className="floating-label floating-label-name">Имя</span>
            </div>
            <div className="price_window_form-inp contacts_form-inp">
              <input type="tel" name="phone" required />
              <span className="floating-label floating-label-name">Номер телефона</span>
            </div>
            <button type="submit" className="btn price_window_form-btn contacts_form-btn">
              Оставить заявку
            </button>
            <p className="form-consent">
              Нажимая на кнопку, Вы соглашаетесь на{' '}
              <a href="/privacy">обработку своих данных</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
