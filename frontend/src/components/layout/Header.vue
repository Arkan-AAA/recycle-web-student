<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const mobileMenuOpen = ref(false);
const route = useRoute();
const isAuthPage = computed(() => route.path === '/auth');
</script>
<template>
  <header :class="$style.header">
    <!-- Черная полоса сверху -->
    <div :class="$style.topBar">
      <div :class="$style.container">
        <div :class="$style.languageSelector">
          <div :class="[$style.lang, { [$style.active]: $i18n.locale === 'ru' }]" @click="$i18n.setLocale('ru')">Русский</div>
          <div :class="[$style.lang, { [$style.active]: $i18n.locale === 'en' }]" @click="$i18n.setLocale('en')">English</div>
          <div :class="[$style.lang, { [$style.active]: $i18n.locale === 'kz' }]" @click="$i18n.setLocale('kz')">Қазақ тілі</div>
          <div :class="$style.phone">
            <a href="tel:+77273132028">+7 (727) 313-20-28</a>
          </div>
          <div :class="$style.email">
            <a href="mailto:info@college-narxoz.kz">info@college-narxoz.kz</a>
          </div>
          <div :class="$style.address">050035, г. Алматы, 10-й микрорайон 7А</div>
        </div>
      </div>
    </div>

    <!-- Белая полоса с навигацией -->
    <div v-if="!isAuthPage" :class="$style.navBar">
      <div :class="$style.container">
        <a href="https://collegenarxoz.kz/" target="_blank" :class="$style.logo">
          <img src="../../assets/images/logo1.svg" alt="College Narxoz" :class="$style.logoImg" />
        </a>
        
        <button :class="$style.burger" @click="mobileMenuOpen = !mobileMenuOpen">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav :class="[$style.nav, { [$style.navOpen]: mobileMenuOpen }]">
          <router-link to="/home" @click="mobileMenuOpen = false">{{ $i18n.t('nav.home') }}</router-link>
          <router-link to="/news" @click="mobileMenuOpen = false">{{ $i18n.t('nav.news') }}</router-link>
          <router-link to="/profile" @click="mobileMenuOpen = false">{{ $i18n.t('nav.profile') }}</router-link>
          <router-link to="/admin" @click=" mobileMenuOpen = false">{{ $i18n.t('nav.admin') }}</router-link>
          <router-link to="/aichat" :class="$style.aiChatBtn" @click="mobileMenuOpen = false">{{ $i18n.t('nav.aiChat') }}</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>
<style module>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.topBar {
  background-color: #252525;
  color: #fff;
  height: 40px;
  display: flex;
  align-items: center;
}

.navBar {
  background-color: #ffffff;
  height: 60px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 34px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.languageSelector {
  display: flex;
  gap: 20px;
  font-size: 16px;
}

.lang {
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.lang:hover {
  opacity: 0.8;
}

.lang.active {
  opacity: 1;
  font-weight: bold;
}

.phone {
  color: #fff;
  text-decoration: underline;
  font-size: 20px;
  margin-left: 30px;
}

.email {
  margin-left: 50px;
  color: inherit;
  text-decoration: none;
  position: relative;
  transition: all .2s ease;
}

.address {
  margin-left: auto;
}

.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logoImg {
  height: 40px;
  width: auto;
}

.burger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin-left: auto;
}

.burger span {
  width: 25px;
  height: 3px;
  background: #252525;
  border-radius: 2px;
  transition: 0.3s;
}

.nav {
  display: flex;
  gap: 60px;
  margin-left: 100px;
  align-items: center;
}

.nav a {
  color: #252525;
  text-decoration: none;
  transition: color 0.3s;
}

.nav a:hover {
  color: #d90135;
}

.aiChatBtn {
  background-color: #d90135;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 15px 80px;
  cursor: pointer;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin-left: auto;
  text-decoration: none;
  display: inline-block;
  transition: background 0.3s;
}

.aiChatBtn:hover {
  background-color: #b02f24;
}

/* Планшеты */
@media (max-width: 1024px) {
  .topBar {
    height: 35px;
  }
  
  .phone {
    font-size: 16px;
    margin-left: 15px;
  }
  
  .email {
    margin-left: 20px;
    font-size: 14px;
  }
  
  .address {
    font-size: 14px;
  }
  
  .nav {
    gap: 30px;
    margin-left: 50px;
  }
  
  .aiChatBtn {
    padding: 12px 40px;
  }
}

/* Мобильные */
@media (max-width: 768px) {
  .topBar {
    height: 30px;
  }
  
  .container {
    padding: 0 15px;
    gap: 10px;
  }
  
  .languageSelector {
    gap: 10px;
    font-size: 14px;
  }
  
  .phone {
    font-size: 14px;
    margin-left: 10px;
  }
  
  .email,
  .address {
    display: none;
  }
  
  .burger {
    display: flex;
  }
  
  .nav {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: #fff;
    flex-direction: column;
    gap: 0;
    margin: 0;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transform: translateX(-100%);
    transition: transform 0.3s;
  }
  
  .navOpen {
    transform: translateX(0);
  }
  
  .nav a {
    padding: 15px;
    border-bottom: 1px solid #eee;
    width: 100%;
  }
  
  .aiChatBtn {
    margin: 10px 0 0 0;
    padding: 15px;
    text-align: center;
  }
}

/* Маленькие мобильные */
@media (max-width: 480px) {
  .languageSelector {
    gap: 8px;
    font-size: 12px;
  }
  
  .phone {
    font-size: 12px;
    margin-left: 5px;
  }
  
  .logoImg {
    height: 30px;
  }
}
</style>