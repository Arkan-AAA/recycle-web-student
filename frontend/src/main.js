import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n/navLangs.js'

const app = createApp(App)
app.config.globalProperties.$i18n = i18n
app.use(router).mount('#app')