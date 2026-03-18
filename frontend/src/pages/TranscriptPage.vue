<template>
  <div class="transcript-page">
    <div class="container">
      <div class="page-header">
        <h1>Академическая ведомость</h1>
      </div>

      <div class="student-info card">
        <div class="card-body">
          <h3>Информация о студенте</h3>
          <div class="info-grid">
            <div class="info-item"><label>ФИО:</label><span>{{ studentInfo.name }}</span></div>
            <div class="info-item"><label>Группа:</label><span>{{ studentInfo.group }}</span></div>
            <div class="info-item"><label>Курс:</label><span>{{ studentInfo.course }}</span></div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <h3>Оценки по семестрам</h3>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Предмет</th>
                  <th>Семестр</th>
                  <th>Оценка</th>
                  <th>Кредиты</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="grade in grades" :key="grade.id">
                  <td>{{ grade.subject }}</td>
                  <td>{{ grade.semester }}</td>
                  <td><span class="grade-badge" :class="getGradeClass(grade.grade)">{{ grade.grade }}</span></td>
                  <td>{{ grade.credits }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TranscriptPage',
  data() {
    return {
      studentInfo: { name: 'Иванов Иван Иванович', group: 'ИТ-21', course: '3 курс' },
      grades: [
        { id: 1, subject: 'Математика', semester: '1', grade: '5', credits: '4' },
        { id: 2, subject: 'Физика', semester: '1', grade: '4', credits: '3' },
        { id: 3, subject: 'Химия', semester: '2', grade: '5', credits: '3' }
      ]
    }
  },
  methods: {
    getGradeClass(grade) {
      const g = parseInt(grade);
      if (g === 5) return 'excellent';
      if (g === 4) return 'good';
      if (g === 3) return 'satisfactory';
      return 'unsatisfactory';
    }
  }
}
</script>

<style scoped>
.transcript-page { padding: 1.5rem 0; }

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

.student-info { margin-bottom: 1.5rem; }

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.info-item label { font-weight: 600; font-size: var(--font-sm); color: var(--gray-600); }
.info-item span { font-size: var(--font-base); color: var(--text); }

.grade-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: var(--font-sm);
}
.excellent { background: #d4edda; color: #155724; }
.good      { background: #cce5ff; color: #004085; }
.satisfactory { background: #fff3cd; color: #856404; }
.unsatisfactory { background: #f8d7da; color: #721c24; }

@media (max-width: 480px) {
  .transcript-page { padding: 1rem 0; }
  .info-grid { grid-template-columns: 1fr; }
}
</style>
