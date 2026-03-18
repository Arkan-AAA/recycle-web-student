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

export default {
  name: 'App',
  components: { Header, Footer }
}
</script>

<style>
#app {
  font-family: 'Rubik', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  margin-top: var(--header-height);
  min-height: calc(100vh - var(--header-height));
  flex: 1;
}

@media (max-width: 768px) {
  .main-content { margin-top: var(--header-height); }
}
</style>