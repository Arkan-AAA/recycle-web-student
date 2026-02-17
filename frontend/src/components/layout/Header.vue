<template>
  <header :class="$style.header">
    <!-- Черная полоса сверху -->
    <div :class="$style.topBar">
      <div :class="$style.container">
        <div :class="$style.languageSelector">
          <div :class="[$style.lang, { [$style.active]: $i18n.locale === 'ru' }]" @click="$i18n.setLocale('ru')">RU</div>
          <div :class="[$style.lang, { [$style.active]: $i18n.locale === 'kz' }]" @click="$i18n.setLocale('kz')">KZ</div>
          <div :class="[$style.lang, { [$style.active]: $i18n.locale === 'en' }]" @click="$i18n.setLocale('en')">EN</div>
        </div>
        <a :class="$style.phone" href="tel:77273132028" target="_blank">+7 (727) 313-20-28</a>
        <div :class="$style.email">info@college-narxoz.kz</div>
        <div :class="$style.address">050035, г. Алматы, 10-й микрорайон 7А</div>
        <router-link to="/login" :class="$style.loginBtn">{{ $i18n.t('nav.login') }}</router-link>
      </div>
    </div>
    
    <!-- Белая полоса с навигацией -->
    <div :class="$style.navBar">
      <div :class="$style.container">
        <a href="https://collegenarxoz.kz/" target="_blank" :class="$style.logo">
          <img src="../../assets/images/logo1.svg" alt="College Narxoz" :class="$style.logoImg" />
        </a>
        <nav :class="$style.nav">
          <router-link to="/">{{ $i18n.t('nav.home') }}</router-link>
          <router-link to="/news">{{ $i18n.t('nav.news') }}</router-link>
          <router-link to="/profile">{{ $i18n.t('nav.profile') }}</router-link>
          <router-link to="/admin">{{ $i18n.t('nav.admin') }}</router-link>
        </nav>
        <router-link to="/aichat" :class="$style.aiChatBtn">{{ $i18n.t('nav.aiChat') }}</router-link>
      </div>
    </div>
  </header>
</template>
<style  module>.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  font-family: Inter;
}

/* Черная полоса сверху */
.topBar {
  background-color: #252525;
  color: #fff;
  height: 69px;
  display: flex;
  align-items: center;
}

/* Белая полоса с навигацией */
.navBar {
  background-color: #ffffff;
  height: 81px;
  display: flex;
  align-items: center;
}

.container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 34px;
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Элементы черной полосы */
.languageSelector {
  display: flex;
  gap: 20px;
  background-color: #000;
  border-radius: 15px;
  padding: 10px 20px;
  font-size: 20px;
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
  font-size: 20px;
  margin-left: 50px;
}

.address {
  font-size: 20px;
  margin-left: auto;
}

.loginBtn {
  background-color: #d90135;
  color: #faf9f6;
  border: none;
  border-radius: 10px;
  padding: 15px 40px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-left: 20px;
}

/* Элементы белой полосы */
.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logoImg {
  height: 60px;
  width: auto;
}

.nav {
  display: flex;
  gap: 60px;
  margin-left: 100px;
}

.nav a {
  color: #252525;
  text-decoration: none;
  font-size: 20px;
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
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-left: auto;
  text-decoration: none;
  display: inline-block;
}

/* Tablet */
@media (max-width: 1024px) {
  .container {
    padding: 0 15px;
    gap: 10px;
  }
  
  .email,
  .address {
    font-size: 14px;
  }
  
  .phone {
    font-size: 14px;
  }
  
  .nav {
    gap: 20px;
    margin-left: 20px;
  }
  
  .nav a {
    font-size: 16px;
  }
  
  .aiChatBtn {
    padding: 10px 30px;
    font-size: 16px;
  }
  
  .loginBtn {
    padding: 10px 20px;
    font-size: 16px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .topBar,
  .navBar {
    height: auto;
  }
  
  .container {
    padding: 10px;
    gap: 8px;
    justify-content: center;
  }
  
  .languageSelector {
    gap: 10px;
    padding: 6px 12px;
    font-size: 14px;
  }
  
  .phone,
  .email,
  .address {
    display: none;
  }
  
  .loginBtn {
    padding: 8px 15px;
    font-size: 14px;
    margin-left: 0;
  }
  
  .logoImg {
    height: 40px;
  }
  
  .nav {
    gap: 15px;
    margin-left: 10px;
    width: 100%;
    justify-content: center;
  }
  
  .nav a {
    font-size: 14px;
  }
  
  .aiChatBtn {
    padding: 8px 20px;
    font-size: 14px;
    margin-left: 0;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .languageSelector {
    font-size: 12px;
    gap: 8px;
    padding: 5px 10px;
  }
  
  .loginBtn {
    font-size: 12px;
    padding: 6px 12px;
  }
  
  .logoImg {
    height: 35px;
  }
  
  .nav {
    gap: 10px;
  }
  
  .nav a {
    font-size: 12px;
  }
  
  .aiChatBtn {
    font-size: 12px;
    padding: 6px 15px;
  }
}

</style>