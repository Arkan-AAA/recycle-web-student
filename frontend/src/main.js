import { createApp, computed } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './assets/styles/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)
app.config.globalProperties.$i18n = i18n
// $t читает i18n.locale — Vue отслеживает зависимость и перерисовывает при смене языка
app.config.globalProperties.$t = function(key) {
  // обращение к locale создаёт реактивную зависимость
  void i18n.locale
  return i18n.t(key)
}
app.use(router).mount('#app')
