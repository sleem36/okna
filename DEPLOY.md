# Шпаргалка: деплой на хостинг (Beget)

## Две команды

**1. Подключиться:**
```bash
ssh c59840wv.beget.tech
```

**2. После ввода пароля — задеплоить (одна строка):**
```bash
cd ~/test/public_html && bash deploy.sh
```

Скрипт `deploy.sh` сам подтянет код с GitHub, соберёт проект, выставит права и перезапустит приложение.

---

## Если скрипта ещё нет на сервере

Один раз выполнить длинную строку (она загрузит в том числе `deploy.sh`), дальше можно пользоваться двумя командами выше:

```bash
cd ~/test/public_html && git fetch origin main && git reset --hard origin/main && npm ci && npm run build && chmod -R 755 .next public node_modules app lib components hooks data scripts assets && touch tmp/restart.txt
```

---

## Если что-то пошло не так

- **Папка assets:** `rm -rf assets && mkdir -p assets` затем снова `bash deploy.sh`
- **Права на git:** один раз выполнить  
  `git config --global --add safe.directory /home/c/c59840wv/test/public_html`
- **Файл .env** на сервере должен быть (скопировать с `.env.example` и заполнить)
