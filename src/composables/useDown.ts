import { ref, onMounted, onUnmounted } from 'vue'

export function useDown() {
  const down = ref<HTMLElement | null>(null)

  const setDownArrow = (el: HTMLElement | null) => {
    down.value = el
    down.value?.addEventListener('click', handleClick)
  }

  const handleClick = () => {
    if (!down.value) return
    console.log(down.value)
    const target = document.querySelector('#our-work-scroll')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  onUnmounted(() => {
    down.value?.removeEventListener('click', handleClick)
  })

  return {
    setDownArrow,
  }
}
