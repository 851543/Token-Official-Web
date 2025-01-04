<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import type { MenuItem } from '@/types/navbar'
import { useScroll } from '@/composables/useScroll'
import { useRoute } from 'vue-router'
import { useThemeStore } from '@/stores/theme'

interface ExtendedHTMLElement extends HTMLElement {
  clickOutsideEvent?: (event: Event) => void
}

const vClickOutside = {
  mounted(el: ExtendedHTMLElement, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: ExtendedHTMLElement) {
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent)
    }
  },
}

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)
const isMenuVisible = ref(false)
const navbarRef = ref<HTMLElement | null>(null)
const activeItem = ref('')
const isLangHovered = ref(false)
const isLangMenuOpen = ref(false)
const currentLang = ref('简体')

const { setNavbar } = useScroll()

const route = useRoute()

onMounted(() => {
  setNavbar(navbarRef.value)
  setActiveItem(route.path)
  themeStore.initTheme()
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
  { id: 'message', text: '留言板', link: '/message' },
  { id: 'contact', text: '联系我们', link: '/contact' },
]

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value
}

const setActiveItem = (path: string) => {
  activeItem.value = path
}

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const toggleLangMenu = () => {
  isLangMenuOpen.value = !isLangMenuOpen.value
}

const selectLang = (lang: string) => {
  currentLang.value = lang
  isLangMenuOpen.value = false
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
    <div class="toggle-group">
      <div class="lang-toggle" 
           @mouseenter="isLangHovered = true"
           @mouseleave="isLangHovered = false"
           @click="toggleLangMenu"
           v-click-outside="() => isLangMenuOpen = false">
        <div class="lang-content">
          <svg xmlns="http://www.w3.org/2000/svg" class="lang-icon" viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
          </svg>
          <transition name="slide-fade">
            <span v-if="isLangHovered || isLangMenuOpen" class="lang-text">{{ currentLang }}</span>
          </transition>
        </div>
      </div>
      <transition name="menu-fade">
        <div v-if="isLangMenuOpen" class="lang-menu">
          <div class="lang-option" 
               :class="{ 'selected': currentLang === 'English' }"
               @click="selectLang('English')">
            <span>English</span>
            <svg v-if="currentLang === 'English'" class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
          </div>
          <div class="lang-option" 
               :class="{ 'selected': currentLang === '简体' }"
               @click="selectLang('简体')">
            <span>简体</span>
            <svg v-if="currentLang === '简体'" class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
          </div>
          <div class="lang-option" 
               :class="{ 'selected': currentLang === '繁體' }"
               @click="selectLang('繁體')">
            <span>繁體</span>
            <svg v-if="currentLang === '繁體'" class="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
          </div>
        </div>
      </transition>
      <div class="dark-light-toggle" @click="toggleTheme">
        <transition name="mode-switch" mode="out-in">
          <svg v-if="!isDark" key="sun" class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
          </svg>
          <svg v-else key="moon" class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
          </svg>
        </transition>
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

.toggle-group {
  position: fixed;
  top: 15px;
  right: 40px;
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 1000;
}

.dark-light-toggle {
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  background: transparent;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark-light-toggle:hover {
  transform: scale(1.1);
}

.sun-icon,
.moon-icon {
  width: 24px;
  height: 24px;
}

.sun-icon path {
  fill: #FDB813;
}

.moon-icon path {
  fill: #5C6BC0;
}

.lang-toggle {
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 6px;
  background: transparent;
  box-shadow: none;
  font-size: 14px;
  color: #333;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 36px;
  z-index: 1001;
}

.lang-toggle:hover {
  opacity: 0.8;
}

.lang-content {
  display: flex;
  align-items: center;
  gap: 6px;
}

.lang-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.lang-text {
  white-space: nowrap;
  transform-origin: left;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.dark .lang-toggle {
  color: #ffffff;
  background: transparent;
}

.dark .dark-light-toggle,
.dark .lang-toggle {
  color: #ffffff;
  background: transparent;
}

.dark .lang-option.selected {
  color: #5C6BC0;
  background: transparent;
}

.dark .menu-item a::before {
  background: transparent;
}

.dark .menu-item a.active::before {
  background: transparent;
}

.mode-switch-enter-active,
.mode-switch-leave-active {
  transition: all 0.3s ease;
}

.mode-switch-enter-from,
.mode-switch-leave-to {
  opacity: 0;
  transform: rotate(30deg) scale(0.7);
}

.mode-switch-enter-to,
.mode-switch-leave-from {
  opacity: 1;
  transform: rotate(0) scale(1);
}

.arrow-icon {
  width: 12px;
  height: 12px;
  transition: transform 0.3s ease;
  opacity: 0;
  transform: rotate(0);
}

.arrow-up {
  transform: rotate(180deg);
}

.lang-toggle:hover .arrow-icon,
.lang-menu:hover .arrow-icon {
  opacity: 1;
}

.lang-menu {
  position: fixed;
  top: 60px;
  right: 40px;
  width: 120px;
  background: var(--bg-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1000;
}

.lang-option {
  padding: 8px 12px;
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #666;
}

.lang-option.selected {
  color: #4285f4;
  background: rgba(66, 133, 244, 0.05);
}

.lang-option:hover {
  opacity: 0.8;
}

.check-icon {
  width: 16px;
  height: 16px;
  color: #4285f4;
}

.dark .lang-option {
  color: #bbb;
}

.dark .lang-option.selected {
  color: #5C6BC0;
  background: rgba(92, 107, 192, 0.1);
}

.dark .check-icon {
  color: #5C6BC0;
}

.dark .lang-option:hover {
  opacity: 0.8;
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dark .lang-menu {
  background: var(--bg-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.dark .lang-option:hover {
  opacity: 0.8;
}

.dark .dark-light-toggle:hover,
.dark .lang-toggle:hover {
  opacity: 0.8;
}

:root {
  --bg-color: #ffffff;
  --text-color: #333333;
}

:root.dark {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dark .menu-item a {
  color: #ffffff;
}

.dark .lang-icon {
  color: #ffffff;
}

.dark .dark-light-toggle,
.dark .lang-toggle {
  color: #ffffff;
  background: transparent;
}

.dark .lang-option.selected {
  color: #5C6BC0;
  background: transparent;
}

.dark .menu-item a.active {
  color: #5C6BC0 !important;
}

.dark .menu-item a::before {
  background: transparent;
}

.dark .menu-item a.active::before {
  background: transparent;
}
</style>


