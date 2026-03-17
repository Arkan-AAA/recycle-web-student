<template>
  <div class="journal-page">
    <div class="breadcrumb">{{ $t('journal.breadcrumb') }}</div>
    <h1>{{ $t('journal.title') }}</h1>

    <div class="tabs">
      <button :class="['tab', { active: isOpen }]" @click="isOpen = true">{{ $t('journal.open') }}</button>
      <button :class="['tab', { active: !isOpen }]" @click="isOpen = false">{{ $t('journal.closed') }}</button>
    </div>

    <button class="filter-btn">{{ $t('journal.filter') }}</button>

    <div class="count">{{ $t('journal.count') }} {{ journals.length }}</div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>{{ $t('journal.cols.num') }}</th>
            <th>{{ $t('journal.cols.name') }}</th>
            <th>{{ $t('journal.cols.type') }}</th>
            <th>{{ $t('journal.cols.journalType') }}</th>
            <th>{{ $t('journal.cols.program') }}</th>
            <th>{{ $t('journal.cols.modules') }}</th>
            <th>{{ $t('journal.cols.group') }}</th>
            <th>{{ $t('journal.cols.discipline') }}</th>
            <th>{{ $t('journal.cols.teacher') }}</th>
            <th>{{ $t('journal.cols.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading"><td colspan="10" class="center">{{ $t('journal.loading') }}</td></tr>
          <tr v-else-if="!journals.length"><td colspan="10" class="center">{{ $t('journal.noData') }}</td></tr>
          <tr v-for="(j, i) in journals" :key="j.id">
            <td>{{ i + 1 }}</td>
            <td>{{ j.name }}</td>
            <td>{{ j.type }}</td>
            <td>{{ j.journalType }}</td>
            <td>{{ j.program }}</td>
            <td>{{ j.module || '' }}</td>
            <td>{{ j.group }}</td>
            <td>{{ j.discipline }}</td>
            <td>{{ j.teacher }}</td>
            <td>
              <button class="view-btn" @click="$router.push(`/journal/${j.id}`)">&#128065;</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import apiService from '../services/api.service';
import authService from '../services/auth.service';

export default {
  name: 'JournalPageNew',
  data() {
    return { journals: [], isOpen: true, loading: false };
  },
  watch: {
    isOpen() { this.load(); }
  },
  mounted() { this.load(); },
  methods: {
    async load() {
      this.loading = true;
      try {
        const res = await apiService.get(`/journals?isOpen=${this.isOpen}`);
        this.journals = res.success ? res.data : [];
      } catch {
        this.journals = this.fallback();
      } finally {
        this.loading = false;
      }
    },
    fallback() {
      const user = authService.getUser();
      const group = user?.studentGroup || 'БК-332';
      const open = [
        { id: 1, name: 'Учебная практика', type: 'Производственное обучение', journalType: 'Обычный', program: 'Линейное обучение', module: '', group, discipline: 'Компьютерные сети и сетевое администрирование', teacher: 'Жанысбай Нұрбақыт Рахатұлы' },
        { id: 2, name: 'Учебная практика', type: 'Производственное обучение', journalType: 'Обычный', program: 'Линейное обучение', module: '', group, discipline: 'Программирование на языках высокого уровня', teacher: 'Жанысбай Нұрбақыт Рахатұлы' },
        { id: 3, name: 'Учебная практика', type: 'Производственное обучение', journalType: 'Обычный', program: 'Линейное обучение', module: '', group, discipline: 'Разработка мобильных приложений', teacher: 'Жанысбай Нұрбақыт Рахатұлы' },
        { id: 4, name: 'Учебная практика', type: 'Производственное обучение', journalType: 'Обычный', program: 'Линейное обучение', module: '', group, discipline: 'Программирование микроконтроллеров', teacher: 'Жубанов Айбек Нурланович' },
        { id: 5, name: 'Учебная практика', type: 'Производственное обучение', journalType: 'Обычный', program: 'Линейное обучение', module: '', group, discipline: 'Технология программирования', teacher: 'Жанысбай Нұрбақыт Рахатұлы' },
      ];
      const closed = [
        { id: 6, name: 'Дене шынықтыру', type: 'Теоретическое обучение', journalType: 'Обычный', program: 'Модульное обучение', module: 'ООД-14 - Физическая культура', group, discipline: 'Физическая культура', teacher: 'Базарбай Ғаламат Ғалымбекұлы' },
        { id: 7, name: 'Ақпаратты қорғау әдістері', type: 'Производственное обучение', journalType: 'Обычный', program: 'Модульное обучение', module: 'ПМ-40 - Методы защиты информации', group, discipline: 'Методы защиты информации', teacher: 'Аманбек Садықбек Жеңісбекұлы' },
        { id: 8, name: 'Компьютерлік желілер және желілік әкімшелендіру', type: 'Теоретическое обучение', journalType: 'Обычный', program: 'Модульное обучение', module: 'ПМ-37 - Компьютерные сети', group, discipline: 'Компьютерные сети и сетевое администрирование', teacher: 'Шалбаев Темирлан Арматович' },
        { id: 9, name: 'Өндірістік және экономикалық процестерді модельдеу', type: 'Теоретическое обучение', journalType: 'Обычный', program: 'Модульное обучение', module: 'ПМ-41 - Моделирование', group, discipline: 'Моделирование производственных и экономических процессов', teacher: 'Байбалаева Ақбаян Еркінқызы' },
        { id: 10, name: 'Жоғары деңгейлі тілдерде бағдарламалау', type: 'Теоретическое обучение', journalType: 'Обычный', program: 'Модульное обучение', module: 'ПМ-39 - Программирование', group, discipline: 'Программирование на языке высокого уровня', teacher: 'Елубай Ерасыл Жасұзақұлы' },
      ];
      return this.isOpen ? open : closed;
    }
  }
};
</script>

<style scoped>
.journal-page { padding: 2rem; font-family: sans-serif; }
.breadcrumb { color: #666; font-size: 13px; margin-bottom: 0.5rem; }
h1 { font-size: 22px; font-weight: 700; margin-bottom: 1.5rem; }

.tabs { display: flex; border-bottom: 2px solid #ddd; margin-bottom: 1.5rem; }
.tab {
  padding: 0.6rem 1.5rem;
  border: none; background: none; cursor: pointer;
  font-size: 14px; color: #555; border-bottom: 3px solid transparent; margin-bottom: -2px;
}
.tab.active { color: #2c5fad; border-bottom-color: #2c5fad; font-weight: 600; }

.filter-btn {
  background: #2c5fad; color: white; border: none;
  padding: 0.5rem 1.2rem; border-radius: 4px; cursor: pointer; font-size: 14px;
  margin-bottom: 1rem;
}

.count { font-weight: 600; font-size: 14px; margin-bottom: 0.75rem; }

.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 13px; }
thead tr { background: #7a8ba8; color: white; }
th { padding: 0.6rem 0.75rem; text-align: center; font-weight: 500; white-space: nowrap; }
td { padding: 0.6rem 0.75rem; border-bottom: 1px solid #e0e0e0; vertical-align: middle; }
tbody tr:nth-child(even) { background: #f7f8fa; }
tbody tr:hover { background: #eef2f8; }

.view-btn {
  background: white; border: 1px solid #ccc; border-radius: 4px;
  padding: 0.3rem 0.6rem; cursor: pointer; font-size: 16px;
}
.view-btn:hover { background: #f0f0f0; }
.center { text-align: center; padding: 2rem; color: #888; }
</style>
