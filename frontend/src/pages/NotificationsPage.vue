<template>
  <div class="notifications-page">
    <div class="container">
      <h1>Учебные уведомления</h1>
      <div class="notifications-content">
        <div class="notifications-filter">
          <button 
            v-for="filter in filters" 
            :key="filter.value"
            @click="activeFilter = filter.value"
            :class="{ active: activeFilter === filter.value }"
            class="filter-btn"
          >
            {{ filter.label }}
          </button>
        </div>
        
        <div class="notifications-list">
          <div 
            v-for="notification in filteredNotifications" 
            :key="notification.id"
            class="notification-item"
            :class="notification.type"
          >
            <div class="notification-icon">{{ getIcon(notification.type) }}</div>
            <div class="notification-content">
              <h4>{{ notification.title }}</h4>
              <p>{{ notification.message }}</p>
              <span class="notification-date">{{ notification.date }}</span>
            </div>
            <div class="notification-status" v-if="!notification.read">●</div>
          </div>
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
        {
          id: 1,
          type: 'exam',
          title: 'Экзамен по математике',
          message: 'Экзамен назначен на 25 января в 9:00, аудитория 101',
          date: '2024-01-20',
          read: false
        },
        {
          id: 2,
          type: 'schedule',
          title: 'Изменение в расписании',
          message: 'Занятие по физике перенесено на 14:00',
          date: '2024-01-19',
          read: true
        },
        {
          id: 3,
          type: 'grade',
          title: 'Новая оценка',
          message: 'Получена оценка 5 за контрольную по химии',
          date: '2024-01-18',
          read: false
        }
      ]
    }
  },
  computed: {
    filteredNotifications() {
      if (this.activeFilter === 'all') {
        return this.notifications;
      }
      return this.notifications.filter(n => n.type === this.activeFilter);
    }
  },
  methods: {
    getIcon(type) {
      const icons = {
        exam: '📝',
        schedule: '📅',
        grade: '📊'
      };
      return icons[type] || '📢';
    }
  }
}
</script>

<style scoped>
.notifications-content {
  margin-top: 2rem;
}

.notifications-filter {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: relative;
}

.notification-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
}

.notification-content h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.notification-content p {
  margin: 0 0 0.5rem 0;
  color: #666;
}

.notification-date {
  font-size: 0.9em;
  color: #999;
}

.notification-status {
  color: #3498db;
  font-size: 1.2rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>