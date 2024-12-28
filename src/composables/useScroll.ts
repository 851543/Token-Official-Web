import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// 滚动效果
export function useScroll() {
  const router = useRouter()
  const navbar = ref<HTMLElement | null>(null)

  const setNavbar = (el: HTMLElement | null) => {
    navbar.value = el
  }

  const handleScroll = () => {
    if (!navbar.value) return

    if (window.scrollY > 100) {
      navbar.value.classList.add('navbar-scrolled')
    } else {
      navbar.value.classList.remove('navbar-scrolled')
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)

    router.beforeEach((to, from, next) => {
      if (navbar.value) {
        navbar.value.classList.remove('navbar-scrolled')
      }
      next()
    })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    setNavbar,
  }
}
