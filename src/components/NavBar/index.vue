<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { MenuItem } from '@/types/navbar'
import { useScroll } from '@/composables/useScroll'

const isDark = ref(false)
const isMenuVisible = ref(false)
const navbarRef = ref<HTMLElement | null>(null)

const { setNavbar } = useScroll()

onMounted(() => {
  setNavbar(navbarRef.value)
})

const menuItems: MenuItem[] = [
  { id: 'home', text: '首页', link: '/' },
  { id: 'videos', text: '视频', link: '/youtube' },
  { id: 'team', text: '团队', link: '/team' },
  { id: 'links', text: '动态', link: '/morelinks' },
  { id: 'blogs', text: '博客', link: '/blogs' },
  { id: 'contact', text: '联系我们', link: '/contact' },
]

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value
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
          src="@/assets/images/logo.png"
          :class="['logo-nav', { 'logo-nav-light': !isDark }]"
          alt="GDSC VIT"
          style="margin-right: 45px; margin-left: -20px"
        />
      </div>
      <nav class="menu barlow-extralight">
        <div v-for="item in menuItems" :key="item.id" class="menu-item" :id="`${item.id}-desk`">
          <router-link v-if="item.link" :to="item.link">{{ item.text }}</router-link>
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


