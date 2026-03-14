'use client';

import Image from 'next/image';

function openOrderPopup(e) {
  e?.preventDefault?.();
  window.dispatchEvent(new CustomEvent('openOrderPopup'));
}

export default function ProductCatalog({ items, title = 'Каталог товаров' }) {
  if (!items?.length) return null;

  return (
    <section className="product-catalog">
      <div className="container">
        <div className="product-catalog__wrapper">
          <h2 className="product-catalog__title">
            <span>{title}</span>
          </h2>
          <div className="product-catalog__grid">
            {items.map((item) => (
              <div key={item.title} className="product-catalog__card">
                <div className="product-catalog__card-img-wrap">
                  <Image
                    src={item.img}
                    alt=""
                    width={280}
                    height={200}
                    className="product-catalog__card-img"
                  />
                </div>
                <div className="product-catalog__card-body">
                  <h3 className="product-catalog__card-title">
                    <a href="#" onClick={openOrderPopup}>{item.title}</a>
                  </h3>
                  <div className="product-catalog__card-price">{item.price}</div>
                  <button
                    type="button"
                    className="btn product-catalog__card-btn"
                    onClick={openOrderPopup}
                  >
                    Заказать
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
