<template>
  <div class="auth-page">
    <div class="auth-container">
      <h2>Вход в систему</h2>
      
      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="credentials.email" 
            required
            placeholder="Введите email"
          />
        </div>

        <div class="form-group">
          <label for="password">Пароль</label>
          <div class="password-input">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              v-model="credentials.password" 
              required
              placeholder="Введите пароль"
            />
            <button type="button" @click="showPassword = !showPassword" class="btn-eye">
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>

        <button type="submit" :disabled="loading" class="btn-login">
          {{ loading ? 'Вход...' : 'Войти' }}
        </button>
      </form>
      
    </div>
  </div>
</template>

<script>
import authService from '../services/auth.service';

export default {
  name: 'AuthPage',
  data() {
    return {
      credentials: { email: '', password: '' },
      showPassword: false,
      loading: false,
      error: ''
    };
  },
  methods: {
    async handleLogin() {
      this.error = '';
      this.loading = true;
      try {
        const response = await authService.login(this.credentials);
        if (response.success) {
          // Обновляем данные пользователя в хедере
          this.$parent.$refs.header?.loadUser();
          this.$router.push('/');
        } else {
          this.error = response.error || 'Ошибка входа';
        }
      } catch (err) {
        this.error = 'Ошибка подключения к серверу';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 20px;
}

.auth-container {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  max-width: 400px;
  width: 100%;
}

h2 {
  margin-bottom: 30px;
  text-align: center;
  color: #333;
}

.auth-form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #4CAF50;
}

.error-message {
  color: #f44336;
  margin-bottom: 15px;
  padding: 10px;
  background: #ffebee;
  border-radius: 4px;
  font-size: 14px;
}

.btn-login {
  width: 100%;
  padding: 12px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-login:hover:not(:disabled) {
  background: #45a049;
}

.btn-login:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.password-input {
  position: relative;
  width: 100%;
}

.password-input input {
  width: 100%;
  padding-right: 40px;
  box-sizing: border-box;
}

.btn-eye {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
}
</style>