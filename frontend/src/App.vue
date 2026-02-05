<template>
  <div id="app">
    <h1>Студенческий журнал колледжа</h1>
    <p>Проект в разработке...</p>
    <nav>
      <router-link to="/">Главная</router-link> |
      <router-link to="/news">Новости</router-link> |
      <router-link to="/profile">Профиль</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>