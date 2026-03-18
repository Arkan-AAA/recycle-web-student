<template>
  <div class="journal-page">
    <div class="breadcrumb">{{ $t('journal.breadcrumb') }}</div>
    <h1>{{ $t('journal.title') }}</h1>

    <div class="tabs">
      <button :class="['tab', { active: isOpen }]" @click="isOpen = true">{{ $t('journal.open') }}</button>
      <button :class="['tab', { active: !isOpen }]" @click="isOpen = false">{{ $t('journal.closed') }}</button>
    </div>

    <div class="toolbar">
      <span class="count">{{ $t('journal.count') }} <strong>{{ journals.length }}</strong></span>
    </div>

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
            <td class="num">{{ i + 1 }}</td>
            <td>{{ j.name }}</td>
            <td><span class="badge">{{ j.type }}</span></td>
            <td>{{ j.journalType }}</td>
            <td>{{ j.program }}</td>
            <td>{{ j.module || '—' }}</td>
            <td><strong>{{ j.group }}</strong></td>
            <td>{{ j.discipline }}</td>
            <td>{{ j.teacher }}</td>
            <td>
              <button class="view-btn" @click="$router.push(`/journal/${j.id}`)">
                <span>👁</span> Открыть
              </button>
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
        this.journals = res.success ? res.data : this.fallback();
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
.journal-page {
  padding: 2rem;
  font-family: 'Rubik', sans-serif;
  background: var(--bg-page);
  min-height: 100vh;
  transition: background 0.3s;
}

.breadcrumb {
  font-size: 13px;
  color: var(--text-hint);
  margin-bottom: 0.5rem;
}

h1 {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-left: 4px solid #d50032;
  padding-left: 12px;
}

.tabs {
  display: flex;
  border-bottom: 2px solid var(--border-color);
  margin-bottom: 1.5rem;
}

.tab {
  padding: 0.65rem 2rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-hint);
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  transition: all 0.2s;
  font-family: 'Rubik', sans-serif;
}

.tab:hover { color: var(--text-primary); }
.tab.active {
  color: #d50032;
  border-bottom-color: #d50032;
  font-weight: 600;
}

.toolbar {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.count {
  font-size: 14px;
  color: var(--text-secondary);
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0.4rem 1rem;
}

.count strong { color: #d50032; }

.table-wrap { overflow-x: auto; border-radius: 8px; box-shadow: var(--shadow); }

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  background: var(--bg-card);
  transition: background 0.3s;
}

thead tr {
  background: #1e1e1e;
  color: #fff;
}

th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 500;
  white-space: nowrap;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  vertical-align: middle;
  color: var(--text-primary);
}

tbody tr:hover { background: var(--bg-input); }

.num {
  color: var(--text-hint);
  font-size: 12px;
  text-align: center;
}

.badge {
  background: var(--bg-input);
  color: var(--text-secondary);
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  white-space: nowrap;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: #d50032;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.9rem;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: background 0.2s;
  white-space: nowrap;
  font-family: 'Rubik', sans-serif;
}

.view-btn:hover { background: #b8002a; }

.center {
  text-align: center;
  padding: 3rem;
  color: var(--text-hint);
  font-size: 14px;
}
</style>
