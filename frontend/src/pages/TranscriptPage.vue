<template>
  <div class="transcript-page">
    <div class="container">
      <h1>Академическая ведомость</h1>
      <div class="transcript-content">
        <div class="student-info">
          <h3>Информация о студенте</h3>
          <p><strong>ФИО:</strong> {{ studentInfo.name }}</p>
          <p><strong>Группа:</strong> {{ studentInfo.group }}</p>
          <p><strong>Курс:</strong> {{ studentInfo.course }}</p>
        </div>
        <div class="grades-table">
          <h3>Оценки по семестрам</h3>
          <table>
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
                <td>{{ grade.grade }}</td>
                <td>{{ grade.credits }}</td>
              </tr>
            </tbody>
          </table>
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
      studentInfo: {
        name: 'Иванов Иван Иванович',
        group: 'ИТ-21',
        course: '3 курс'
      },
      grades: [
        { id: 1, subject: 'Математика', semester: '1', grade: '5', credits: '4' },
        { id: 2, subject: 'Физика', semester: '1', grade: '4', credits: '3' },
        { id: 3, subject: 'Химия', semester: '2', grade: '5', credits: '3' }
      ]
    }
  }
}
</script>

<style scoped>
.transcript-content {
  margin-top: 2rem;
}

.student-info {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.grades-table {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
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
</style>