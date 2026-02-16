import { reactive } from 'vue'

const translations = {
  ru: {
    nav: {
      home: 'Главная',
      news: 'Новости',
      profile: 'Профиль',
      admin: 'Админ Панель',
      aiChat: 'ЧАТ С ИИ',
      login: 'ВОЙТИ'
    }
  },
  kz: {
    nav: {
      home: 'Басты бет',
      news: 'Жаңалықтар',
      profile: 'Профиль',
      admin: 'Әкімші Панель',
      aiChat: 'ЖИ ЧАТ',
      login: 'КІРУ'
    }
  },
  en: {
    nav: {
      home: 'Home',
      news: 'News',
      profile: 'Profile',
      admin: 'Admin',
      aiChat: 'AI CHAT',
      login: 'LOGIN'
    }
  }
}

const i18n = reactive({
  locale: localStorage.getItem('locale') || 'ru',
  messages: translations,
  t(key) {
    return key.split('.').reduce((o, i) => o[i], this.messages[this.locale])
  },
  setLocale(locale) {
    this.locale = locale
    localStorage.setItem('locale', locale)
  }
})

export default i18n
