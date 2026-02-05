import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [vue()],
  root: ".",  // корень проекта
  publicDir: "public",  // папка для статики
  build: {
    outDir: "dist"
  },
  server: {
    port: 3000,
    open: true
  }
})
