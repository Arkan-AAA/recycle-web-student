<template>
  <div class="diploma-page">
    <div class="container">
      <h1>Информация о дипломе</h1>
      <div class="diploma-content">
        <div class="diploma-status">
          <h3>Статус диплома</h3>
          <div class="status-card" :class="diplomaStatus.class">
            <div class="status-icon">{{ diplomaStatus.icon }}</div>
            <div class="status-text">{{ diplomaStatus.text }}</div>
          </div>
        </div>
        
        <div class="diploma-info">
          <h3>Детали диплома</h3>
          <div class="info-grid">
            <div class="info-item">
              <label>Специальность:</label>
              <span>{{ diplomaInfo.specialty }}</span>
            </div>
            <div class="info-item">
              <label>Квалификация:</label>
              <span>{{ diplomaInfo.qualification }}</span>
            </div>
            <div class="info-item">
              <label>Дата выдачи:</label>
              <span>{{ diplomaInfo.issueDate }}</span>
            </div>
            <div class="info-item">
              <label>Средний балл:</label>
              <span>{{ diplomaInfo.gpa }}</span>
            </div>
          </div>
        </div>

        <div class="diploma-requirements">
          <h3>Требования для получения</h3>
          <div class="requirement" v-for="req in requirements" :key="req.id">
            <span class="requirement-status" :class="req.completed ? 'completed' : 'pending'">
              {{ req.completed ? '✓' : '○' }}
            </span>
            <span class="requirement-text">{{ req.text }}</span>
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
      diplomaStatus: {
        class: 'in-progress',
        icon: '⏳',
        text: 'В процессе подготовки'
      },
      diplomaInfo: {
        specialty: 'Информационные технологии',
        qualification: 'Техник-программист',
        issueDate: 'Июнь 2024',
        gpa: '4.5'
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
.diploma-content {
  margin-top: 2rem;
  display: grid;
  gap: 2rem;
}

.diploma-status, .diploma-info, .diploma-requirements {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.status-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.status-card.in-progress {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
}

.status-icon {
  font-size: 2rem;
}

.info-grid {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
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

.requirement {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
}

.requirement-status.completed {
  color: green;
  font-weight: bold;
}

.requirement-status.pending {
  color: #666;
}
</style>