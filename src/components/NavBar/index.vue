<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { MenuItem } from '@/types/navbar'
import { useScroll } from '@/composables/useScroll'
import { useRoute } from 'vue-router'

const isDark = ref(false)
const isMenuVisible = ref(false)
const navbarRef = ref<HTMLElement | null>(null)
const activeItem = ref('')

const { setNavbar } = useScroll()

const route = useRoute()

onMounted(() => {
  setNavbar(navbarRef.value)
  setActiveItem(route.path)
})

watch(() => route.path, (newPath) => {
  setActiveItem(newPath)
})

const menuItems: MenuItem[] = [
  { id: 'home', text: '首页', link: '/' },
  { id: 'create', text: '创作', link: '/create' },
  { id: 'team', text: '团队', link: '/team' },
  { id: 'blogs', text: '博客', link: '/blogs' },
  { id: 'links', text: '动态', link: '/morelinks' },
  { id: 'contact', text: '联系我们', link: '/contact' },
]

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value
}

const setActiveItem = (path: string) => {
  activeItem.value = path
}
</script>
<template>

  <div>
    <div class="main-menu" :style="{ display: isMenuVisible ? 'block' : 'none' }">
      <div class="main-menu-item-holder">
        <h2
          v-for="item in menuItems"
          :key="item.id"
          class="barlow-extralight text-center"
          :id="item.id"
        >
          <router-link v-if="item.link" :to="item.link">{{ item.text }}</router-link>
          <span v-else>{{ item.text }}</span>
        </h2>
      </div>
      <img src="@/assets/images/menu-image.svg" class="main-menu-image" alt="打开菜单" />
    </div>
    <div class="navbar" ref="navbarRef">
      <div class="navbar-dsc-logo">
        <img
          data-aos="fade-up"
          src="@/assets/images/logo.svg"
          :class="['logo-nav', { 'logo-nav-light': !isDark }]"
          alt="Token"
          style="height: 40px; margin-right: 45px; margin-left: -20px"
        />
      </div>
      <nav class="menu barlow-extralight">
        <div v-for="item in menuItems" :key="item.id" class="menu-item" :id="`${item.id}-desk`">
          <router-link 
            v-if="item.link" 
            :to="item.link" 
            :class="{ 'active': activeItem === item.link }"
            @click="setActiveItem(item.link)"
          >
            {{ item.text }}
          </router-link>
          <span v-else>{{ item.text }}</span>
        </div>
      </nav>
      <div class="menu-phone" id="menu-open" @click="toggleMenu">
        <svg xmlns="http://www.w3.org/2000/svg" width="36.68" height="21" viewBox="0 0 36.68 21">
          <g id="Group_7" transform="translate(-1000.435 -266.349)">
            <path
              id="Path_6"
              d="M-223.854-311.151h27.406"
              transform="translate(1233.563 578)"
              stroke-width="1"
            />
            <path
              id="Path_7"
              d="M-223.854-311.151h18.34"
              transform="translate(1242.629 588)"
              stroke-width="1"
            />
            <path
              id="Path_8"
              d="M-223.854-311.151h36.68"
              transform="translate(1224.289 598)"
              stroke-width="1"
            />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-item {
  position: relative;
  transition: all 0.3s ease;
}

.menu-item a {
  color: #333;
  text-decoration: none;
  padding: 8px 16px;
  position: relative;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
}

.menu-item a::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(66, 133, 244, 0.1);
  border-radius: 4px;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.menu-item a:hover {
  transform: translateY(-2px);
}

.menu-item a:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}

.menu-item a.active {
  color: #4285f4 !important;
  font-weight: 500 !important;
  transform: translateY(-2px);
}

.menu-item a.active::before {
  transform: scaleX(1);
  background: rgba(66, 133, 244, 0.1);
}

/* 覆盖默认的router-link-active样式 */
.menu-item a.router-link-active:not(.active) {
  color: inherit;
  font-weight: inherit;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(66, 133, 244, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(66, 133, 244, 0);
  }
}

.menu-item a.active::before {
  animation: pulse 2s infinite;
}
</style>


