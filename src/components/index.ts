import type { App } from 'vue'
import NavBar from './NavBar/index.vue'
import Footer from './Footer/index.vue'
import Live2d from './Live2d/index.vue'

export default {
  install(app: App) {
    app.component('NavBar', NavBar)
    app.component('Footer', Footer)
    app.component('Live2d', Live2d)
    // 将来可以在这里注册更多全局组件
  },
}
