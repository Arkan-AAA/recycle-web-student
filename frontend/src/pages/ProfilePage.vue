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
        <button class="student-card-btn">{{ $t('profile.studentCard') }}</button>
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
        
        <button @click="toggleEdit" class="edit-btn">
          {{ isEditing ? $t('profile.cancel') : $t('profile.edit') }}
        </button>
        
        <button @click="logout" class="logout-btn">
          {{ $t('profile.logout') }}
        </button>
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
      avatarFile: null,
      avatarPreview: null,
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
    toggleEdit() {
      this.isEditing = !this.isEditing;
      if (this.isEditing) {
        this.initEditForm();
      }
    },
    closeEdit() {
      this.isEditing = false;
      this.avatarFile = null;
      this.avatarPreview = null;
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
  background: #fff;
  padding: 20px;
}

.header {
  margin-bottom: 40px;
}

.back-link {
  color: #cbcbcb;
  text-decoration: none;
  font-size: 16px;
  display: block;
  margin-bottom: 10px;
}

.back-link:hover {
  color: #d3392c;
}

h1 {
  color: #d3392c;
  font-size: 24px;
  margin: 0;
}

.profile-content {
  display: flex;
  gap: 40px;
  max-width: 1200px;
}

.avatar-section {
  flex-shrink: 0;
}

.avatar-container {
  width: 280px;
  height: 280px;
  background: #d9d9d9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.avatar-placeholder {
  color: #666;
  font-size: 18px;
}

.student-card-btn {
  width: 100%;
  padding: 15px;
  background: #d3392c;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.profile-info {
  flex: 1;
  background: #d9d9d9;
  border-radius: 10px;
  padding: 30px;
  padding-bottom: 100px;
  position: relative;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #cbcbcb;
}

.info-row:last-of-type {
  border-bottom: none;
}

.info-row label {
  font-weight: 500;
  color: #252525;
}

.info-row span {
  color: #666;
}

.edit-btn {
  position: absolute;
  bottom: 30px;
  right: 30px;
  padding: 15px 30px;
  background: #d3392c;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 10;
}

.logout-btn {
  position: absolute;
  bottom: 30px;
  left: 30px;
  padding: 15px 30px;
  background: #666;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 10;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #444;
}

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
  padding: 30px;
  border-radius: 10px;
  width: 500px;
  max-width: 90vw;
}

.modal h2 {
  margin-bottom: 20px;
  color: #d3392c;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input[type="file"] {
  padding: 5px;
}

.avatar-preview {
  margin-top: 10px;
}

.avatar-preview img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #ddd;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.form-actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.form-actions button[type="submit"] {
  background: #d3392c;
  color: white;
}

.form-actions button[type="button"] {
  background: #ccc;
  color: #333;
}
</style>