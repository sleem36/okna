'use client';

export default function OrderFormTrigger({ className, children = 'Оставить заявку' }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent('openOrderPopup'))}
    >
      {children}
    </button>
  );
}
