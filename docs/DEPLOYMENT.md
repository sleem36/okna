# Деплой: Strapi + Next.js

Краткая инструкция по выводу проекта в продакшен.

---

## 1. Strapi (okna-project)

### Переменные окружения (продакшен)

Создайте `.env` на сервере или задайте переменные в панели хостинга:

```env
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# База данных (PostgreSQL)
DATABASE_CLIENT=postgres
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=okna
DATABASE_USERNAME=revanta_user
DATABASE_PASSWORD=your-password
DATABASE_SSL=false

# Безопасность (сгенерируйте свои значения)
APP_KEYS=key1,key2
API_TOKEN_SALT=random-salt
ADMIN_JWT_SECRET=admin-jwt-secret
JWT_SECRET=jwt-secret
TRANSFER_TOKEN_SALT=transfer-salt
```

Либо одна строка (если хостинг поддерживает):

```env
DATABASE_URL=postgresql://revanta_user:password@host:5432/okna
```

### Сборка и запуск

```bash
cd okna-project
npm ci --production
npm run build
npm run start
```

### Запуск через PM2 (сервер VPS)

```bash
cd okna-project
npm run build
pm2 start npm --name strapi -- run start
pm2 save
pm2 startup
```

### Хостинги

- **Railway / Render / Heroku:** подключите репозиторий, укажите Build Command `npm run build`, Start Command `npm run start`, добавьте PostgreSQL и переменные из блока выше.
- **VPS:** установите Node.js 20, PostgreSQL, настройте Nginx как reverse proxy на порт 1337, при необходимости SSL (Let's Encrypt).

После деплоя создайте API Token в Strapi (Settings → API Tokens) с правами Find для нужных типов контента и укажите его во фронтенде только если фронт обращается к Strapi с сервера (для getStaticProps обычно нужен публичный доступ или токен в env сборки).

---

## 2. Next.js (frontend)

### Переменные окружения (продакшен)

На Vercel или другом хостинге задайте:

```env
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com
```

Без слэша в конце. Если Strapi на поддомене, например `https://api.okna-myagkie.ru`, укажите этот URL.

### Изображения Strapi

Фронт тянет картинки с Strapi через `next/image`. Добавьте хост Strapi в конфиг:

В `frontend/next.config.js` хост для изображений берётся из `NEXT_PUBLIC_STRAPI_URL` при сборке — достаточно задать эту переменную на хостинге.

### Деплой на Vercel (рекомендуется)

1. Импортируйте репозиторий в Vercel.
2. Корень проекта укажите как `frontend` (или вынесите frontend в корень).
3. Добавьте переменную `NEXT_PUBLIC_STRAPI_URL` = URL продакшен Strapi.
4. Deploy. При сборке Next.js будет запрашивать данные у Strapi; убедитесь, что Strapi доступен по этому URL (или что при билде используется кэш/fallback).

### Деплой на сервере (VPS)

```bash
cd frontend
npm ci --production
npm run build
npm run start
```

Через PM2:

```bash
pm2 start npm --name frontend -- run start
```

Настройте Nginx: proxy на порт 3000, SSL при необходимости.

---

## 3. Примеры .env

### okna-project/.env (продакшен, фрагмент)

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

DATABASE_CLIENT=postgres
DATABASE_HOST=...
DATABASE_PORT=5432
DATABASE_NAME=okna
DATABASE_USERNAME=...
DATABASE_PASSWORD=...

APP_KEYS=...
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
JWT_SECRET=...
```

### frontend/.env.production (или переменные в Vercel)

```env
NEXT_PUBLIC_STRAPI_URL=https://api.your-site.com
```

---

## 4. Чек-лист перед продакшеном

- [ ] Strapi: в Settings → Users & Permissions → Roles → Public включить нужные find для API (portfolio-items, portfolio-categories, home-settings, reviews и т.д.) или использовать API Token при запросах с сервера.
- [ ] Frontend: в next.config.js добавлен хост Strapi в `images.remotePatterns` для загрузки изображений.
- [ ] CORS в Strapi: при запросах с другого домена (frontend на Vercel, Strapi на своём домене) в Strapi настроить разрешённые origin (config/middlewares.js или панель).
- [ ] Заявки: при необходимости заменить заглушку в `frontend/pages/api/send-lead.js` на отправку в email или сохранение в БД/CRM.
