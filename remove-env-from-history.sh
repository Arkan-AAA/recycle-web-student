#!/bin/bash

echo "🔒 Удаление .env файлов из истории Git"
echo "⚠️  ВНИМАНИЕ: Это изменит историю коммитов!"
echo ""
read -p "Продолжить? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

# Создаем бэкап текущей ветки
echo "📦 Создаю бэкап..."
git branch backup-before-filter-$(date +%Y%m%d-%H%M%S)

# Удаляем .env из истории
echo "🗑️  Удаляю .env файлы из истории..."
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch backend/.env frontend/.env" \
  --prune-empty --tag-name-filter cat -- --all

# Очищаем рефлоги и мусор
echo "🧹 Очищаю рефлоги..."
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo ""
echo "✅ Готово! .env файлы удалены из истории"
echo ""
echo "📌 Следующие шаги:"
echo "1. Проверьте репозиторий: git log --all -- backend/.env"
echo "2. Принудительно отправьте изменения: git push origin --force --all"
echo "3. Уведомите команду о необходимости сделать: git pull --rebase"
echo ""
echo "⚠️  ВАЖНО: Смените все секреты (DATABASE_URL, JWT_SECRET, API ключи)!"
