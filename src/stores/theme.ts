import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', 
  () => {
    const isDark = ref(false)

    const setTheme = (dark: boolean) => {
      isDark.value = dark
      document.documentElement.classList.toggle('dark', dark)
    }

    const toggleTheme = () => {
      setTheme(!isDark.value)
    }

    const initTheme = () => {
      document.documentElement.classList.toggle('dark', isDark.value)
    }

    return {
      isDark,
      setTheme,
      toggleTheme,
      initTheme
    }
  }, {
    persist: true,
  }) 