import { ref, onMounted, onUnmounted } from 'vue'

export function useDown() {
  const down = ref<HTMLElement | null>(null)

  const setDownArrow = (el: HTMLElement | null) => {
    down.value = el
    down.value?.addEventListener('click', handleClick)
  }

  const smoothScroll = (target: Element) => {
    const startPosition = window.pageYOffset
    const targetPosition = target.getBoundingClientRect().top + startPosition
    const distance = targetPosition - startPosition
    const duration = 1000 // 滚动持续时间（毫秒）
    let start: number | null = null

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime
      const timeElapsed = currentTime - start
      const progress = Math.min(timeElapsed / duration, 1)
      
      // easeInOutQuad 缓动函数
      const ease = (t: number) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      }

      window.scrollTo(0, startPosition + distance * ease(progress))

      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }

  const handleClick = () => {
    if (!down.value) return
    const target = document.querySelector('#our-work-scroll')
    if (target) {
      smoothScroll(target)
    }
  }
  
  onUnmounted(() => {
    down.value?.removeEventListener('click', handleClick)
  })

  return {
    setDownArrow,
  }
}
