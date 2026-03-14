# okna — Мягкие окна Стиль (прототип на Next.js)

Статический прототип сайта, перенесённый с WordPress. Данные загружаются из JSON (получены парсингом WXR XML). Подготовлено к последующей замене на API Strapi.

## Требования

- **Node.js 17–20** (рекомендуется 17). Проверка: `node -v`
- При использовании nvm: `nvm use` (в корне есть `.nvmrc` с версией 17)

## Установка

```bash
npm install
```

## Парсинг WordPress XML → JSON

Скрипт читает экспорт WordPress (WXR) и создаёт в папке `data/` файлы: `posts.json`, `pages.json`, `categories.json`, `tags.json`, `menus.json`.

```bash
npm run parse
```

Парсится файл по умолчанию: `WordPress.2026-03-11.xml` в корне проекта. Можно указать другой путь:

```bash
node scripts/parse-wp-xml.js путь/к/экспорту.xml
```

Перед первым запуском Next.js нужно хотя бы один раз выполнить `npm run parse`, иначе меню и контент будут пустыми.

## Данные для страницы «Наши работы»

Таблица работ хранится в `docs/our-works-dump-table.md`. Чтобы обновить данные на сайте после правок в таблице, выполните:

```bash
npm run parse-our-works
```

Скрипт генерирует `data/our-works.json` (44 позиции: id, slug, title, тип, окантовка, основание монтажа, материал, картинки и т.д.). Страница `/our_works` подхватывает эти данные через `lib/our-works-page-data.js`.

## Форма «Оставить заявку» (отправка на почту)

Чтобы заявки с сайта приходили на почту, настройте SMTP. Скопируйте `.env.example` в `.env.local` и укажите данные вашего почтового сервера:

```bash
cp .env.example .env.local
```

Заполните в `.env.local`:

- `SMTP_HOST` — сервер SMTP (например `smtp.yandex.ru`, `smtp.mail.ru`, `smtp.gmail.com`)
- `SMTP_PORT` — порт (обычно 587 или 465)
- `SMTP_USER` и `SMTP_PASS` — логин и пароль (для Gmail — пароль приложения)
- `CONTACT_TO` — адрес, на который присылать заявки (если не указан, используется `SMTP_USER`)

Без этих переменных при отправке формы будет сообщение «Не удалось отправить заявку».

## Медиафайлы

Скопируйте папку `uploads` из `wp-content` в каталог `public/` проекта. В JSON ссылки на медиа уже приведены к виду `/uploads/...`.

## Запуск в режиме разработки

```bash
npm run dev
```

Сайт откроется по адресу [http://localhost:3000](http://localhost:3000).

## Сборка и запуск продакшена

```bash
npm run build
npm start
```

## Структура проекта

- `data/` — JSON с постами, страницами, рубриками, метками, меню (результат парсинга); `site.json` — контакты и настройки (логотип, телефон, соцсети)
- `public/theme/` — ресурсы темы WordPress (soft-windows): `css/`, `img/`, `fonts/`, `libs/` (подключены в приложении как `/theme/...`)
- `public/assets/` — копия папки темы из локального WordPress (`wp-content/themes/soft-windows/assets/`): `js/main.js` (оригинальный скрипт слайдеров, калькулятора, меню), `css/style.css`, `libs/swiper/`, `img/`, `fonts/`, `html/`. Используется как эталон для сверки логики; приложение по умолчанию берёт стили и Swiper из `public/theme/`
- `scripts/parse-wp-xml.js` — скрипт парсинга WXR
- `lib/data.js` — чтение данных из JSON; `lib/site.js` — конфиг сайта
- `app/` — маршруты Next.js (App Router): главная (секции как в tpl_main-page), страницы `/[slug]`, записи `/post/[slug]`, рубрики `/category/[slug]`, `/blog`
- `components/` — Header, Footer (разметка и классы как в оригинале), Preloader, ThemeScripts (бургер, выпадающие меню, прелоадер), Card
- Стили и скрипты оригинала: подключены `public/theme/css/style.css` и `public/theme/libs/swiper/swiper.css`; интерактив (бургер, мобильное меню, футер-аккордеон) реализован в React без jQuery

## Команды

| Команда | Описание |
|--------|----------|
| `npm install` | Установка зависимостей |
| `npm run parse` | Парсинг WordPress XML в JSON |
| `npm run dev` | Сервер разработки |
| `npm run build` | Сборка для продакшена |
| `npm start` | Запуск собранного приложения |
