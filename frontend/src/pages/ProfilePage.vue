<template>
  <div class="profile-page">
    <header class="header">
      <h1>{{ $t('profile.title') }}</h1>
    </header>

    <div class="profile-content">
      <div class="avatar-section">
        <div class="avatar-container">
          <img v-if="user.avatarUrl" :src="user.avatarUrl" alt="Аватар" class="avatar" />
          <div v-else class="avatar-placeholder">{{ $t('profile.photo') }}</div>
        </div>
        <button class="student-card-btn" @click="showStudentCard = true">{{ $t('profile.studentCard') }}</button>
      </div>

      <div class="profile-info">
        <div class="info-row">
          <label>{{ $t('profile.email') }}</label>
          <span>{{ user.email || $t('profile.notSet') }}</span>
        </div>
        <div class="info-row">
          <label>{{ $t('profile.lastName') }}</label>
          <span>{{ lastName || $t('profile.notSetF') }}</span>
        </div>
        <div class="info-row">
          <label>{{ $t('profile.firstName') }}</label>
          <span>{{ firstName || $t('profile.notSetN') }}</span>
        </div>
        <div class="info-row">
          <label>{{ $t('profile.middleName') }}</label>
          <span>{{ middleName || $t('profile.notSetN') }}</span>
        </div>
        <div class="info-row">
          <label>{{ $t('profile.birthDate') }}</label>
          <span>{{ user.birthDate || $t('profile.notSetF') }}</span>
        </div>
        <div class="info-row">
          <label>{{ $t('profile.phone') }}</label>
          <span>{{ user.phone || $t('profile.notSet') }}</span>
        </div>
        <div class="info-row">
          <label>{{ $t('profile.address') }}</label>
          <span>{{ user.address || $t('profile.notSet') }}</span>
        </div>
        <div class="info-row">
          <label>{{ $t('profile.group') }}</label>
          <span>{{ user.studentGroup || $t('profile.notSetF') }}</span>
        </div>
        
        <div class="profile-actions">
          <button @click="toggleEdit" class="edit-btn">
            {{ isEditing ? $t('profile.cancel') : $t('profile.edit') }}
          </button>
          <button @click="logout" class="logout-btn">
            {{ $t('profile.logout') }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="isEditing" class="modal-overlay" @click="closeEdit">
      <div class="modal" @click.stop>
        <h2>{{ $t('profile.editTitle') }}</h2>
        <form @submit.prevent="saveProfile">
          <div class="form-group">
            <label>{{ $t('profile.photoLabel') }}</label>
            <input type="file" @change="handleAvatarChange" accept="image/*" />
            <div v-if="avatarPreview" class="avatar-preview">
              <img :src="avatarPreview" alt="Превью" />
            </div>
          </div>
          <div class="form-group">
            <label>{{ $t('profile.studentCardLabel') }}</label>
            <input type="file" @change="handleStudentCardChange" accept="image/*" />
            <div v-if="studentCardPreview" class="avatar-preview">
              <img :src="studentCardPreview" alt="Студбилет" />
            </div>
          </div>
          <div class="form-group">
            <label>{{ $t('profile.fullName') }}</label>
            <input v-model="editForm.fullName" type="text" />
          </div>
          <div class="form-group">
            <label>{{ $t('profile.phoneLabel') }}</label>
            <input v-model="editForm.phone" type="tel" />
          </div>
          <div class="form-group">
            <label>{{ $t('profile.addressLabel') }}</label>
            <input v-model="editForm.address" type="text" />
          </div>
          <div class="form-group">
            <label>{{ $t('profile.birthDateLabel') }}</label>
            <input v-model="editForm.birthDate" type="date" />
          </div>
          <div class="form-actions">
            <button type="submit" :disabled="loading">{{ $t('profile.save') }}</button>
            <button type="button" @click="closeEdit">{{ $t('profile.cancel') }}</button>
          </div>
        </form>
      </div>
    </div>
    <!-- Модал студбилета -->
    <div v-if="showStudentCard" class="modal-overlay" @click="showStudentCard = false">
      <div class="modal modal-card" @click.stop>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
          <h2 style="margin:0;color:var(--primary)">{{ $t('profile.studentCard') }}</h2>
          <button class="close-btn" @click="showStudentCard = false">&times;</button>
        </div>
        <img v-if="user.studentCardUrl" :src="user.studentCardUrl" class="student-card-img" alt="Студбилет" />
        <div v-else class="no-card">
          <p>{{ $t('profile.noStudentCard') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import profileService from '../services/profile.service';
import authService from '../services/auth.service';

export default {
  name: 'ProfilePage',
  data() {
    return {
      user: {},
      isEditing: false,
      loading: false,
      showStudentCard: false,
      avatarFile: null,
      avatarPreview: null,
      studentCardFile: null,
      studentCardPreview: null,
      editForm: {
        fullName: '',
        phone: '',
        address: '',
        birthDate: ''
      }
    };
  },
  computed: {
    firstName() {
      return this.user.fullName?.split(' ')[1] || '';
    },
    lastName() {
      return this.user.fullName?.split(' ')[0] || '';
    },
    middleName() {
      return this.user.fullName?.split(' ')[2] || '';
    }
  },
  async mounted() {
    await this.loadProfile();
  },
  methods: {
    async loadProfile() {
      try {
        const response = await profileService.getProfile();
        if (response.success) {
          this.user = response.data;
          this.initEditForm();
        } else {
          // Fallback к данным из localStorage
          this.user = authService.getUser() || {};
        }
      } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
        this.user = authService.getUser() || {};
      }
    },
    initEditForm() {
      this.editForm = {
        fullName: this.user.fullName || '',
        phone: this.user.phone || '',
        address: this.user.address || '',
        birthDate: this.user.birthDate || ''
      };
    },
    handleAvatarChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.avatarFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatarPreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    handleStudentCardChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.studentCardFile = file;
        const reader = new FileReader();
        reader.onload = (e) => { this.studentCardPreview = e.target.result; };
        reader.readAsDataURL(file);
      }
    },
      this.isEditing = !this.isEditing;
      if (this.isEditing) {
        this.initEditForm();
      }
    },
    closeEdit() {
      this.isEditing = false;
      this.avatarFile = null;
      this.avatarPreview = null;
      this.studentCardFile = null;
      this.studentCardPreview = null;
    },
    async saveProfile() {
      this.loading = true;
      try {
        if (this.avatarFile) {
          const reader = new FileReader();
          const avatarData = await new Promise((resolve) => {
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(this.avatarFile);
          });
          
          const avatarResponse = await profileService.uploadAvatar({ avatar: avatarData });
          if (avatarResponse.success) {
            this.user.avatarUrl = avatarResponse.data.avatarUrl;
          }
        }
        
        if (this.studentCardFile) {
          const reader = new FileReader();
          const cardData = await new Promise((resolve) => {
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(this.studentCardFile);
          });
          const cardResponse = await profileService.uploadStudentCard({ studentCard: cardData });
          if (cardResponse.success) this.user.studentCardUrl = cardResponse.data.studentCardUrl;
        }
        
        const response = await profileService.updateProfile(this.editForm);
        if (response.success) {
          this.user = { ...this.user, ...this.editForm };
          this.isEditing = false;
          this.avatarFile = null;
          this.avatarPreview = null;
        } else {
          alert(this.$t('profile.saveError') + ': ' + response.error);
        }
      } catch (error) {
        alert(this.$t('profile.saveError'));
      } finally {
        this.loading = false;
      }
    },
    logout() {
      authService.logout();
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: var(--bg-page);
  padding: 1.5rem;
  transition: background 0.3s;
}

.header { margin-bottom: 2rem; }

h1 { color: var(--primary); font-size: var(--font-2xl); }

.profile-content {
  display: flex;
  gap: 2rem;
  max-width: var(--container-max);
  align-items: flex-start;
}

.avatar-section { flex-shrink: 0; }

.avatar-container {
  width: 240px;
  height: 240px;
  background: var(--gray-300);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  overflow: hidden;
}

.avatar { width: 100%; height: 100%; object-fit: cover; }
.avatar-placeholder { color: var(--gray-600); font-size: var(--font-base); }

.student-card-btn {
  width: 100%;
  padding: 0.875rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-size: var(--font-lg);
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: background 0.2s;
}
.student-card-btn:hover { background: var(--primary-dark); }

.profile-info {
  flex: 1;
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 1.5rem;
  border: 1px solid var(--border-color);
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 0;
  border-bottom: 1px solid var(--border-color);
  gap: 1rem;
}
.info-row:last-of-type { border-bottom: none; }
.info-row label { font-weight: 500; color: var(--text-primary); flex-shrink: 0; }
.info-row span { color: var(--text-secondary); text-align: right; word-break: break-word; }

.profile-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.edit-btn {
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: background 0.2s;
}
.edit-btn:hover { background: var(--primary-dark); }

.logout-btn {
  padding: 0.75rem 1.5rem;
  background: var(--gray-600);
  color: white;
  border: none;
  border-radius: var(--radius);
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: background 0.2s;
}
.logout-btn:hover { background: var(--gray-700); }

/* Модальное окно */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
  padding: 1rem;
}
.modal {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
}
.modal h2 { margin-bottom: 1.5rem; color: var(--primary); }

.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: 0.375rem; font-weight: 500; font-size: var(--font-sm); }
.form-group input[type="file"] { padding: 0.375rem; }

.avatar-preview { margin-top: 0.75rem; }
.avatar-preview img {
  width: 90px; height: 90px;
  object-fit: cover;
  border-radius: var(--radius);
  border: 2px solid var(--gray-300);
}

.form-group input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: var(--font-base);
  background: var(--bg-input);
  color: var(--text-primary);
  transition: border-color 0.2s;
}
.form-group input:focus { outline: none; border-color: var(--primary); }

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}
.form-actions button {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: var(--font-base);
  cursor: pointer;
  transition: background 0.2s;
}
.form-actions button[type="submit"] { background: var(--primary); color: white; }
.form-actions button[type="submit"]:hover { background: var(--primary-dark); }
.form-actions button[type="button"] { background: var(--bg-input); color: var(--text-primary); }
.form-actions button[type="button"]:hover { background: var(--border-color); }

.close-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-hint); line-height: 1; }
.close-btn:hover { color: var(--text-primary); }

.modal-card { max-width: 420px; }
.student-card-img { width: 100%; border-radius: var(--radius); display: block; }
.no-card { text-align: center; padding: 2rem; color: var(--text-hint); }
@media (max-width: 768px) {
  .profile-content { flex-direction: column; align-items: stretch; }
  .avatar-section { display: flex; flex-direction: column; align-items: center; }
  .avatar-container { width: 180px; height: 180px; }
  .student-card-btn { max-width: 240px; }
  .info-row { flex-direction: column; align-items: flex-start; gap: 0.25rem; }
  .info-row span { text-align: left; }
}

@media (max-width: 480px) {
  .profile-page { padding: 1rem; }
  .avatar-container { width: 140px; height: 140px; }
  .profile-actions { flex-direction: column; }
  .edit-btn, .logout-btn { width: 100%; text-align: center; }
  .form-actions { flex-direction: column; }
  .form-actions button { width: 100%; }
}
</style>