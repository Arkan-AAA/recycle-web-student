<template>
  <div class="grades-page">
    <div class="container">
      <h1>{{ $t('grades.title') }}</h1>
      <div class="grades-content">
        <div class="subject-grades" v-for="subject in subjects" :key="subject.id">
          <h3>{{ subject.name }}</h3>
          <div class="grades-list">
            <div class="grade-item" v-for="grade in subject.grades" :key="grade.id">
              <span class="grade-type">{{ grade.type }}</span>
              <span class="grade-value" :class="getGradeClass(grade.value)">{{ grade.value }}</span>
              <span class="grade-date">{{ grade.date }}</span>
            </div>
          </div>
          <div class="average">{{ $t('grades.average') }} {{ subject.average }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GradesPage',
  data() {
    return {
      subjects: [
        {
          id: 1,
          name: 'Математика',
          average: 4.5,
          grades: [
            { id: 1, type: 'Контрольная', value: 5, date: '2024-01-15' },
            { id: 2, type: 'Тест', value: 4, date: '2024-01-20' }
          ]
        },
        {
          id: 2,
          name: 'Физика',
          average: 4.0,
          grades: [
            { id: 3, type: 'Лабораторная', value: 4, date: '2024-01-18' },
            { id: 4, type: 'Экзамен', value: 4, date: '2024-01-25' }
          ]
        }
      ]
    }
  },
  methods: {
    getGradeClass(value) {
      if (value >= 5) return 'excellent';
      if (value >= 4) return 'good';
      if (value >= 3) return 'satisfactory';
      return 'unsatisfactory';
    }
  }
}
</script>

<style scoped>
.grades-content {
  margin-top: 2rem;
}

.subject-grades {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.grades-list {
  margin: 1rem 0;
}

.grade-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.grade-value {
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.excellent { background: #d4edda; color: #155724; }
.good { background: #cce5ff; color: #004085; }
.satisfactory { background: #fff3cd; color: #856404; }
.unsatisfactory { background: #f8d7da; color: #721c24; }

.average {
  font-weight: bold;
  color: #2c3e50;
  margin-top: 1rem;
}
</style>