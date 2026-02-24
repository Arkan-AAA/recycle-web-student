# Система аутентификации и ролей

## Роли пользователей

### 1. **Student (Студент)** - роль по умолчанию
- Доступ ко всем основным страницам
- Просмотр новостей, расписания, оценок
- Редактирование своего профиля
- Использование AI чата

### 2. **Teacher (Преподаватель)**
- Все права студента +
- Возможность выставления оценок (планируется)
- Управление своими предметами (планируется)

### 3. **Admin (Администратор)**
- Полный доступ ко всем функциям
- Доступ к админ-панели
- Управление пользователями
- Управление контентом

## Защита маршрутов

### Frontend (router/index.js)
```javascript
meta: { 
  requiresAuth: true,      // Требуется авторизация
  requiresAdmin: true      // Требуются права админа
}
```

### Backend (middleware/auth.js)
```javascript
authenticate          // Проверка токена
authorize(...roles)   // Проверка ролей
isAdmin              // Только админ
isTeacher            // Преподаватель или админ
```

## Тестовые пользователи

Для создания тестовых пользователей:
```bash
cd backend
node src/scripts/create-users.js
```

**Учетные данные:**
- Админ: `admin@college.kz` / `admin123`
- Преподаватель: `teacher@college.kz` / `teacher123`
- Студент: `student@college.kz` / `student123`

## Использование в компонентах

```javascript
import authService from '@/services/auth.service';

// Проверка роли
const isAdmin = authService.isAdmin();
const isTeacher = authService.isTeacher();
const isStudent = authService.isStudent();

// Получение роли
const role = authService.getUserRole();
```

## Кнопка "Админ панель"

Кнопка автоматически появляется в Header только для пользователей с ролью `admin`.

## API endpoints с защитой

```javascript
// Только для авторизованных
router.get('/profile', authenticate, getProfile);

// Только для админов
router.delete('/users/:id', authenticate, isAdmin, deleteUser);

// Для преподавателей и админов
router.post('/grades', authenticate, isTeacher, createGrade);

// Для определенных ролей
router.get('/reports', authenticate, authorize('admin', 'teacher'), getReports);
```
