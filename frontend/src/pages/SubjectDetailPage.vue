<template>
  <div class="subject-detail-page">
    <div class="container">
      <router-link to="/journal" class="back-link">← Назад к журналу</router-link>
      
      <div v-if="subject" class="subject-details">
        <h1>{{ subject.name }}</h1>
        
        <div class="subject-info-card">
          <h3>Информация о дисциплине</h3>
          <div class="info-grid">
            <div class="info-item">
              <label>Преподаватель:</label>
              <span>{{ subject.teacher }}</span>
            </div>
            <div class="info-item">
              <label>Семестр:</label>
              <span>{{ subject.semester }}</span>
            </div>
            <div class="info-item">
              <label>Кредиты:</label>
              <span>{{ subject.credits }}</span>
            </div>
          </div>
          <div v-if="subject.description" class="description">
            <label>Описание:</label>
            <p>{{ subject.description }}</p>
          </div>
        </div>

        <div class="grades-section">
          <h3>Оценки</h3>
          <table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Тип работы</th>
                <th>Оценка</th>
                <th>Комментарий</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="grade in grades" :key="grade.id">
                <td>{{ grade.date }}</td>
                <td>{{ grade.type }}</td>
                <td>{{ grade.value }}</td>
                <td>{{ grade.comment }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div v-else class="loading">
        Загрузка...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubjectDetailPage',
  data() {
    return {
      subject: null,
      grades: []
    }
  },
  async mounted() {
    await this.loadSubject();
    await this.loadGrades();
  },
  methods: {
    async loadSubject() {
      try {
        const response = await fetch(`/api/subjects/${this.$route.params.id}`);
        this.subject = await response.json();
      } catch (error) {
        this.subject = {
          id: 1,
          name: 'Математика',
          teacher: 'Иванов И.И.',
          semester: 1,
          credits: 4,
          description: 'Основы математического анализа и алгебры'
        };
      }
    },
    async loadGrades() {
      this.grades = [
        { id: 1, date: '2024-01-15', type: 'Контрольная', value: 5, comment: 'Отлично' },
        { id: 2, date: '2024-01-20', type: 'Тест', value: 4, comment: 'Хорошо' },
        { id: 3, date: '2024-01-25', type: 'Лабораторная', value: 5, comment: 'Отлично' }
      ];
    }
  }
}
</script>

<style scoped>
.subject-detail-page {
  padding: 2rem;
}

.back-link {
  color: #666;
  text-decoration: none;
  margin-bottom: 2rem;
  display: inline-block;
}

.subject-details h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.subject-info-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.info-grid {
  display: grid;
  gap: 1rem;
  margin: 1rem 0;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.info-item label {
  font-weight: bold;
}

.description {
  margin-top: 1rem;
}

.description label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

.grades-section {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style>