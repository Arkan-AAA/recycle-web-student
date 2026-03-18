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

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  educationMenuOpen.value = false;
};
</script>

<template>
  <header v-if="!isAuthPage" class="header">
    <div class="header-container">
      <div class="header-background"></div>
      
      <!-- Логотип -->
      <div class="logo-container">
        <img class="logo" src="../../assets/images/logo-footer1.svg" alt="College Narxoz" />
      </div>
      
      <!-- Мобильное меню кнопка -->
      <button class="mobile-menu-toggle d-lg-none" @click="toggleMobileMenu" :class="{ active: mobileMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <!-- Навигация -->
      <nav class="nav" :class="{ 'nav-open': mobileMenuOpen }">
        <div class="nav-overlay d-lg-none" @click="closeMobileMenu"></div>
        <div class="nav-content">
          <router-link 
            to="/home" 
            class="nav-link" 
            :class="{ active: isActive('/home') }" 
            @click="closeMobileMenu"
          >
            {{ $t('nav.home') }}
          </router-link>
          
          <router-link 
            to="/news" 
            class="nav-link" 
            :class="{ active: isActive('/news') }" 
            @click="closeMobileMenu"
          >
            {{ $t('nav.news') }}
          </router-link>
          
          <!-- Выпадающее меню образования -->
          <div class="education-dropdown">
            <a 
              class="nav-link dropdown-toggle" 
              :class="{ active: isEducationActive || educationMenuOpen }" 
              @click="toggleEducationMenu"
            >
              {{ $t('nav.education') }}
              <svg class="dropdown-arrow" :class="{ rotated: educationMenuOpen }" width="12" height="8" viewBox="0 0 12 8">
                <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
            </a>
            
            <div class="dropdown-menu" :class="{ show: educationMenuOpen }">
              <router-link 
                to="/journal" 
                class="dropdown-item" 
                :class="{ active: isActive('/journal') }" 
                @click="closeMobileMenu"
              >
                {{ $t('nav.journal') }}
              </router-link>
              <router-link 
                to="/schedule" 
                class="dropdown-item" 
                :class="{ active: isActive('/schedule') }" 
                @click="closeMobileMenu"
              >
                {{ $t('nav.schedule') }}
              </router-link>
              <router-link 
                to="/transcript" 
                class="dropdown-item" 
                :class="{ active: isActive('/transcript') }" 
                @click="closeMobileMenu"
              >
                {{ $t('nav.transcript') }}
              </router-link>
              <router-link 
                to="/grades" 
                class="dropdown-item" 
                :class="{ active: isActive('/grades') }" 
                @click="closeMobileMenu"
              >
                {{ $t('nav.grades') }}
              </router-link>
              <router-link 
                to="/diploma" 
                class="dropdown-item" 
                :class="{ active: isActive('/diploma') }" 
                @click="closeMobileMenu"
              >
                {{ $t('nav.diploma') }}
              </router-link>
              <router-link 
                to="/notifications" 
                class="dropdown-item" 
                :class="{ active: isActive('/notifications') }" 
                @click="closeMobileMenu"
              >
                {{ $t('nav.notifications') }}
              </router-link>
            </div>
          </div>
          
          <router-link 
            to="/profile" 
            class="nav-link" 
            :class="{ active: isActive('/profile') }" 
            @click="closeMobileMenu"
          >
            {{ $t('nav.profile') }}
          </router-link>
          
          <router-link 
            to="/aichat" 
            class="nav-link" 
            :class="{ active: isActive('/aichat') }" 
            @click="closeMobileMenu"
          >
            {{ $t('nav.aiChat') }}
          </router-link>
          
          <router-link 
            v-if="isAdmin" 
            to="/admin" 
            class="nav-link admin-btn" 
            :class="{ active: isActive('/admin') }" 
            @click="closeMobileMenu"
          >
            {{ $t('nav.admin') }}
          </router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #1e1e1e;
  height: var(--header-height);
  box-shadow: var(--shadow-md);
}

.header-container {
  position: relative;
  height: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #1e1e1e;
  z-index: -1;
}

.logo-container {
  flex-shrink: 0;
}

.logo {
  height: 40px;
  width: auto;
}

/* Мобильное меню кнопка */
.mobile-menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.mobile-menu-toggle span {
  width: 100%;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.mobile-menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* Навигация */
.nav {
  display: flex;
  align-items: center;
}

.nav-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: var(--font-size-base);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-link:hover {
  color: #d50032;
  background: rgba(213, 0, 50, 0.1);
}

.nav-link.active {
  color: #d50032;
  background: rgba(213, 0, 50, 0.1);
}

.admin-btn {
  background: #d50032;
  color: white !important;
}

.admin-btn:hover {
  background: #b8002a;
  color: white !important;
}

/* Выпадающее меню */
.education-dropdown {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;
}

.dropdown-arrow {
  transition: transform 0.2s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  min-width: 220px;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%) translateY(-10px);
  transition: all 0.2s ease;
  z-index: 1001;
  margin-top: var(--spacing-sm);
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.dropdown-item {
  display: block;
  padding: var(--spacing-md) var(--spacing-lg);
  color: var(--dark-color);
  text-decoration: none;
  font-weight: 400;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s ease;
}

.dropdown-item:last-child {
  border-bottom: none;
  border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
}

.dropdown-item:first-child {
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
}

.dropdown-item:hover {
  background: #f8f9fa;
  color: #d50032;
}

.dropdown-item.active {
  background: #d50032;
  color: white;
}

.dropdown-item.active:hover {
  background: #b8002a;
}

/* Планшеты */
@media (max-width: 991.98px) {
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .nav.nav-open {
    opacity: 1;
    visibility: visible;
  }
  
  .nav-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .nav-content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 320px;
    max-width: 80vw;
    background: #1e1e1e;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: var(--spacing-xl) 0;
    box-shadow: var(--shadow-lg);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }
  
  .nav.nav-open .nav-content {
    transform: translateX(0);
  }
  
  .nav-link {
    color: #fff;
    padding: var(--spacing-lg) var(--spacing-xl);
    border-bottom: 1px solid #333;
    border-radius: 0;
    font-size: var(--font-size-lg);
  }
  
  .nav-link:hover {
    background: rgba(213,0,50,0.1);
    color: #d50032;
  }
  
  .admin-btn {
    background: #d50032;
    color: white !important;
    margin: var(--spacing-md) var(--spacing-xl);
    border-radius: var(--border-radius);
    text-align: center;
  }
  
  /* Выпадающее меню в мобильной версии */
  .dropdown-menu {
    position: static;
    transform: none;
    box-shadow: none;
    background: #2a2a2a;
    margin: 0;
    border-radius: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }
  
  .dropdown-menu.show {
    max-height: 400px;
  }
  
  .dropdown-item {
    color: #ccc;
    padding: var(--spacing-md) var(--spacing-xxl);
    font-size: var(--font-size-base);
    border-bottom: 1px solid #333;
  }
  
  .dropdown-arrow {
    margin-left: auto;
  }
}

/* Мобильные устройства */
@media (max-width: 575.98px) {
  .header-container {
    padding: 0 var(--spacing-sm);
  }
  
  .logo {
    height: 35px;
  }
  
  .nav-content {
    width: 280px;
    padding: var(--spacing-lg) 0;
  }
  
  .nav-link {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-base);
  }
  
  .dropdown-item {
    padding: var(--spacing-sm) var(--spacing-xl);
    font-size: var(--font-size-sm);
  }
}

/* Очень маленькие экраны */
@media (max-width: 399.98px) {
  .header-container {
    padding: 0 var(--spacing-xs);
  }
  
  .logo {
    height: 30px;
  }
  
  .nav-content {
    width: 100vw;
  }
}
</style>