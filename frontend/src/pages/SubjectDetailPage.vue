<template>
  <div class="detail-page">
    <div class="breadcrumb">Главная &rsaquo; Список журналов &rsaquo; <span class="current">Журнал</span></div>

    <h1>
      <span class="back" @click="$router.push('/journal')">&#8592;</span>
      Журнал — {{ journal.name || '...' }}
    </h1>

    <table class="info-table">
      <tr><td class="label">Тип журнала:</td><td>{{ journal.journalType }}</td></tr>
      <tr><td class="label">Тип:</td><td>{{ journal.type }}</td></tr>
      <tr><td class="label">Группа (Подгруппа):</td><td>{{ journal.group }}</td></tr>
      <tr><td class="label">Вид оценки:</td><td>{{ journal.gradeType }}</td></tr>
      <tr><td class="label">Отведено часов:</td><td>{{ journal.hours }} ({{ journal.hours }}.0)</td></tr>
      <tr><td class="label">Преподаватели:</td><td>{{ journal.teacher }} ({{ journal.hours }})</td></tr>
      <tr><td class="label">Предмет:</td><td>{{ journal.discipline }}</td></tr>
    </table>

    <div class="semester-select">
      <select v-model="semester" @change="loadGrades">
        <option value="1">Семестр 1</option>
        <option value="2">Семестр 2</option>
      </select>
    </div>

    <div class="grades-wrap" v-if="dates.length">
      <table class="grades-table">
        <thead>
          <tr>
            <th class="label-col">Дата</th>
            <th v-for="d in dates" :key="d">{{ formatDate(d) }}</th>
          </tr>
          <tr class="red-line"><td :colspan="dates.length + 1"></td></tr>
        </thead>
        <tbody>
          <tr>
            <td class="label-col">Оценка</td>
            <td v-for="d in dates" :key="d" class="grade-cell">
              {{ gradeMap[d] !== undefined ? gradeMap[d] : '' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="!loading" class="no-grades">Оценок нет</div>
    <div v-if="loading" class="no-grades">Загрузка...</div>
  </div>
</template>

<script>
import apiService from '../services/api.service';

export default {
  name: 'SubjectDetailPage',
  data() {
    return {
      journal: {},
      grades: [],
      semester: 1,
      loading: false
    };
  },
  computed: {
    dates() {
      return this.grades.map(g => g.date).sort();
    },
    gradeMap() {
      const map = {};
      this.grades.forEach(g => { map[g.date] = g.value; });
      return map;
    }
  },
  async mounted() {
    await this.loadJournal();
    await this.loadGrades();
  },
  methods: {
    async loadJournal() {
      try {
        const res = await apiService.get(`/journals/${this.$route.params.id}`);
        this.journal = res.success ? res.data : this.fallbackJournal();
      } catch {
        this.journal = this.fallbackJournal();
      }
    },
    async loadGrades() {
      this.loading = true;
      try {
        const res = await apiService.get(`/journals/${this.$route.params.id}/grades?semester=${this.semester}`);
        this.grades = res.success ? res.data : this.fallbackGrades();
      } catch {
        this.grades = this.fallbackGrades();
      } finally {
        this.loading = false;
      }
    },
    formatDate(d) {
      const [, m, day] = d.split('-');
      return `${day}.${m}`;
    },
    fallbackJournal() {
      return { name: 'Учебная практика', type: 'Производственное обучение', journalType: 'Обычный', group: 'БК-332', gradeType: 'Процентная система (0-100)', hours: 72, teacher: 'Жанысбай Нұрбақыт Рахатұлы', discipline: 'Программирование на языках высокого уровня' };
    },
    fallbackGrades() {
      return [
        { date: '2025-02-05', value: 100 },
        { date: '2025-02-12', value: 100 },
        { date: '2025-02-25', value: 100 },
        { date: '2025-03-05', value: 100 },
        { date: '2025-03-16', value: 100 },
        { date: '2025-03-25', value: 100 },
      ];
    }
  }
};
</script>

<style scoped>
.detail-page { padding: 2rem; font-family: sans-serif; }
.breadcrumb { font-size: 13px; color: #666; margin-bottom: 1rem; }
.current { border: 1px solid #ccc; border-radius: 4px; padding: 2px 8px; }

h1 { font-size: 20px; font-weight: 700; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; }
.back { cursor: pointer; color: #2c5fad; font-size: 22px; }

.info-table { border-collapse: collapse; width: 100%; max-width: 700px; margin-bottom: 2rem; }
.info-table tr { border-bottom: 1px solid #e8eaf0; }
.info-table td { padding: 0.55rem 1rem; font-size: 14px; }
.info-table td.label { color: #7a8ba8; width: 200px; background: #f4f6fb; }

.semester-select select {
  padding: 0.4rem 1rem; border: 1px solid #ccc; border-radius: 4px;
  font-size: 14px; margin-bottom: 1.5rem; cursor: pointer;
}

.grades-wrap { overflow-x: auto; }
.grades-table { border-collapse: collapse; font-size: 13px; }
.grades-table th, .grades-table td {
  border: 1px solid #ddd; padding: 0.5rem 0.75rem; text-align: center; min-width: 52px;
}
.grades-table th { background: #f4f6fb; font-weight: 500; }
.label-col { text-align: left !important; font-weight: 600; background: #f4f6fb; min-width: 80px; }
.red-line td { height: 3px; background: #e53935; padding: 0; border: none; }
.grade-cell { font-weight: 600; }
.no-grades { color: #888; font-size: 14px; padding: 1rem 0; }
</style>
