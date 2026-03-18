<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import i18n from '../../i18n'
import theme from '../../services/theme.service.js'

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
      <div class="footer-grid">

        <!-- Лого + описание -->
        <div class="footer-brand">
          <img src="../../assets/images/logo-footer1.svg" alt="College Narxoz" class="footer-logo" />
          <p class="footer-desc">{{ $t('footer.rights') }}</p>
        </div>

        <!-- Учебный процесс -->
        <div class="footer-col">
          <h5 class="footer-col-title">{{ $t('nav.education') }}</h5>
          <ul class="footer-nav">
            <li><router-link to="/journal">{{ $t('nav.journal') }}</router-link></li>
            <li><router-link to="/schedule">{{ $t('nav.schedule') }}</router-link></li>
            <li><router-link to="/grades">{{ $t('nav.grades') }}</router-link></li>
            <li><router-link to="/transcript">{{ $t('nav.transcript') }}</router-link></li>
          </ul>
        </div>

        <!-- О нас -->
        <div class="footer-col">
          <h5 class="footer-col-title">{{ $t('footer.about') }}</h5>
          <ul class="footer-nav">
            <li><router-link to="/contacts">{{ $t('footer.contact') }}</router-link></li>
            <li><router-link to="/about">{{ $t('footer.about') }}</router-link></li>
            <li><router-link to="/news">{{ $t('nav.news') }}</router-link></li>
          </ul>
        </div>

        <!-- Язык + Тема -->
        <div class="footer-col">
          <h5 class="footer-col-title">{{ $t('footer.language') }}</h5>
          <div class="lang-switcher">
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

          <h5 class="footer-col-title" style="margin-top: 1.5rem">{{ $t('footer.theme') }}</h5>
          <button class="theme-toggle" @click="theme.toggle()">
            <span class="theme-toggle-track">
              <span class="theme-toggle-thumb" :class="{ dark: theme.isDark }"></span>
            </span>
            <span class="theme-toggle-label">
              {{ theme.isDark ? $t('footer.themeDark') : $t('footer.themeLight') }}
            </span>
          </button>
        </div>

      </div>

      <div class="footer-bottom">
        <p class="copyright">{{ $t('footer.rights') }}</p>
        <div class="footer-bottom-links">
          <a href="#">{{ $t('footer.privacy') }}</a>
          <a href="#">{{ $t('footer.terms') }}</a>
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

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2.5rem;
  padding: 3rem 0 2rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-logo {
  height: 44px;
  width: auto;
}

.footer-desc {
  color: #888;
  font-size: 0.8rem;
  line-height: 1.6;
  margin: 0;
}

.footer-col-title {
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 1rem;
}

.footer-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-nav a {
  color: #888;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.footer-nav a:hover { color: var(--primary); }

.lang-switcher {
  display: flex;
  gap: 0;
  flex-wrap: nowrap;
  background: #2a2a2a;
  border: 1px solid #444;
  border-radius: 8px;
  overflow: hidden;
  width: fit-content;
}

.lang-btn {
  background: transparent;
  border: none;
  border-right: 1px solid #444;
  color: #888;
  padding: 0.4rem 0.875rem;
  border-radius: 0;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.lang-btn:last-child { border-right: none; }

.lang-btn:hover {
  background: #333;
  color: #fff;
}

.lang-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.footer-bottom {
  border-top: 1px solid #2e2e2e;
  padding: 1.25rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.copyright {
  color: #555;
  font-size: 0.75rem;
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  gap: 1.5rem;
}

.footer-bottom-links a {
  color: #555;
  text-decoration: none;
  font-size: 0.75rem;
  transition: color 0.2s;
}

.footer-bottom-links a:hover { color: var(--primary); }

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.theme-toggle-track {
  width: 44px;
  height: 24px;
  background: #333;
  border-radius: 12px;
  position: relative;
  display: block;
  transition: background 0.3s;
  flex-shrink: 0;
}

.theme-toggle-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  background: #888;
  border-radius: 50%;
  transition: transform 0.3s, background 0.3s;
}

.theme-toggle-thumb.dark {
  transform: translateX(20px);
  background: var(--primary);
}

.theme-toggle-label {
  color: #888;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .footer-brand { grid-column: 1 / -1; flex-direction: row; align-items: center; gap: 1.5rem; }
}

@media (max-width: 560px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    padding: 2rem 0 1.5rem;
  }
  .footer-brand { flex-direction: column; align-items: flex-start; }
  .footer-bottom { flex-direction: column; text-align: center; }
  .footer-bottom-links { justify-content: center; }
}
</style>
