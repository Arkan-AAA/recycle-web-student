import { reactive } from 'vue'

const theme = reactive({
  isDark: localStorage.getItem('theme') === 'dark',
  toggle() {
    this.isDark = !this.isDark
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light')
  },
  init() {
    document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light')
  }
})

export default theme
