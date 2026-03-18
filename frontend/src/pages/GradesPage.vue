<template>
  <div class="grades-page">
    <div class="container">
      <div class="page-header">
        <h1>{{ $t('grades.title') }}</h1>
      </div>
      
      <!-- Шкала оценок -->
      <div class="grade-scale-info">
        <h3>{{ $t('grades.gradeScale.title') }}</h3>
        <div class="scale-items">
          <div class="scale-item excellent">{{ $t('grades.gradeScale.excellent') }}</div>
          <div class="scale-item good">{{ $t('grades.gradeScale.good') }}</div>
          <div class="scale-item satisfactory">{{ $t('grades.gradeScale.satisfactory') }}</div>
          <div class="scale-item unsatisfactory">{{ $t('grades.gradeScale.unsatisfactory') }}</div>
        </div>
      </div>

      <div class="grades-content">
        <!-- Кнопка добавления оценки (только для учителей и админов) -->
        <div v-if="canManageGrades" class="grade-actions">
          <button @click="showAddGradeModal = true" class="btn btn-primary">
            {{ $t('grades.addGrade') }}
          </button>
        </div>

        <!-- Список предметов с оценками -->
        <div v-if="subjects.length > 0" class="subjects-list">
          <div class="subject-grades" v-for="subject in subjects" :key="subject.id">
            <h3>{{ subject.name }}</h3>
            <div v-if="subject.grades.length > 0" class="grades-table">
              <table>
                <thead>
                  <tr>
                    <th>{{ $t('grades.type') }}</th>
                    <th>{{ $t('grades.grade') }}</th>
                    <th>{{ $t('grades.date') }}</th>
                    <th>{{ $t('grades.teacher') }}</th>
                    <th v-if="canManageGrades">{{ $t('common.actions') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="grade in subject.grades" :key="grade.id">
                    <td>{{ $t(`grades.gradeTypes.${grade.type}`) }}</td>
                    <td>
                      <span class="grade-value" :class="getGradeClass(grade.value)">
                        {{ grade.value }}
                      </span>
                    </td>
                    <td>{{ formatDate(grade.date) }}</td>
                    <td>{{ grade.teacher }}</td>
                    <td v-if="canManageGrades" class="actions">
                      <button @click="editGrade(grade)" class="btn btn-sm btn-secondary">
                        {{ $t('common.edit') }}
                      </button>
                      <button @click="deleteGrade(grade.id)" class="btn btn-sm btn-danger">
                        {{ $t('common.delete') }}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="average">{{ $t('grades.average') }} {{ subject.average.toFixed(1) }}</div>
            </div>
            <div v-else class="no-grades">
              <p>{{ $t('grades.noGrades') }}</p>
            </div>
          </div>
        </div>
        <div v-else class="no-subjects">
          <p>{{ $t('grades.noGrades') }}</p>
        </div>
      </div>
    </div>

    <!-- Модальное окно добавления/редактирования оценки -->
    <div v-if="showAddGradeModal || showEditGradeModal" class="modal-overlay" @click="closeModals">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ showEditGradeModal ? $t('grades.editGrade') : $t('grades.addGrade') }}</h3>
          <button @click="closeModals" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveGrade">
            <div class="form-group">
              <label>{{ $t('grades.subject') }}</label>
              <select v-model="gradeForm.subjectId" required>
                <option value="">{{ $t('common.select') }}</option>
                <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
                  {{ subject.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>{{ $t('grades.type') }}</label>
              <select v-model="gradeForm.type" required>
                <option value="">{{ $t('common.select') }}</option>
                <option value="homework">{{ $t('grades.gradeTypes.homework') }}</option>
                <option value="test">{{ $t('grades.gradeTypes.test') }}</option>
                <option value="exam">{{ $t('grades.gradeTypes.exam') }}</option>
                <option value="project">{{ $t('grades.gradeTypes.project') }}</option>
                <option value="lab">{{ $t('grades.gradeTypes.lab') }}</option>
                <option value="control">{{ $t('grades.gradeTypes.control') }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>{{ $t('grades.gradeValue') }}</label>
              <input 
                type="number" 
                v-model.number="gradeForm.value" 
                min="0" 
                max="100" 
                required
              >
            </div>
            <div class="form-group">
              <label>{{ $t('grades.date') }}</label>
              <input type="date" v-model="gradeForm.date" required>
            </div>
            <div class="form-actions">
              <button type="button" @click="closeModals" class="btn btn-secondary">
                {{ $t('common.cancel') }}
              </button>
              <button type="submit" class="btn btn-primary">
                {{ $t('common.save') }}
              </button>
            </div>
          </form>
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
      subjects: [],
      showAddGradeModal: false,
      showEditGradeModal: false,
      gradeForm: {
        id: null,
        subjectId: '',
        type: '',
        value: '',
        date: '',
        teacher: ''
      },
      currentUser: {
        role: 'student' // student, teacher, admin
      }
    }
  },
  computed: {
    canManageGrades() {
      return this.currentUser.role === 'teacher' || this.currentUser.role === 'admin'
    }
  },
  mounted() {
    this.loadGrades()
    this.loadUserInfo()
  },
  methods: {
    async loadGrades() {
      // Загружаем пустые предметы без оценок
      this.subjects = [
        {
          id: 1,
          name: 'Математика',
          grades: [],
          average: 0
        },
        {
          id: 2,
          name: 'Физика',
          grades: [],
          average: 0
        },
        {
          id: 3,
          name: 'Программирование',
          grades: [],
          average: 0
        },
        {
          id: 4,
          name: 'Английский язык',
          grades: [],
          average: 0
        }
      ]
    },
    
    async loadUserInfo() {
      // Здесь будет загрузка информации о пользователе
      // Пока устанавливаем роль студента по умолчанию
      this.currentUser.role = 'student'
    },

    getGradeClass(value) {
      if (value >= 90) return 'excellent'
      if (value >= 70) return 'good'
      if (value >= 50) return 'satisfactory'
      return 'unsatisfactory'
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    },

    editGrade(grade) {
      this.gradeForm = { ...grade }
      this.showEditGradeModal = true
    },

    async deleteGrade(gradeId) {
      if (confirm(this.$t('common.confirm'))) {
        // Здесь будет API вызов для удаления оценки
        console.log('Deleting grade:', gradeId)
      }
    },

    async saveGrade() {
      try {
        if (this.showEditGradeModal) {
          // Обновление существующей оценки
          console.log('Updating grade:', this.gradeForm)
        } else {
          // Добавление новой оценки
          console.log('Adding new grade:', this.gradeForm)
        }
        this.closeModals()
        await this.loadGrades()
      } catch (error) {
        console.error('Error saving grade:', error)
      }
    },

    closeModals() {
      this.showAddGradeModal = false
      this.showEditGradeModal = false
      this.gradeForm = {
        id: null,
        subjectId: '',
        type: '',
        value: '',
        date: '',
        teacher: ''
      }
    }
  }
}
</script>

<style scoped>
.grades-page { padding: 1.5rem 0; }

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

.grade-scale-info {
  background: var(--white);
  padding: 1.25rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: 1.5rem;
}
.grade-scale-info h3 { margin-bottom: 0.75rem; font-size: var(--font-lg); }

.scale-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.scale-item {
  padding: 0.625rem 1rem;
  border-radius: var(--radius-sm);
  text-align: center;
  font-weight: 500;
  font-size: var(--font-sm);
}
.excellent    { background: #d4edda; color: #155724; }
.good         { background: #cce5ff; color: #004085; }
.satisfactory { background: #fff3cd; color: #856404; }
.unsatisfactory { background: #f8d7da; color: #721c24; }

.grade-actions { margin-bottom: 1.5rem; }

.subjects-list { display: grid; gap: 1.5rem; }

.subject-grades {
  background: var(--white);
  border-radius: var(--radius);
  padding: 1.25rem;
  box-shadow: var(--shadow);
}
.subject-grades h3 {
  font-size: var(--font-lg);
  margin-bottom: 1rem;
  color: var(--text);
  border-left: 3px solid var(--primary);
  padding-left: 0.75rem;
}

.grades-table { margin-top: 0.75rem; overflow-x: auto; }
.grades-table table { width: 100%; border-collapse: collapse; min-width: 500px; }
.grades-table th, .grades-table td {
  padding: 0.625rem 0.875rem;
  text-align: left;
  border-bottom: 1px solid var(--gray-200);
  font-size: var(--font-sm);
}
.grades-table th { background: var(--gray-100); font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; font-size: var(--font-xs); }
.grades-table tbody tr:hover { background: #fff5f6; }

.grade-value {
  font-weight: 600;
  padding: 0.2rem 0.625rem;
  border-radius: var(--radius-sm);
  display: inline-block;
  min-width: 44px;
  text-align: center;
  font-size: var(--font-sm);
}

.average {
  font-weight: 600;
  color: var(--text);
  margin-top: 0.875rem;
  padding-top: 0.875rem;
  border-top: 2px solid var(--gray-200);
  font-size: var(--font-sm);
}

.no-grades, .no-subjects {
  text-align: center;
  color: var(--gray-500);
  padding: 2rem;
  font-size: var(--font-sm);
}

.actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }

/* Модальное окно */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
  padding: 1rem;
}
.modal {
  background: var(--white);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
}
.modal-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--gray-200);
}
.modal-header h3 { margin: 0; font-size: var(--font-xl); }
.close-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--gray-500); line-height: 1; }
.close-btn:hover { color: var(--text); }
.modal-body { padding: 1.5rem; }

.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: 0.375rem; font-weight: 500; font-size: var(--font-sm); }
.form-group input, .form-group select {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: var(--font-base);
  transition: border-color 0.2s;
}
.form-group input:focus, .form-group select:focus {
  outline: none;
  border-color: var(--primary);
}

.form-actions {
  display: flex; gap: 0.75rem; justify-content: flex-end;
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .scale-items { grid-template-columns: 1fr 1fr; }
  .actions { flex-direction: column; }
  .form-actions { flex-direction: column; }
  .form-actions .btn { width: 100%; }
}
@media (max-width: 480px) {
  .grades-page { padding: 1rem 0; }
  .scale-items { grid-template-columns: 1fr; }
  .subject-grades { padding: 1rem; }
  .modal-overlay { align-items: flex-end; padding: 0; }
  .modal { border-radius: var(--radius) var(--radius) 0 0; }
}
</style>