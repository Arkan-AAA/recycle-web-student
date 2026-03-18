<template>
  <div class="notifications-page">
    <div class="container">
      <div class="page-header">
        <h1>Учебные уведомления</h1>
      </div>

      <div class="notifications-filter">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="activeFilter = filter.value"
          :class="['filter-btn', { active: activeFilter === filter.value }]"
        >
          {{ filter.label }}
        </button>
      </div>

      <div class="notifications-list">
        <div
          v-for="notification in filteredNotifications"
          :key="notification.id"
          class="notification-item card"
          :class="notification.type"
        >
          <div class="notification-icon">{{ getIcon(notification.type) }}</div>
          <div class="notification-content">
            <h4>{{ notification.title }}</h4>
            <p>{{ notification.message }}</p>
            <span class="notification-date">{{ notification.date }}</span>
          </div>
          <div v-if="!notification.read" class="unread-dot"></div>
        </div>

        <div v-if="filteredNotifications.length === 0" class="empty-state">
          <p>Нет уведомлений</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationsPage',
  data() {
    return {
      activeFilter: 'all',
      filters: [
        { value: 'all', label: 'Все' },
        { value: 'exam', label: 'Экзамены' },
        { value: 'schedule', label: 'Расписание' },
        { value: 'grade', label: 'Оценки' }
      ],
      notifications: [
        { id: 1, type: 'exam', title: 'Экзамен по математике', message: 'Экзамен назначен на 25 января в 9:00, аудитория 101', date: '2024-01-20', read: false },
        { id: 2, type: 'schedule', title: 'Изменение в расписании', message: 'Занятие по физике перенесено на 14:00', date: '2024-01-19', read: true },
        { id: 3, type: 'grade', title: 'Новая оценка', message: 'Получена оценка 5 за контрольную по химии', date: '2024-01-18', read: false }
      ]
    }
  },
  computed: {
    filteredNotifications() {
      if (this.activeFilter === 'all') return this.notifications;
      return this.notifications.filter(n => n.type === this.activeFilter);
    }
  },
  methods: {
    getIcon(type) {
      return { exam: '📝', schedule: '📅', grade: '📊' }[type] || '📢';
    }
  }
}
</script>

<style scoped>
.notifications-page { padding: 1.5rem 0; }

.page-header {
  border-left: 4px solid var(--primary);
  padding-left: 1rem;
  margin-bottom: 1.5rem;
}
.page-header h1 {
  font-size: var(--font-2xl);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.notifications-filter {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1.25rem;
  border: 1px solid var(--gray-300);
  background: var(--white);
  border-radius: 50px;
  cursor: pointer;
  font-family: inherit;
  font-size: var(--font-sm);
  font-weight: 500;
  color: var(--gray-600);
  transition: all 0.2s;
}
.filter-btn:hover { border-color: var(--primary); color: var(--primary); }
.filter-btn.active { background: var(--primary); color: var(--white); border-color: var(--primary); }

.notifications-list { display: flex; flex-direction: column; gap: 0.75rem; }

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  position: relative;
  border-left: 3px solid transparent;
  transition: box-shadow 0.2s;
}
.notification-item:hover { box-shadow: var(--shadow-lg); }
.notification-item.exam     { border-left-color: var(--danger); }
.notification-item.schedule { border-left-color: var(--info); }
.notification-item.grade    { border-left-color: var(--success); }

.notification-icon { font-size: 1.5rem; flex-shrink: 0; }

.notification-content { flex: 1; min-width: 0; }
.notification-content h4 { margin: 0 0 0.375rem; font-size: var(--font-base); color: var(--text); }
.notification-content p { margin: 0 0 0.375rem; color: var(--gray-600); font-size: var(--font-sm); }
.notification-date { font-size: var(--font-xs); color: var(--gray-500); }

.unread-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--primary);
  flex-shrink: 0;
  margin-top: 0.375rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--gray-500);
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

@media (max-width: 480px) {
  .notifications-page { padding: 1rem 0; }
  .notification-item { padding: 1rem; gap: 0.75rem; }
  .notification-icon { font-size: 1.25rem; }
}
</style>
