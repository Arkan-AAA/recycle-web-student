<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const mobileMenuOpen = ref(false);
const route = useRoute();
const isAuthPage = computed(() => route.path === '/');

const isActive = (path) => route.path === path;
</script>
<template>
  <header v-if="!isAuthPage" :class="$style.header">
    <div :class="$style.rectangleParent">
      <div :class="$style.groupChild" />
      <img :class="$style.logo11Icon" src="../../assets/images/logo-footer1.svg" alt="College Narxoz" />
      <nav :class="[$style.nav, { [$style.navOpen]: mobileMenuOpen }]">
        <router-link to="/home" :class="[$style.div, { [$style.active]: isActive('/home') }]" @click="mobileMenuOpen = false">ГЛАВНАЯ</router-link>
        <router-link to="/news" :class="[$style.div2, { [$style.active]: isActive('/news') }]" @click="mobileMenuOpen = false">НОВОСТИ</router-link>
        <router-link to="/education" :class="[$style.div3, { [$style.active]: isActive('/education') }]" @click="mobileMenuOpen = false">УЧЕБНЫЙ ПРОЦЕСС</router-link>
        <router-link to="/profile" :class="[$style.div4, { [$style.active]: isActive('/profile') }]" @click="mobileMenuOpen = false">ПРОФИЛЬ</router-link>
        <router-link to="/aichat" :class="[$style.div5, { [$style.active]: isActive('/aichat') }]" @click="mobileMenuOpen = false">ЧАТ ИИ</router-link>
      </nav>
    </div>
  </header>
</template>
<style module>
.header {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  text-align: center;
  font-size: 16px;
  color: #1e1e1e;
}

.rectangleParent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
}

.groupChild {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #1e1e1e;
  width: 100%;
  height: 60px;
}

.logo11Icon {
  position: absolute;
  top: 10px;
  left: 32px;
  width: 180px;
  height: 40px;
}

.nav {
  display: contents;
}

.div {
  position: absolute;
  top: 18px;
  left: 578px;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
}

.div:hover {
  color: #d50032;
}

.active {
  color: #d50032 !important;
}

.div2 {
  position: absolute;
  top: 18px;
  left: 788px;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
}

.div2:hover {
  color: #d50032;
}

.div3 {
  position: absolute;
  top: 18px;
  left: 1001px;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
}

.div3:hover {
  color: #d50032;
}

.div4 {
  position: absolute;
  top: 18px;
  left: 1337px;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
}

.div4:hover {
  color: #d50032;
}

.div5 {
  position: absolute;
  top: 18px;
  left: 1556px;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
}

.div5:hover {
  color: #d50032;
}

@media (max-width: 1600px) {
  .div { left: 450px; }
  .div2 { left: 620px; }
  .div3 { left: 800px; }
  .div4 { left: 1080px; }
  .div5 { left: 1250px; }
}

@media (max-width: 1200px) {
  .logo11Icon {
    width: 180px;
    height: 48px;
    top: 26px;
  }
  
  .div { left: 300px; font-size: 20px; }
  .div2 { left: 450px; font-size: 20px; }
  .div3 { left: 600px; font-size: 20px; }
  .div4 { left: 850px; font-size: 20px; }
  .div5 { left: 980px; font-size: 20px; }
}

@media (max-width: 768px) {
  .header {
    height: 70px;
  }
  
  .rectangleParent {
    height: 70px;
  }
  
  .groupChild {
    height: 70px;
  }
  
  .logo11Icon {
    width: 150px;
    height: 40px;
    top: 15px;
    left: 15px;
  }
  
  .nav {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: #fff;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transform: translateX(-100%);
    transition: transform 0.3s;
    display: flex;
    gap: 0;
  }
  
  .navOpen {
    transform: translateX(0);
  }
  
  .div, .div2, .div3, .div4, .div5 {
    position: static;
    padding: 15px;
    border-bottom: 1px solid #eee;
    width: 100%;
    text-align: left;
    font-size: 18px;
  }
}
</style>