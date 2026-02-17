<template>
  <div id="app">
    <Header />
    <main :class="$style.mainContent">
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

<style module>
.mainContent {
  margin-top: 150px;
  min-height: calc(100vh - 150px);
}

@media (max-width: 768px) {
  .mainContent {
    margin-top: 120px;
  }
}

@media (max-width: 480px) {
  .mainContent {
    margin-top: 100px;
  }
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
}
</style>