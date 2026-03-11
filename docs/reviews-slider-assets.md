# Слайдер отзывов — что нужно для вида «как в оригинале»

## Чего не хватает

Вёрстка и скрипт слайдера повторяют оригинал темы `soft-windows` (см. `assets/js/main.js`): на десктопе (≥1300px) — `slidesPerView: 3`, `centeredSlides: true`, `spaceBetween: -460`; неактивные слайды масштабируются через CSS (`scale(0.5)`), активный — `scale(1)`. Для полного вида **нужны две картинки** из темы WordPress.

### 1. Фон секции — `reviews_bg.jpg`

- **Где используется:** фон блока `#reviews` в `public/theme/css/style.css` (фиолетовый градиент поверх изображения).
- **Что должно быть:** фото (крыша/дом и т.п.), поверх — полупрозрачный фиолетовый слой.
- **Куда положить:** `public/theme/img/reviews_bg.jpg`
- **Откуда взять:** из темы WordPress, например:
  - `C:\ospanel\domains\poli.local\wp-content\themes\soft-windows\assets\img\reviews_bg.jpg`

### 2. Рамка телефона — `review_slide.png`

- **Где используется:** фон у `.swiper-slide-bg` — «рамка» смартфона, внутри неё выводится скриншот отзыва.
- **Что должно быть:** PNG с прозрачностью — силуэт телефона с «окном» под картинку (в CSS: 394×749 px, картинка внутри ~319×663 px).
- **Куда положить:** `public/theme/img/review_slide.png`
- **Откуда взять:** из темы WordPress, например:
  - `C:\ospanel\domains\poli.local\wp-content\themes\soft-windows\assets\img\review_slide.png`

## Итог

| Файл | Путь в проекте | Источник (оригинал) |
|------|----------------|---------------------|
| **reviews_bg.jpg** | `public/theme/img/reviews_bg.jpg` | Тема soft-windows, assets/img |
| **review_slide.png** | `public/theme/img/review_slide.png` | Тема soft-windows, assets/img |

После копирования этих файлов секция отзывов будет с правильным фоном и рамками телефонов вокруг скриншотов.

После копирования этих двух файлов в указанные пути слайдер будет выглядеть как в оригинале (фон секции + рамки телефонов вокруг скриншотов).
