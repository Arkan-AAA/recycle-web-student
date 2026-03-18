FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json файлы
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Устанавливаем зависимости для фронтенда
WORKDIR /app/frontend
RUN npm ci

# Устанавливаем зависимости для бэкенда
WORKDIR /app/backend
RUN npm ci --only=production

# Возвращаемся в корень
WORKDIR /app

# Копируем исходный код
COPY frontend/ ./frontend/
COPY backend/ ./backend/

# Копируем базу знаний в бэкенд (для AI)
RUN cp -r ./frontend/public/knowledge-base ./backend/knowledge-base || true

# Собираем фронтенд
WORKDIR /app/frontend
RUN npm run build

# Копируем собранный фронтенд в папку бэкенда
RUN cp -r dist/* ../backend/public/ || mkdir -p ../backend/public && cp -r dist/* ../backend/public/

# Переходим в бэкенд
WORKDIR /app/backend

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Меняем владельца файлов
RUN chown -R nodejs:nodejs /app

# Переключаемся на пользователя nodejs
USER nodejs

# Открываем порт
EXPOSE 3000

# Проверка здоровья
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js || exit 1

# Запускаем бэкенд
CMD ["npm", "start"]