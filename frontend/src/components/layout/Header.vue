<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import authService from '../../services/auth.service';

const mobileMenuOpen = ref(false);
const educationMenuOpen = ref(false);
const route = useRoute();
const isAuthPage = computed(() => route.path === '/');
const isAdmin = computed(() => authService.isAdmin());

const isActive = (path) => route.path === path;

const isEducationActive = computed(() => {
  const educationPaths = ['/education', '/journal', '/schedule', '/transcript', '/grades', '/diploma', '/notifications'];
  return educationPaths.includes(route.path);
});

const toggleEducationMenu = () => {
  educationMenuOpen.value = !educationMenuOpen.value;
};
</script>
<template>
  <header v-if="!isAuthPage" :class="$style.header">
    <div :class="$style.rectangleParent">
      <div :class="$style.groupChild" />
      <img :class="$style.logo11Icon" src="../../assets/images/logo-footer1.svg" alt="College Narxoz" />
      <nav :class="[$style.nav, { [$style.navOpen]: mobileMenuOpen }]">
        <router-link to="/home" :class="[$style.div, { [$style.active]: isActive('/home') }]" @click="mobileMenuOpen = false">{{ $t('nav.home') }}</router-link>
        <router-link to="/news" :class="[$style.div2, { [$style.active]: isActive('/news') }]" @click="mobileMenuOpen = false">{{ $t('nav.news') }}</router-link>
        <div :class="$style.educationWrapper">
          <a :class="[$style.div3, { [$style.active]: isEducationActive || educationMenuOpen }]" @click="toggleEducationMenu">{{ $t('nav.education') }}</a>
          <div v-if="educationMenuOpen" :class="$style.dropdown">
            <router-link to="/journal" :class="[$style.dropdownItem, { [$style.dropdownActive]: isActive('/journal') }]" @click="educationMenuOpen = false; mobileMenuOpen = false">{{ $t('nav.journal') }}</router-link>
            <router-link to="/schedule" :class="[$style.dropdownItem, { [$style.dropdownActive]: isActive('/schedule') }]" @click="educationMenuOpen = false; mobileMenuOpen = false">{{ $t('nav.schedule') }}</router-link>
            <router-link to="/transcript" :class="[$style.dropdownItem, { [$style.dropdownActive]: isActive('/transcript') }]" @click="educationMenuOpen = false; mobileMenuOpen = false">{{ $t('nav.transcript') }}</router-link>
            <router-link to="/grades" :class="[$style.dropdownItem, { [$style.dropdownActive]: isActive('/grades') }]" @click="educationMenuOpen = false; mobileMenuOpen = false">{{ $t('nav.grades') }}</router-link>
            <router-link to="/diploma" :class="[$style.dropdownItem, { [$style.dropdownActive]: isActive('/diploma') }]" @click="educationMenuOpen = false; mobileMenuOpen = false">{{ $t('nav.diploma') }}</router-link>
            <router-link to="/notifications" :class="[$style.dropdownItem, { [$style.dropdownActive]: isActive('/notifications') }]" @click="educationMenuOpen = false; mobileMenuOpen = false">{{ $t('nav.notifications') }}</router-link>
          </div>
        </div>
        <router-link to="/profile" :class="[$style.div4, { [$style.active]: isActive('/profile') }]" @click="mobileMenuOpen = false">{{ $t('nav.profile') }}</router-link>
        <router-link to="/aichat" :class="[$style.div5, { [$style.active]: isActive('/aichat') }]" @click="mobileMenuOpen = false">{{ $t('nav.aiChat') }}</router-link>
        <router-link v-if="isAdmin" to="/admin" :class="[$style.adminBtn, { [$style.active]: isActive('/admin') }]" @click="mobileMenuOpen = false">{{ $t('nav.admin') }}</router-link>
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

.educationWrapper {
  position: relative;
}

.div3 {
  position: absolute;
  top: 18px;
  left: 1001px;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}

.div3:hover {
  color: #d50032;
}

.dropdown {
  position: absolute;
  top: 45px;
  left: 1001px;
  transform: translateX(-50%);
  margin-left: 85px;
  background: #fff;
  min-width: 220px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1001;
}

.dropdownItem {
  display: block;
  padding: 15px 20px;
  color: #1e1e1e;
  text-decoration: none;
  font-weight: 400;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s;
  background: #fff;
  text-align: center;
}

.dropdownItem:hover {
  background: #f5f5f5;
}

.dropdownActive {
  background: #d50032 !important;
  color: #fff !important;
  font-weight: 500;
}

.dropdownActive:hover {
  background: #b8002a !important;
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

.adminBtn {
  position: absolute;
  top: 18px;
  left: 1700px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  background: #d50032;
  padding: 8px 16px;
  border-radius: 4px;
}

.adminBtn:hover {
  background: #b8002a;
  color: #fff;
}

@media (max-width: 1600px) {
  .div { left: 450px; }
  .div2 { left: 620px; }
  .div3 { left: 800px; }
  .dropdown { left: 800px; margin-left: 85px; }
  .div4 { left: 1080px; }
  .div5 { left: 1250px; }
  .adminBtn { left: 1400px; }
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
  .dropdown { left: 600px; margin-left: 85px; }
  .div4 { left: 850px; font-size: 20px; }
  .div5 { left: 980px; font-size: 20px; }
  .adminBtn { left: 1120px; font-size: 16px; }
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
  
  .adminBtn {
    position: static;
    padding: 15px;
    border-bottom: 1px solid #eee;
    width: 100%;
    text-align: left;
    font-size: 18px;
    border-radius: 0;
  }
}
</style>