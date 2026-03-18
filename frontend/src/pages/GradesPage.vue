<template>
  <div class="grades-page">
    <div class="container">
      <h1>{{ $t('grades.title') }}</h1>
      
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
.grades-page {
  padding: 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.grade-scale-info {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.scale-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.scale-item {
  padding: 0.75rem;
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
}

.grade-actions {
  margin-bottom: 2rem;
}

.subjects-list {
  display: grid;
  gap: 2rem;
}

.subject-grades {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.grades-table {
  margin-top: 1rem;
}

.grades-table table {
  width: 100%;
  border-collapse: collapse;
}

.grades-table th,
.grades-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.grades-table th {
  background: #f8f9fa;
  font-weight: 600;
}

.grade-value {
  font-weight: bold;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  display: inline-block;
  min-width: 50px;
  text-align: center;
}

.excellent { 
  background: #d4edda; 
  color: #155724; 
}

.good { 
  background: #cce5ff; 
  color: #004085; 
}

.satisfactory { 
  background: #fff3cd; 
  color: #856404; 
}

.unsatisfactory { 
  background: #f8d7da; 
  color: #721c24; 
}

.average {
  font-weight: bold;
  color: #2c3e50;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #eee;
}

.no-grades,
.no-subjects {
  text-align: center;
  color: #6c757d;
  padding: 2rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

/* Адаптивность */
@media (max-width: 768px) {
  .grades-page {
    padding: 0.5rem;
  }
  
  .scale-items {
    grid-template-columns: 1fr;
  }
  
  .grades-table {
    overflow-x: auto;
  }
  
  .grades-table table {
    min-width: 600px;
  }
  
  .actions {
    flex-direction: column;
  }
  
  .modal {
    width: 95%;
    margin: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .grades-table th,
  .grades-table td {
    padding: 0.5rem 0.25rem;
    font-size: 0.875rem;
  }
  
  .subject-grades {
    padding: 1rem;
  }
}
</style>