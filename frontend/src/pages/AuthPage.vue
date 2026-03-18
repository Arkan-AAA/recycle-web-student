<template>
  <div :class="$style.container">
    <div :class="$style.leftPanel">
      <div :class="$style.leftContent">
        <p :class="$style.subtitle">{{ $t('auth.welcome') }}</p>
        <h1 :class="$style.title">{{ $t('auth.title') }}</h1>
      </div>
    </div>

    <div :class="$style.rightPanel">
      <div :class="$style.formWrapper">
        <h2 :class="$style.loginTitle">{{ $t('auth.login') }}</h2>
        <p :class="$style.loginSubtitle">{{ $t('auth.subtitle') }}</p>

        <form @submit.prevent="handleLogin">
          <div :class="$style.formGroup">
            <label :class="$style.label">{{ $t('auth.email') }}</label>
            <input 
              v-model="email" 
              type="email" 
              :placeholder="$t('auth.emailPlaceholder')"
              :class="$style.input"
              @keyup.enter="handleLogin"
            />
          </div>

          <div :class="$style.formGroup">
            <label :class="$style.label">{{ $t('auth.password') }}</label>
            <input 
              v-model="password" 
              type="password" 
              :placeholder="$t('auth.pwdPlaceholder')"
              :class="$style.input"
              @keyup.enter="handleLogin"
            />
          </div>

          <div :class="$style.formFooter">
            <label :class="$style.checkboxLabel">
              <input v-model="rememberMe" type="checkbox" :class="$style.checkbox" />
              {{ $t('auth.remember') }}
            </label>
          </div>

          <div v-if="error" :class="$style.error">{{ error }}</div>
          <div v-if="success" :class="$style.success">{{ success }}</div>

          <button type="submit" :class="$style.submitBtn" :disabled="loading">
            <span v-if="loading" :class="$style.spinner"></span>
            {{ loading ? $t('auth.loading') : $t('auth.submit') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import authService from '../services/auth.service';
import storageService from '../services/storage.service';

const router = useRouter();
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const error = ref('');
const success = ref('');
const loading = ref(false);

onMounted(() => {
  const saved = storageService.get('rememberMe');
  if (saved) {
    email.value = saved.email || '';
    rememberMe.value = true;
  }
});

const handleLogin = async () => {
  error.value = '';
  success.value = '';
  
  if (!email.value || !password.value) {
    error.value = 'Заполните все поля';
    return;
  }

  loading.value = true;

  try {
    const response = await authService.login({
      email: email.value,
      password: password.value
    });

    if (response.success) {
      if (rememberMe.value) {
        storageService.set('rememberMe', { email: email.value });
      } else {
        storageService.remove('rememberMe');
      }
      success.value = 'Вход выполнен успешно!';
      router.push('/home');
    } else {
      error.value = response.error || 'Ошибка входа';
    }
  } catch (err) {
    error.value = 'Ошибка подключения к серверу';
  } finally {
    loading.value = false;
  }
};
</script>
<style module>
.container {
  display: flex;
  min-height: 100vh;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.leftPanel {
  flex: 1;
  background: linear-gradient(135deg, #d90135 0%, #d3392c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.leftContent {
  text-align: center;
  color: #fff;
}

.title {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 32px;
  margin-bottom: 10px;
}

.rightPanel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.formWrapper {
  width: 100%;
  max-width: 450px;
}

.loginTitle {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
}

.loginSubtitle {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}

.formGroup {
  margin-bottom: 20px;
}

.label {
  display: block;
  font-size: 18px;
  margin-bottom: 8px;
  font-weight: 500;
}

.input {
  width: 100%;
  padding: 14px 16px;
  border: none;
  border-radius: 10px;
  background: rgba(242, 198, 198, 0.55);
  font-size: 16px;
  font-family: Inter, sans-serif;
  transition: all 0.3s;
}

.input:focus {
  outline: 2px solid #d3392c;
  background: rgba(242, 198, 198, 0.75);
}

.formFooter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.checkboxLabel {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  cursor: pointer;
}

.checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #d3392c;
}

.error {
  color: #d3392c;
  font-size: 14px;
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(211, 57, 44, 0.1);
  border-radius: 5px;
}

.success {
  color: #28a745;
  font-size: 14px;
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(40, 167, 69, 0.1);
  border-radius: 5px;
}

.submitBtn {
  width: 100%;
  padding: 14px;
  background: #d3392c;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.submitBtn:hover {
  background: #b02f24;
}

.submitBtn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin-right: 8px;
  vertical-align: middle;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Адаптация для планшетов */
@media (max-width: 1024px) {
  .title {
    font-size: 36px;
  }
  
  .subtitle {
    font-size: 24px;
  }
  
  .description {
    font-size: 18px;
  }
}

/* Адаптация для мобильных */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  
  .leftPanel {
    min-height: 140px;
    flex: none;
    padding: 20px 20px;
  }
  
  .title {
    font-size: 28px;
  }
  
  .subtitle {
    font-size: 20px;
  }
  
  .description {
    font-size: 14px;
  }
  
  .rightPanel {
    padding: 30px 20px 48px;
  }
  
  .loginTitle {
    font-size: 28px;
  }
  
  .loginSubtitle {
    font-size: 14px;
  }
  
  .formFooter {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* Адаптация для маленьких мобильных */
@media (max-width: 480px) {
  .leftPanel {
    min-height: 110px;
    flex: none;
    padding: 16px 15px;
  }
  
  .title {
    font-size: 22px;
  }
  
  .subtitle {
    font-size: 16px;
    margin-bottom: 4px;
  }
  
  .description {
    font-size: 12px;
  }
  
  .rightPanel {
    padding: 20px 15px 56px;
  }
  
  .loginTitle {
    font-size: 24px;
  }
  
  .input {
    padding: 12px 14px;
    font-size: 14px;
  }
  
  .submitBtn {
    padding: 12px;
    font-size: 16px;
  }
}
</style>