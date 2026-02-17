<template>
  <div id="app">
    <Header />
    <main :class="{ 'main-content': $route.path !== '/auth' }">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from './components/layout/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Rubik', sans-serif;
}

.main-content {
  margin-top: 100px;
  min-height: calc(100vh - 100px);
}

@media (max-width: 768px) {
  .main-content {
    margin-top: 120px;
  }
}

@media (max-width: 480px) {
  .main-content {
    margin-top: 100px;
  }
}
</style>