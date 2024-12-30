import { createApp, onBeforeMount, onMounted } from 'vue'
import App from './App.vue'
import router from './router'

import components from '@/components'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './assets/css/googleapis_fonts.css'
import './styles/index.css'
const app = createApp(App)

AOS.init()

app.use(components)
app.use(router)

app.mount('#app')
