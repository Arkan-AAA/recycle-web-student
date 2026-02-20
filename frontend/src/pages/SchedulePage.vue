<template>
  <div class="schedule-page">
    <div class="container">
      <h1>Расписание</h1>
      <div class="schedule-content">
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
.schedule-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.day-column {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.lesson {
  margin: 1rem 0;
  padding: 0.5rem;
  border-left: 3px solid #3498db;
  background: #f8f9fa;
}

.lesson-time {
  font-weight: bold;
  color: #2c3e50;
}

.lesson-subject {
  margin: 0.25rem 0;
}

.lesson-room {
  font-size: 0.9em;
  color: #666;
}
</style>