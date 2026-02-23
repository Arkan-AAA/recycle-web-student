import { reactive } from 'vue'

const translations = {
  ru: {
    nav: {
      home: 'Главная',
      news: 'Новости',
      study: 'Учебный процесс',
      profile: 'Профиль',
      aiChat: 'ЧАТ С ИИ'
    }
  },
  kz: {
    nav: {
      home: 'Басты бет',
      news: 'Жаңалықтар',
      study: 'Оку процессi',
      profile: 'Профиль',
      aiChat: 'ЖИ ЧАТ'
    }
  },
  en: {
    nav: {
      home: 'Home',
      news: 'News',
      study: 'Study Process',
      profile: 'Profile',
      aiChat: 'AI CHAT'
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
