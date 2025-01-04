import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Language } from '@/types/i18n'

export const useLangStore = defineStore('lang', () => {
  const currentLang = ref<Language>('zh-CN')

  const setLang = (lang: Language) => {
    currentLang.value = lang
  }

  return {
    currentLang,
    setLang,
  }
}, {
  persist: true,
}) 