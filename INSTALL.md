# 🔧 Инструкция по установке и запуску проекта

## 📋 Предварительные требования

- **Node.js** версии 16+ ([скачать](https://nodejs.org/))
- **PostgreSQL** база данных (рекомендуется [Neon.tech](https://neon.tech))
- **Git** для клонирования репозитория

---

## 🚀 Быстрый старт

### 1. Клонирование репозитория

```bash
git clone https://github.com/Arkan-AAA/recycle-web-student.git
cd recycle-web-student
```

### 2. Установка зависимостей

#### Вариант A: Установка всех зависимостей одной командой
```bash
npm run install:all
```

#### Вариант B: Установка по отдельности
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Настройка Backend

```bash
cd backend

# Создать .env файл
copy .env.example .env

# Отредактировать .env и добавить:
# DATABASE_URL=your_postgresql_connection_string
# JWT_SECRET=your_secret_key
```

### 4. Настройка Frontend

```bash
cd frontend

# Создать .env файл
copy .env.example .env

# По умолчанию API URL: http://localhost:3001/api
```

### 5. Запуск проекта

#### Терминал 1 - Backend
```bash
cd backend
npm run dev
```
Backend запустится на `http://localhost:3001`

#### Терминал 2 - Frontend
```bash
cd frontend
npm run dev
```
Frontend запустится на `http://localhost:3000`

---

## 📁 Структура проекта

```
recycle-web-student/
├── backend/          # Node.js + Express API
├── frontend/         # Vue.js приложение
├── design/           # Дизайн-материалы
├── docs/             # Документация
└── tools/            # Инструменты разработки
```

---

## 🔍 Проверка работоспособности

### Backend Health Check
```bash
curl http://localhost:3001/api/health
```

### Доступные эндпоинты
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `GET /api/auth/me` - Профиль (требует токен)
- `GET /api/articles` - Список статей
- `POST /api/articles` - Создание статьи (требует токен)

---

## ⚠️ Возможные проблемы

### Ошибка подключения к БД
- Проверьте DATABASE_URL в backend/.env
- Убедитесь, что PostgreSQL запущен

### Порт уже занят
```bash
# Изменить порт в backend/.env
PORT=3002

# Изменить порт в frontend/vite.config.js
server: { port: 3001 }
```

### CORS ошибки
- Убедитесь, что backend запущен
- Проверьте VITE_API_URL в frontend/.env

---

## 📚 Дополнительная документация

- [API Спецификация](docs/api-spec.md)
- [Гайд по компонентам](docs/component-guide.md)
- [Решения по дизайну](docs/design-decisions.md)

---

## 👥 Команда разработки

- **Асқар Алихан** - Team Lead / Backend
- **Садриева Гулзара** - Frontend Developer
- **Назар Алихан** - Designer / Fullstack

---

## 📝 Лицензия

MIT License - см. [LICENSE](LICENSE)
