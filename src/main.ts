import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import components from '@/components'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './assets/css/googleapis_fonts.css'
import './styles/index.css'
const app = createApp(App)

// 初始化 AOS
AOS.init()

app.use(components)
app.use(router)

app.mount('#app')
