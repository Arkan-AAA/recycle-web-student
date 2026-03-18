<template>
  <div class="schedule-page">
    <div class="container">
      <div class="page-header">
        <h1>{{ $t('schedule.title') }}</h1>
      </div>
        <div class="schedule-grid">
          <div class="day-column" v-for="day in schedule" :key="day.name">
            <h3>{{ day.name }}</h3>
            <div class="lesson" v-for="lesson in day.lessons" :key="lesson.time">
              <div class="lesson-time">{{ lesson.time }}</div>
              <div class="lesson-subject">{{ lesson.subject }}</div>
              <div class="lesson-room">{{ lesson.room }}</div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SchedulePage',
  data() {
    return {
      schedule: [
        {
          name: 'Понедельник',
          lessons: [
            { time: '9:00', subject: 'Математика', room: 'Ауд. 101' },
            { time: '10:30', subject: 'Физика', room: 'Ауд. 205' }
          ]
        },
        {
          name: 'Вторник',
          lessons: [
            { time: '9:00', subject: 'Химия', room: 'Ауд. 301' },
            { time: '10:30', subject: 'История', room: 'Ауд. 102' }
          ]
        },
        {
          name: 'Среда',
          lessons: [
            { time: '9:00', subject: 'Литература', room: 'Ауд. 103' },
            { time: '10:30', subject: 'Английский', room: 'Ауд. 201' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.schedule-page { padding: 1.5rem 0; }

.schedule-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.day-column {
  background: var(--white);
  border-radius: var(--radius);
  padding: 1.25rem;
  box-shadow: var(--shadow);
}

.day-column h3 {
  font-size: var(--font-base);
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.lesson {
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  border-left: 3px solid var(--primary);
  background: var(--gray-100);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.lesson-time { font-weight: 600; color: var(--text); font-size: var(--font-sm); }
.lesson-subject { margin: 0.25rem 0; font-size: var(--font-sm); color: var(--text); }
.lesson-room { font-size: var(--font-xs); color: var(--gray-500); }

@media (max-width: 768px) {
  .schedule-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .schedule-grid { grid-template-columns: 1fr; }
  .schedule-page { padding: 1rem 0; }
}
</style>