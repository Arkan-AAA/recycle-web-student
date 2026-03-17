import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

const app = createApp(App)
app.config.globalProperties.$i18n = i18n
app.config.globalProperties.$t = (key) => i18n.t(key)
app.use(router).mount('#app')
