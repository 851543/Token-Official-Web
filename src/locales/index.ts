import { createI18n } from 'vue-i18n'
import en from './en-US'
import zh from './zh-CN'

const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  globalInjection: true,
  messages: {
    'en-US': en,
    'zh-CN': zh,
  },
  numberFormats: {
    'en-US': {
      currency: { style: 'currency', currency: 'USD' },
    },
    'zh-CN': {
      currency: { style: 'currency', currency: 'CNY' },
    },
  },
  datetimeFormats: {
    'en-US': {
      short: { year: 'numeric', month: 'short', day: 'numeric' },
    },
    'zh-CN': {
      short: { year: 'numeric', month: 'long', day: 'numeric' },
    },
  },
})

export default i18n 