<template>
  <div class="diploma-page">
    <div class="container">
      <div class="page-header">
        <h1>Информация о дипломе</h1>
      </div>

      <div class="diploma-grid">
        <div class="card">
          <div class="card-body">
            <h3>Статус диплома</h3>
            <div class="status-card" :class="diplomaStatus.class">
              <span class="status-icon">{{ diplomaStatus.icon }}</span>
              <span class="status-text">{{ diplomaStatus.text }}</span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h3>Детали диплома</h3>
            <div class="info-list">
              <div class="info-item" v-for="(val, key) in diplomaLabels" :key="key">
                <label>{{ val }}</label>
                <span>{{ diplomaInfo[key] }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card requirements-card">
          <div class="card-body">
            <h3>Требования для получения</h3>
            <div class="requirements-list">
              <div class="requirement" v-for="req in requirements" :key="req.id">
                <span class="req-icon" :class="req.completed ? 'done' : 'pending'">
                  {{ req.completed ? '✓' : '○' }}
                </span>
                <span class="req-text" :class="{ completed: req.completed }">{{ req.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiplomaPage',
  data() {
    return {
      diplomaStatus: { class: 'in-progress', icon: '⏳', text: 'В процессе подготовки' },
      diplomaInfo: {
        specialty: 'Информационные технологии',
        qualification: 'Техник-программист',
        issueDate: 'Июнь 2024',
        gpa: '4.5'
      },
      diplomaLabels: {
        specialty: 'Специальность:',
        qualification: 'Квалификация:',
        issueDate: 'Дата выдачи:',
        gpa: 'Средний балл:'
      },
      requirements: [
        { id: 1, text: 'Сдать все экзамены', completed: true },
        { id: 2, text: 'Защитить дипломную работу', completed: false },
        { id: 3, text: 'Пройти практику', completed: true },
        { id: 4, text: 'Сдать государственные экзамены', completed: false }
      ]
    }
  }
}
</script>

<style scoped>
.diploma-page { padding: 1.5rem 0; }

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

.diploma-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.requirements-card { grid-column: 1 / -1; }

.status-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: var(--radius-sm);
  margin-top: 1rem;
}
.status-card.in-progress { background: #fff3cd; border: 1px solid #ffeaa7; }
.status-card.completed   { background: #d4edda; border: 1px solid #c3e6cb; }
.status-icon { font-size: 1.75rem; }
.status-text { font-weight: 500; }

.info-list { margin-top: 1rem; }
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem 0;
  border-bottom: 1px solid var(--gray-200);
  gap: 1rem;
}
.info-item:last-child { border-bottom: none; }
.info-item label { font-weight: 600; font-size: var(--font-sm); color: var(--gray-600); flex-shrink: 0; }
.info-item span { color: var(--text); text-align: right; }

.requirements-list { margin-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }
.requirement { display: flex; align-items: center; gap: 0.75rem; }
.req-icon { font-size: 1.1rem; font-weight: 700; width: 24px; text-align: center; flex-shrink: 0; }
.req-icon.done { color: var(--success); }
.req-icon.pending { color: var(--gray-400); }
.req-text { font-size: var(--font-base); color: var(--text); }
.req-text.completed { color: var(--gray-500); text-decoration: line-through; }

@media (max-width: 768px) {
  .diploma-grid { grid-template-columns: 1fr; }
  .requirements-card { grid-column: auto; }
}
@media (max-width: 480px) {
  .diploma-page { padding: 1rem 0; }
  .info-item { flex-direction: column; align-items: flex-start; }
  .info-item span { text-align: left; }
}
</style>
