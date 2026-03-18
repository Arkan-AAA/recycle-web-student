<template>
  <div id="app">
    <Header />
    <main :class="{ 'main-content': $route.path !== '/' }" :style="$route.path === '/' ? 'margin-top: 0' : ''">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import theme from './services/theme.service.js'

export default {
  name: 'App',
  components: { Header, Footer },
  created() {
    theme.init()
  }
}
</script>

<style>
#app {
  font-family: 'Rubik', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
}

.main-content {
  margin-top: var(--header-height);
  min-height: calc(100vh - var(--header-height));
  flex: 1;
  background: var(--bg-page);
  color: var(--text-primary);
  transition: background 0.3s ease, color 0.3s ease;
}

@media (max-width: 768px) {
  .main-content { margin-top: var(--header-height); }
}
</style>
