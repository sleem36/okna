'use client';

import { useState } from 'react';

/** Галерея изображений на странице одной работы: главное фото + миниатюры */
export default function ProjectGallery({ images }) {
  const validImages = (images || []).filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!validImages.length) return null;

  return (
    <div className="slide-pics">
      <div className="pic-main">
        {validImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className={i === activeIndex ? 'active' : ''}
            data-index={i}
          />
        ))}
      </div>
      <div className="pic-pagination">
        {validImages.map((src, i) => (
          <div
            key={i}
            className={`pic${i === activeIndex ? ' active' : ''}`}
            data-index={i}
            role="button"
            tabIndex={0}
            onClick={() => setActiveIndex(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveIndex(i);
              }
            }}
          >
            <img src={src} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
