'use client';

export default function OrderFormBlock({ title = 'Не смогли определиться с выбором?' }) {
  return (
    <section id="window_order">
      <div className="container">
        <div className="price_window_order contacts_order">
          <div className="price_window_order-title">
            <h3>{title}</h3>
          </div>
          <form className="price_window_form" id="main1">
            <div className="price_window_form-inp">
              <input type="text" name="name" required maxLength={35} />
              <span className="floating-label floating-label-name">Имя</span>
            </div>
            <div className="price_window_form-inp">
              <input type="tel" name="phone" required />
              <span className="floating-label floating-label-name">Номер телефона</span>
            </div>
            <button type="submit" className="btn price_window_form-btn">
              Оставить заявку
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
