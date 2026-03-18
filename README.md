# 🎓 Студенческий веб-журнал колледжа

**Современная цифровая платформа для студенческого журнала колледжа**  
*Переосмысление традиционного журнала в удобном веб-формате*

---

## 📋 О проекте

Этот проект представляет собой веб-приложение, предназначенное для замены журнала колледжа. Платформа предоставляет студентам и преподавателям удобный доступ к учебным материалам, расписанию, оценкам и студенческим новостям.

### Основные цели:
- ✅ Создать централизованную платформу для студентов
- ✅ Упростить доступ к учебным материалам
- ✅ Реализовать систему публикации студенческих статей и новостей
- ✅ Сделать интерфейс современным и удобным для мобильных устройств
- ✅ Внедрить 100-балльную систему оценивания
- ✅ Обеспечить полную адаптивность под все устройства
- ✅ Добавить полную локализацию (RU/KZ/EN)

---

## 👥 Команда разработки

| Роль | Участник | Основные задачи |
|------|----------|-----------------|
| **Team Lead / Backend** | Асқар Алихан | Архитектура, API, база данных |
| **Frontend Developer** | Садриева Гулзара | Пользовательский интерфейс, верстка |
| **Designer / Fullstack** | Назар Алихан | Дизайн, UX, фронтенд-разработка |

---

## 🛠 Технологический стек

### Frontend
- **HTML5** / **CSS3** 
- **JavaScript** (ES6+)
- **Vue.js 3** с Composition API
- **Vue Router 4** - маршрутизация
- **Vue I18n** - интернационализация
- **Vite** - сборка и разработка
- **Axios** - HTTP клиент

### Backend
- **Node.js + Express** 
- **PostgreSQL** - база данных
- **Sequelize** - ORM
- **JWT** - аутентификация
- **bcryptjs** - хеширование паролей
- **Helmet** - безопасность

### DevOps & Deployment
- **Docker** - контейнеризация
- **Docker Compose** - оркестрация
- **Nginx** - веб-сервер и прокси
- **PostgreSQL** - база данных в контейнере
- **Redis** - кэширование (опционально)

### Инструменты
- **Git & GitHub** - контроль версий
- **Figma** - дизайн и прототипирование
- **GitHub Projects** - управление задачами

---

## 🚀 Быстрый старт

### Предварительные требования
- **Docker** (версия 20.10+)
- **Docker Compose** (версия 2.0+)
- **Node.js** (версия 18+) - только для разработки

### 🐳 Запуск с Docker (Рекомендуется)

1. **Клонирование репозитория**
```bash
git clone https://github.com/Arkan-AAA/recycle-web-student.git
cd recycle-web-student
```

2. **Настройка переменных окружения**
```bash
cp .env.docker .env
# Отредактируйте .env файл, установив безопасные пароли
```

3. **Запуск всех сервисов**
```bash
# Запуск в фоновом режиме
docker-compose up -d

# Или с логами
docker-compose up
```

4. **Проверка статуса**
```bash
docker-compose ps
```

5. **Доступ к приложению**
- **Фронтенд**: http://localhost
- **Бэкенд API**: http://localhost:3000
- **База данных**: localhost:5432

### 🔧 Разработка

1. **Установка зависимостей**
```bash
# Фронтенд
cd frontend
npm install

# Бэкенд
cd ../backend
npm install
```

2. **Запуск в режиме разработки**
```bash
# Фронтенд (в одном терминале)
cd frontend
npm run dev

# Бэкенд (в другом терминале)
cd backend
npm run dev
```

---

## 📁 Структура проекта
```
recycle-web-student/
│
├── 📁 frontend/                    # Vue.js приложение
│   ├── 📁 src/
│   │   ├── 📁 assets/             # Ресурсы (изображения, стили)
│   │   ├── 📁 components/         # Vue компоненты
│   │   │   ├── 📁 layout/        # Компоненты макета
│   │   │   ├── 📁 ui/            # UI компоненты
│   │   │   ├── 📁 articles/      # Компоненты статей
│   │   │   └── 📁 user/          # Пользовательские компоненты
│   │   ├── 📁 pages/             # Страницы приложения
│   │   ├── 📁 i18n/              # Локализация
│   │   │   └── 📁 locales/       # Языковые файлы (ru, kz, en)
│   │   ├── 📁 services/          # API сервисы
│   │   ├── 📁 router/            # Маршрутизация
│   │   └── App.vue               # Корневой компонент
│   ├── Dockerfile                # Docker образ фронтенда
│   ├── nginx.conf               # Конфигурация Nginx
│   └── package.json
│
├── 📁 backend/                     # Node.js API
│   ├── 📁 src/
│   │   ├── 📁 controllers/       # Контроллеры
│   │   ├── 📁 models/            # Модели данных
│   │   ├── 📁 routes/            # Маршруты API
│   │   ├── 📁 middleware/        # Промежуточное ПО
│   │   └── server.js             # Главный файл сервера
│   ├── Dockerfile                # Docker образ бэкенда
│   ├── healthcheck.js           # Проверка здоровья
│   └── package.json
│
├── 📁 knowledge-base/              # База знаний
├── 📁 tools/                       # Инструменты разработки
├── docker-compose.yml              # Docker Compose конфигурация
├── .env.docker                     # Переменные окружения для Docker
└── README.md                       # Этот файл
```

---

## 🌐 Особенности

### 📱 Адаптивный дизайн
- **Мобильные устройства** (320px+)
- **Планшеты** (768px+)
- **Десктопы** (992px+)
- **Большие экраны** (1200px+)

### 🌍 Локализация
- **Русский** (по умолчанию)
- **Казахский**
- **Английский**

### 📊 Система оценок
- **100-балльная шкала**
- **Автоматический перевод в 5-балльную**:
  - 90-100 = 5 (Отлично)
  - 70-89 = 4 (Хорошо)
  - 50-69 = 3 (Удовлетворительно)
  - 0-49 = 2 (Неудовлетворительно)

### 👨‍🏫 Роли пользователей
- **Студент** - просмотр оценок и материалов
- **Преподаватель** - выставление оценок
- **Администратор** - полный доступ

---

## 🐳 Docker команды

### Основные команды
```bash
# Запуск всех сервисов
docker-compose up -d

# Остановка всех сервисов
docker-compose down

# Перезапуск сервиса
docker-compose restart [service_name]

# Просмотр логов
docker-compose logs -f [service_name]

# Обновление образов
docker-compose pull
docker-compose up -d --build
```

### Управление данными
```bash
# Создание резервной копии БД
docker-compose exec database pg_dump -U postgres student_journal > backup.sql

# Восстановление БД
docker-compose exec -T database psql -U postgres student_journal < backup.sql

# Очистка всех данных
docker-compose down -v
```

---

## 🔧 Конфигурация

### Переменные окружения (.env)
```env
# База данных
DB_NAME=student_journal
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_PORT=5432

# Бэкенд
BACKEND_PORT=3000
JWT_SECRET=your-jwt-secret
NODE_ENV=production

# Фронтенд
FRONTEND_PORT=80
VITE_API_URL=http://localhost:3000
```

### Nginx конфигурация
- SPA поддержка с fallback на index.html
- Сжатие статических файлов
- Кэширование ресурсов
- Проксирование API запросов
- Заголовки безопасности

---

## 🚀 Деплой в продакшн

### 1. Подготовка сервера
```bash
# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Установка Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Деплой приложения
```bash
# Клонирование на сервер
git clone https://github.com/Arkan-AAA/recycle-web-student.git
cd recycle-web-student

# Настройка продакшн переменных
cp .env.docker .env
nano .env  # Установите безопасные пароли

# Запуск в продакшн режиме
docker-compose --profile production up -d
```

### 3. SSL сертификат (Let's Encrypt)
```bash
# Установка Certbot
sudo apt install certbot

# Получение сертификата
sudo certbot certonly --standalone -d yourdomain.com

# Настройка автообновления
sudo crontab -e
# Добавить: 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 🔍 Мониторинг и логи

### Просмотр логов
```bash
# Все сервисы
docker-compose logs -f

# Конкретный сервис
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f database
```

### Мониторинг ресурсов
```bash
# Использование ресурсов
docker stats

# Состояние контейнеров
docker-compose ps
```

---

## 🤝 Участие в разработке

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

---

## 📝 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

---

## 📞 Контакты

- **Email**: support@narxoz.kz
- **GitHub**: [Arkan-AAA](https://github.com/Arkan-AAA)
- **Сайт**: [narxoz.kz](https://narxoz.kz)

---

## 🙏 Благодарности

- Команде разработки за отличную работу
- Narxoz College за поддержку проекта
- Сообществу Vue.js за отличную документацию
- Всем контрибьюторам проекта