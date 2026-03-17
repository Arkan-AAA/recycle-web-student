<template>
  <div class="detail-page">
    <div class="breadcrumb">
      <span @click="$router.push('/journal')" class="breadcrumb-link">Журнал</span>
      <span class="sep">›</span>
      <span class="current">{{ journal.discipline || '...' }}</span>
    </div>

    <div class="page-header">
      <button class="back-btn" @click="$router.push('/journal')">← Назад</button>
      <h1>{{ journal.discipline || 'Загрузка...' }}</h1>
    </div>

    <div class="info-cards">
      <div class="info-card">
        <span class="info-label">Тип журнала</span>
        <span class="info-value">{{ journal.journalType || '—' }}</span>
      </div>
      <div class="info-card">
        <span class="info-label">Тип</span>
        <span class="info-value">{{ journal.type || '—' }}</span>
      </div>
      <div class="info-card">
        <span class="info-label">Группа</span>
        <span class="info-value accent">{{ journal.group || '—' }}</span>
      </div>
      <div class="info-card">
        <span class="info-label">Преподаватель</span>
        <span class="info-value">{{ journal.teacher || '—' }}</span>
      </div>
      <div class="info-card">
        <span class="info-label">Часов</span>
        <span class="info-value">{{ journal.hours || '—' }}</span>
      </div>
      <div class="info-card">
        <span class="info-label">Вид оценки</span>
        <span class="info-value">{{ journal.gradeType || '—' }}</span>
      </div>
    </div>

    <div class="section-header">
      <h2>Оценки</h2>
      <div class="semester-tabs">
        <button :class="['sem-tab', { active: semester == 1 }]" @click="semester = 1; loadGrades()">Семестр 1</button>
        <button :class="['sem-tab', { active: semester == 2 }]" @click="semester = 2; loadGrades()">Семестр 2</button>
      </div>
      <button v-if="canEdit" class="add-btn" @click="showAddModal = true">+ Добавить оценку</button>
    </div>

    <div v-if="loading" class="state-msg">Загрузка...</div>
    <div v-else-if="!dates.length" class="state-msg">Оценок нет</div>

    <div v-else class="grades-wrap">
      <table class="grades-table">
        <thead>
          <tr>
            <th class="label-col">Дата</th>
            <th v-for="d in dates" :key="d">{{ formatDate(d) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label-col">Оценка</td>
            <td v-for="d in dates" :key="d" class="grade-cell">
              <span v-if="!canEdit" :class="gradeClass(gradeMap[d])">
                {{ gradeMap[d] !== undefined ? gradeMap[d] : '—' }}
              </span>
              <div v-else class="grade-edit-wrap">
                <span :class="gradeClass(gradeMap[d])">{{ gradeMap[d] !== undefined ? gradeMap[d] : '—' }}</span>
                <button class="edit-grade-btn" @click="openEdit(d, gradeMap[d])">✏️</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Модал добавления оценки -->
    <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false">
      <div class="modal">
        <h3>Добавить оценку</h3>
        <div class="form-group">
          <label>Дата</label>
          <input type="date" v-model="addForm.date" />
        </div>
        <div class="form-group">
          <label>Оценка (1–5)</label>
          <div class="grade-picker">
            <button
              v-for="n in [1,2,3,4,5]" :key="n"
              :class="['grade-pick-btn', { selected: addForm.value === n }]"
              @click="addForm.value = n"
            >{{ n }}</button>
          </div>
        </div>
        <div v-if="addError" class="form-error">{{ addError }}</div>
        <div class="modal-actions">
          <button class="btn-cancel" @click="showAddModal = false">Отмена</button>
          <button class="btn-save" @click="saveGrade" :disabled="saving">
            {{ saving ? 'Сохранение...' : 'Сохранить' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Модал редактирования оценки -->
    <div v-if="showEditModal" class="modal-overlay" @click.self="showEditModal = false">
      <div class="modal">
        <h3>Изменить оценку — {{ formatDate(editForm.date) }}</h3>
        <div class="form-group">
          <label>Оценка (1–5)</label>
          <div class="grade-picker">
            <button
              v-for="n in [1,2,3,4,5]" :key="n"
              :class="['grade-pick-btn', { selected: editForm.value === n }]"
              @click="editForm.value = n"
            >{{ n }}</button>
          </div>
        </div>
        <div v-if="editError" class="form-error">{{ editError }}</div>
        <div class="modal-actions">
          <button class="btn-cancel" @click="showEditModal = false">Отмена</button>
          <button class="btn-save" @click="updateGrade" :disabled="saving">
            {{ saving ? 'Сохранение...' : 'Сохранить' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '../services/api.service';
import authService from '../services/auth.service';

export default {
  name: 'SubjectDetailPage',
  data() {
    return {
      journal: {},
      grades: [],
      semester: 1,
      loading: false,
      showAddModal: false,
      showEditModal: false,
      saving: false,
      addError: '',
      editError: '',
      addForm: { date: new Date().toISOString().slice(0, 10), value: null },
      editForm: { date: '', value: null }
    };
  },
  computed: {
    canEdit() {
      const role = authService.getUserRole();
      return role === 'admin' || role === 'teacher';
    },
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
    async saveGrade() {
      this.addError = '';
      if (!this.addForm.date) { this.addError = 'Укажите дату'; return; }
      if (!this.addForm.value) { this.addError = 'Выберите оценку'; return; }
      this.saving = true;
      try {
        const res = await apiService.post(`/journals/${this.$route.params.id}/grades`, {
          date: this.addForm.date,
          value: this.addForm.value,
          semester: this.semester
        });
        if (res.success) {
          this.showAddModal = false;
          this.addForm = { date: new Date().toISOString().slice(0, 10), value: null };
          await this.loadGrades();
        } else {
          this.addError = res.error || 'Ошибка сохранения';
        }
      } catch {
        this.addError = 'Ошибка подключения';
      } finally {
        this.saving = false;
      }
    },
    openEdit(date, value) {
      this.editForm = { date, value };
      this.editError = '';
      this.showEditModal = true;
    },
    async updateGrade() {
      this.editError = '';
      if (!this.editForm.value) { this.editError = 'Выберите оценку'; return; }
      this.saving = true;
      try {
        const res = await apiService.post(`/journals/${this.$route.params.id}/grades`, {
          date: this.editForm.date,
          value: this.editForm.value,
          semester: this.semester
        });
        if (res.success) {
          this.showEditModal = false;
          await this.loadGrades();
        } else {
          this.editError = res.error || 'Ошибка сохранения';
        }
      } catch {
        this.editError = 'Ошибка подключения';
      } finally {
        this.saving = false;
      }
    },
    formatDate(d) {
      if (!d) return '';
      const [, m, day] = d.split('-');
      return `${day}.${m}`;
    },
    gradeClass(val) {
      if (val === undefined || val === null) return 'grade-empty';
      if (val >= 90) return 'grade-excellent';
      if (val >= 75) return 'grade-good';
      if (val >= 60) return 'grade-ok';
      if (val >= 5) return 'grade-ok';
      if (val === 5) return 'grade-excellent';
      if (val === 4) return 'grade-good';
      if (val === 3) return 'grade-ok';
      return 'grade-bad';
    },
    fallbackJournal() {
      return { name: 'Учебная практика', type: 'Производственное обучение', journalType: 'Обычный', group: 'БК-332', gradeType: 'Процентная система (0-100)', hours: 72, teacher: 'Жанысбай Нұрбақыт Рахатұлы', discipline: 'Программирование на языках высокого уровня' };
    },
    fallbackGrades() {
      return [
        { date: '2025-02-05', value: 100 },
        { date: '2025-02-12', value: 95 },
        { date: '2025-02-25', value: 88 },
        { date: '2025-03-05', value: 72 },
        { date: '2025-03-16', value: 55 },
        { date: '2025-03-25', value: 100 },
      ];
    }
  }
};
</script>

<style scoped>
.detail-page {
  padding: 2rem;
  font-family: 'Rubik', sans-serif;
  background: #f9f9f9;
  min-height: 100vh;
}

.breadcrumb {
  font-size: 13px;
  color: #999;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.breadcrumb-link {
  cursor: pointer;
  color: #d50032;
}

.breadcrumb-link:hover { text-decoration: underline; }
.sep { color: #ccc; }
.current {
  background: #f0f0f0;
  border-radius: 4px;
  padding: 2px 8px;
  color: #555;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.back-btn {
  background: #1e1e1e;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 13px;
  font-family: 'Rubik', sans-serif;
  transition: background 0.2s;
  white-space: nowrap;
}

.back-btn:hover { background: #333; }

h1 {
  font-size: 20px;
  font-weight: 700;
  color: #1e1e1e;
  border-left: 4px solid #d50032;
  padding-left: 12px;
  margin: 0;
}

.info-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 2rem;
}

.info-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 160px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.info-label {
  font-size: 11px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 14px;
  font-weight: 500;
  color: #1e1e1e;
}

.info-value.accent { color: #d50032; }

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.section-header h2 {
  font-size: 16px;
  font-weight: 700;
  color: #1e1e1e;
  margin: 0;
}

.semester-tabs {
  display: flex;
  gap: 4px;
}

.sem-tab {
  padding: 0.4rem 1rem;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #555;
  font-family: 'Rubik', sans-serif;
  transition: all 0.2s;
}

.sem-tab:hover { border-color: #d50032; color: #d50032; }
.sem-tab.active {
  background: #d50032;
  border-color: #d50032;
  color: #fff;
  font-weight: 600;
}

.add-btn {
  margin-left: auto;
  background: #d50032;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  font-family: 'Rubik', sans-serif;
  transition: background 0.2s;
}

.add-btn:hover { background: #b8002a; }

.state-msg {
  color: #aaa;
  font-size: 14px;
  padding: 2rem 0;
  text-align: center;
}

.grades-wrap { overflow-x: auto; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.07); }

.grades-table {
  border-collapse: collapse;
  font-size: 13px;
  background: #fff;
  min-width: 100%;
}

.grades-table th {
  background: #1e1e1e;
  color: #fff;
  padding: 0.65rem 1rem;
  text-align: center;
  font-weight: 500;
  font-size: 12px;
  white-space: nowrap;
}

.grades-table td {
  border: 1px solid #f0f0f0;
  padding: 0.65rem 1rem;
  text-align: center;
  min-width: 60px;
}

.label-col {
  text-align: left !important;
  font-weight: 600;
  background: #f9f9f9;
  color: #555;
  min-width: 90px;
  white-space: nowrap;
}

.grade-edit-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.edit-grade-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  opacity: 0.5;
  transition: opacity 0.2s;
  padding: 0;
}

.edit-grade-btn:hover { opacity: 1; }

.grade-excellent { color: #1a7a3c; font-weight: 700; }
.grade-good { color: #2563eb; font-weight: 700; }
.grade-ok { color: #d97706; font-weight: 700; }
.grade-bad { color: #d50032; font-weight: 700; }
.grade-empty { color: #ccc; }

/* Модал */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  width: 360px;
  max-width: 90vw;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
}

.modal h3 {
  font-size: 16px;
  font-weight: 700;
  color: #1e1e1e;
  margin: 0 0 1.5rem;
  border-left: 3px solid #d50032;
  padding-left: 10px;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-size: 12px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

.form-group input[type="date"] {
  width: 100%;
  padding: 0.6rem 0.9rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Rubik', sans-serif;
  box-sizing: border-box;
}

.form-group input[type="date"]:focus {
  outline: 2px solid #d50032;
  border-color: #d50032;
}

.grade-picker {
  display: flex;
  gap: 8px;
}

.grade-pick-btn {
  flex: 1;
  padding: 0.65rem;
  border: 2px solid #e0e0e0;
  background: #fff;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  color: #555;
  transition: all 0.15s;
  font-family: 'Rubik', sans-serif;
}

.grade-pick-btn:hover { border-color: #d50032; color: #d50032; }
.grade-pick-btn.selected {
  background: #d50032;
  border-color: #d50032;
  color: #fff;
}

.form-error {
  color: #d50032;
  font-size: 13px;
  margin-bottom: 1rem;
  padding: 0.5rem 0.75rem;
  background: rgba(213,0,50,0.07);
  border-radius: 6px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn-cancel {
  padding: 0.6rem 1.4rem;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #555;
  font-family: 'Rubik', sans-serif;
  transition: background 0.2s;
}

.btn-cancel:hover { background: #f5f5f5; }

.btn-save {
  padding: 0.6rem 1.4rem;
  background: #d50032;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Rubik', sans-serif;
  transition: background 0.2s;
}

.btn-save:hover { background: #b8002a; }
.btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
</style>
