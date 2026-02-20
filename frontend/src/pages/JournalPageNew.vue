<template>
  <div class="journal-page">
    <div class="container">
      <h1>ЖУРНАЛ</h1>
      <router-link to="/home" class="back-link">← главная страница</router-link>
      
      <div class="count-label">Количество:</div>

      <div class="subjects-table">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Название Дисциплины</th>
              <th>Группа</th>
              <th>Преподаватель</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(subject, index) in subjects" :key="subject.id">
              <td>{{ index + 1 }}</td>
              <td>
                <router-link 
                  :to="`/journal/${subject.id}`"
                  class="subject-link"
                >
                  {{ subject.name }}
                </router-link>
              </td>
              <td>{{ subject.group || 'БК-331' }}</td>
              <td>{{ subject.teacher }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JournalPageNew',
  data() {
    return {
      subjects: []
    }
  },
  async mounted() {
    await this.loadSubjects();
  },
  methods: {
    async loadSubjects() {
      const currentUserGroup = 'БК-331'; // Получать из профиля пользователя
      
      const allSubjects = [
        // БК-331
        { id: 1, name: 'Жоғары деңгейлі тілдерде бағдарламалау', teacher: 'Нұрбахыт Жанысбай', group: 'БК-331' },
        { id: 2, name: 'Мобильді қосымшаларды әзірлеу', teacher: 'Нұрбахыт Жанысбай', group: 'БК-331' },
        { id: 3, name: 'Бағдарламалау технологиясы', teacher: 'Нұрбахыт Жанысбай', group: 'БК-331' },
        { id: 4, name: 'Микроконтроллерді бағдарламалау', teacher: 'Айбек Жұбанов', group: 'БК-331' },
        { id: 5, name: 'Компьютерлік желілер мен желілік басқару', teacher: 'Нұрбахыт Жанысбай', group: 'БК-331' },
        
        // БК-332
        { id: 6, name: 'Мобильді қосымшаларды әзірлеу', teacher: 'Нұрбахыт Жанысбай', group: 'БК-332' },
        { id: 7, name: 'Бағдарламалау технологиясы', teacher: 'Нұрбахыт Жанысбай', group: 'БК-332' },
        { id: 8, name: 'Компьютерлік желілер мен желілік басқару', teacher: 'Нұрбахыт Жанысбай', group: 'БК-332' },
        { id: 9, name: 'Жоғары деңгейлі тілдерде бағдарламалау', teacher: 'Нұрбахыт Жанысбай', group: 'БК-332' },
        { id: 10, name: 'Микроконтроллерді бағдарламалау', teacher: 'Айбек Жұбанов', group: 'БК-332' }
      ];
      
      this.subjects = allSubjects.filter(subject => subject.group === currentUserGroup);
    }
  }
}
</script>

<style scoped>
.journal-page {
  padding: 2rem;
}

h1 {
  color: #d3392c;
  font-size: 24px;
  margin-bottom: 0.5rem;
}

.back-link {
  color: #cbcbcb;
  text-decoration: none;
  margin-bottom: 2rem;
  display: inline-block;
}

.count-label {
  margin-bottom: 1rem;
  font-weight: bold;
}

.subjects-table {
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #efefef;
}

th {
  background: #e0e0e0;
  padding: 1rem;
  text-align: left;
  border: 1px solid #ccc;
  font-weight: bold;
}

td {
  padding: 1rem;
  border: 1px solid #ccc;
  background: white;
}

.subject-link {
  color: #3498db;
  text-decoration: none;
}

.subject-link:hover {
  text-decoration: underline;
}
</style>