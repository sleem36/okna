#!/bin/bash
# Деплой на хостинг: подтянуть код, собрать, права, перезапуск
set -e
cd "$(dirname "$0")"
git fetch origin main
git reset --hard origin/main
npm ci
npm run build
chmod -R 755 .next public node_modules app lib components hooks data scripts assets
touch tmp/restart.txt 2>/dev/null || true
echo "Готово."
