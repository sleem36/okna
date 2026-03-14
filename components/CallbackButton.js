'use client';

export default function CallbackButton() {
  function handleClick(e) {
    e.preventDefault();
    const el = document.querySelector('#contacts_order, #window_order, .contacts_form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  return (
    <a
      href="#contacts_order"
      onClick={handleClick}
      className="callback-btn"
      aria-label="Позвоним вам — перейти к форме заявки"
    >
      <span className="callback-btn__text">Позвоним вам</span>
    </a>
  );
}
