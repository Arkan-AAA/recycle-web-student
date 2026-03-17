import { reactive } from 'vue'

const cache = {}

const SUPPORTED_LOCALES = ['ru', 'kz', 'en']

const loadLocale = async (locale) => {
    if (!SUPPORTED_LOCALES.includes(locale)) {
        console.warn(`Unsupported locale: ${locale}, falling back to 'ru'`)
        locale = 'ru'
    }
    if (!cache[locale]) {
        const { default: messages } = await import(`./locales/${locale}.js`)
        cache[locale] = messages
    }
    return cache[locale]
}

const i18n = reactive({
    locale: SUPPORTED_LOCALES.includes(localStorage.getItem('locale')) ? localStorage.getItem('locale') : 'ru',
    messages: {},
    t(key) {
        return key.split('.').reduce((o, k) => o?.[k], this.messages) ?? key
    },
    async setLocale(locale) {
        this.messages = await loadLocale(locale)
        this.locale = locale
        localStorage.setItem('locale', locale)
    }
})

loadLocale(i18n.locale).then(messages => { i18n.messages = messages })

export default i18n
