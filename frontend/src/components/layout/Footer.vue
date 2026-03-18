<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import i18n from '../../i18n'

const route = useRoute()
const isAuthPage = computed(() => route.path === '/')
const locales = [
  { code: 'ru', label: 'РУС' },
  { code: 'kz', label: 'ҚАЗ' },
  { code: 'en', label: 'ENG' }
]
</script>

<template>
  <footer v-if="!isAuthPage" class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- Основная информация -->
        <div class="footer-main">
          <div class="footer-logo">
            <img src="../../assets/images/logo-footer1.svg" alt="College Narxoz" class="logo" />
          </div>
          <p class="footer-description">
            {{ $t('footer.rights') }}
          </p>
        </div>
        
        <!-- Ссылки -->
        <div class="footer-links d-none d-md-block">
          <div class="row">
            <div class="col-md-4">
              <h5 class="footer-title">{{ $t('nav.education') }}</h5>
              <ul class="footer-nav">
                <li><router-link to="/journal">{{ $t('nav.journal') }}</router-link></li>
                <li><router-link to="/schedule">{{ $t('nav.schedule') }}</router-link></li>
                <li><router-link to="/grades">{{ $t('nav.grades') }}</router-link></li>
              </ul>
            </div>
            <div class="col-md-4">
              <h5 class="footer-title">{{ $t('footer.about') }}</h5>
              <ul class="footer-nav">
                <li><a href="#">{{ $t('footer.contact') }}</a></li>
                <li><a href="#">{{ $t('footer.about') }}</a></li>
                <li><router-link to="/news">{{ $t('nav.news') }}</router-link></li>
              </ul>
            </div>
            <div class="col-md-4">
              <h5 class="footer-title">{{ $t('footer.language') }}</h5>
              <div class="language-switcher">
                <button
                  v-for="loc in locales"
                  :key="loc.code"
                  class="lang-btn"
                  :class="{ active: $i18n.locale === loc.code }"
                  @click="$i18n.setLocale(loc.code)"
                >
                  {{ loc.label }}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Мобильная версия языков -->
        <div class="footer-mobile d-md-none">
          <div class="language-switcher-mobile">
            <span class="lang-label">{{ $t('footer.language') }}</span>
            <div class="lang-buttons">
              <button
                v-for="loc in locales"
                :key="loc.code"
                class="lang-btn"
                :class="{ active: $i18n.locale === loc.code }"
                @click="$i18n.setLocale(loc.code)"
              >
                {{ loc.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Нижняя часть -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="copyright">
            {{ $t('footer.rights') }}
          </p>
          <div class="footer-bottom-links d-none d-sm-flex">
            <a href="#">{{ $t('footer.privacy') }}</a>
            <a href="#">{{ $t('footer.terms') }}</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #1e1e1e;
  color: white;
  margin-top: auto;
}

.footer-content {
  padding: var(--spacing-xl) 0;
}

.footer-main {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.footer-logo {
  margin-bottom: var(--spacing-lg);
}

.logo {
  height: 50px;
  width: auto;
}

.footer-description {
  color: #aaa;
  font-size: var(--font-size-sm);
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

.footer-links {
  margin-bottom: var(--spacing-xl);
}

.footer-title {
  color: white;
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.footer-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.footer-nav li {
  margin-bottom: var(--spacing-sm);
}

.footer-nav a {
  color: #ccc;
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: color 0.2s ease;
}

.footer-nav a:hover {
  color: #d50032;
}

.language-switcher,
.language-switcher-mobile {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.language-switcher-mobile {
  flex-direction: column;
  gap: var(--spacing-md);
}

.lang-label {
  color: #aaa;
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
}

.lang-buttons {
  display: flex;
  gap: var(--spacing-sm);
}

.lang-btn {
  background: transparent;
  border: 1px solid #555;
  color: #ccc;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--border-radius);
  font-size: var(--font-size-xs);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.5px;
  min-width: 50px;
}

.lang-btn:hover {
  border-color: white;
  color: white;
  transform: translateY(-1px);
}

.lang-btn.active {
  background: #d50032;
  border-color: #d50032;
  color: white;
}

.lang-btn.active:hover {
  background: #b8002a;
  border-color: #b8002a;
}

.footer-bottom {
  border-top: 1px solid #333;
  padding: var(--spacing-lg) 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.copyright {
  color: #aaa;
  font-size: var(--font-size-xs);
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  gap: var(--spacing-lg);
}

.footer-bottom-links a {
  color: #aaa;
  text-decoration: none;
  font-size: var(--font-size-xs);
  transition: color 0.2s ease;
}

.footer-bottom-links a:hover {
  color: #d50032;
}

/* Планшеты */
@media (min-width: 768px) {
  .footer-main {
    text-align: left;
    display: flex;
    align-items: center;
    gap: var(--spacing-xl);
  }
  
  .footer-logo {
    margin-bottom: 0;
    flex-shrink: 0;
  }
  
  .footer-description {
    text-align: left;
    margin: 0;
  }
  
  .footer-title {
    text-align: left;
  }
  
  .footer-nav {
    text-align: left;
  }
  
  .language-switcher {
    justify-content: flex-start;
  }
}

/* Десктопы */
@media (min-width: 992px) {
  .footer-content {
    padding: var(--spacing-xxl) 0;
  }
  
  .footer-main {
    margin-bottom: var(--spacing-xxl);
  }
}

/* Мобильные устройства */
@media (max-width: 575.98px) {
  .footer-content {
    padding: var(--spacing-lg) 0;
  }
  
  .footer-main {
    margin-bottom: var(--spacing-lg);
  }
  
  .logo {
    height: 40px;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-sm);
  }
  
  .lang-btn {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 10px;
    min-width: 45px;
  }
}

/* Очень маленькие экраны */
@media (max-width: 399.98px) {
  .logo {
    height: 35px;
  }
  
  .footer-description {
    font-size: 12px;
  }
  
  .lang-btn {
    padding: 4px 8px;
    font-size: 9px;
    min-width: 40px;
  }
}
</style>
