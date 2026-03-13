export default function ContactFormSection({
  title = 'Оставить заявку на консультацию',
  subtitle = '',
  sectionId = 'contacts_order',
  formId = 'main2',
}) {
  return (
    <section id={sectionId}>
      <div className="container">
        <div className="price_window_order contacts_order">
          <div className="price_window_order-title">
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
          <form className="price_window_form main_form contacts_form" id={formId} action="#">
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
          </form>
        </div>
      </div>
    </section>
  );
}
