<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { getCreateData } from '@/api/create'
import type { Section, Partner, Feature } from '@/types/create'
import { useLangStore } from '@/stores/lang'
const scrollProgress = ref(0)
const videoRef = ref<HTMLVideoElement | null>(null)
const isVideoLoading = ref(true)

// 视频加载处理
const handleVideoLoad = () => {
  isVideoLoading.value = false
}

const handleVideoError = () => {
  isVideoLoading.value = false
  console.error('Video failed to load')
}

// 添加打开QQ好友请求的方法
const openQQFriend = () => {
  window.open('tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=851543')
}

const langStore = useLangStore()

// 添加响应式数据
const sections = ref<Section[]>([])
const partners = ref<Partner[]>([])
const features = ref<Feature[]>([])
const images = ref<string[]>([])

// 获取数据的函数
const fetchData = async () => {
  try {
    const data = await getCreateData(langStore.currentLang)
    sections.value = data.sections
    partners.value = data.partners
    features.value = data.features
    images.value = data.images
  } catch (error) {
    console.error('Failed to fetch trend data:', error)
  }
}

// 添加这个函数到 script setup 中
const isElementInViewport = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// 处理滚动事件
const handleScroll = () => {
  // 计算滚动进度
  const scrollPosition = window.scrollY
  const threshold = window.innerHeight * 0.3
  scrollProgress.value = Math.min(Math.max(scrollPosition / threshold, 0), 1)

  // 控制视频播放
  if (videoRef.value) {
    if (isElementInViewport(videoRef.value)) {
      // 确保视频是静音的，以允许自动播放
      videoRef.value.muted = true
      videoRef.value.play().catch(console.error)
    } else {
      videoRef.value.pause()
    }
  }
}

// 添加图片切换逻辑
const switchImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length
}

// 添加滚动处理函数
const handleSectionScroll = () => {
  const windowHeight = window.innerHeight

  sectionRefs.value.forEach((section, index) => {
    const rect = section.getBoundingClientRect()
    if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
      currentSection.value = index
    }
  })
}

const currentImageIndex = ref(0)
const currentSection = ref(0)
const sectionRefs = ref<HTMLElement[]>([])

import { watch } from 'vue'

// 监听语言变化
watch(
  () => langStore.currentLang,
  () => {
    fetchData()
  },
)

// 生命周期钩子
onMounted(async () => {
  // 添加事件监听器
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('scroll', handleSectionScroll)

  // 获取数据
  await fetchData()

  // 设置图片切换定时器
  setInterval(switchImage, 3000)

  // 处理合作伙伴滚动
  const marquee = document.querySelector('.partner-marquee')
  if (marquee) {
    marquee.innerHTML += marquee.innerHTML
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('scroll', handleSectionScroll)
})
</script>

<template>
  <div class="container">
    <div class="content">
      <!-- 标题部分 -->
      <div class="hero" :style="{ opacity: 1 - scrollProgress * 1.5 }">
        <h1 data-aos="fade-up">
          {{ $t('create.hero.title') }} &nbsp;<span class="highlight">✓</span> <br />{{
            $t('create.hero.subtitle')
          }}. <span class="accent">Token.</span>
        </h1>

        <p data-aos="fade-up" class="subtitle">
          {{ $t('create.hero.description') }}
        </p>

        <button data-aos="fade-up" class="btn" @click="openQQFriend">
          {{ $t('create.hero.startButton') }}
        </button>
      </div>

      <!-- 视频部分 -->
      <div
        class="video-wrapper"
        :style="{
          transform: `translateY(${-scrollProgress * 50}px)`,
        }"
        :class="{ 'loading': isVideoLoading }"
      >
        <video ref="videoRef" src="@/assets/video/hero-cover.mp4" muted playsinline loop @loadeddata="handleVideoLoad" @error="handleVideoError" />

        <!-- 添加机器人头像，放在视频后面 -->
        <div class="robot-avatar">
          <svg viewBox="0 0 200 200" class="robot-head">
            <!-- 机器人头部 - 深蓝紫色背景 -->
            <circle cx="100" cy="100" r="90" fill="#6366F1" />

            <!-- 机器人眼睛 - 白色外圈 -->
            <circle cx="65" cy="85" r="25" fill="#fff" />
            <circle cx="135" cy="85" r="25" fill="#fff" />

            <!-- 机器人眼睛 - 蓝色瞳孔 -->
            <circle cx="65" cy="85" r="15" fill="#06B6D4" />
            <circle cx="135" cy="85" r="15" fill="#06B6D4" />

            <!-- 机器人嘴巴 - 白色微笑 -->
            <path d="M70 130 Q100 160 130 130" stroke="#fff" stroke-width="8" fill="none" />
          </svg>
        </div>
      </div>
    </div>

    <!-- 添加合作伙伴部分 -->
    <div class="partners-section">
      <h2 data-aos="fade-up" class="partners-title">
        {{ $t('create.partners.title') }}<br />
        {{ $t('create.partners.subtitle') }}
      </h2>

      <div class="partners-container">
        <div class="partner-track">
          <div class="partner-marquee">
            <div class="partner-row">
              <img
                v-for="partner in partners"
                :key="partner.alt"
                :src="partner.src"
                :alt="partner.alt"
                class="partner-logo"
              />
            </div>
          </div>
        </div>
      </div>

      <p class="partners-subtitle" data-aos="fade-up">
        {{ $t('create.partners.description') }}
      </p>
    </div>

    <!-- 新功能区域 -->
    <div class="features-section">
      <div class="feature-icons">
        <div v-for="feature in features" :key="feature.title" class="icon-item" data-aos="fade-up">
          <div
            class="icon"
            :class="`icon-${feature.icon}`"
            :style="{
              background: feature.background,
              color: feature.color,
            }"
          >
            <svg viewBox="0 0 24 24" class="icon-svg">
              <path
                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
              />
              <path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z" />
            </svg>
          </div>
          <span>{{ feature.title }}</span>
        </div>
      </div>

      <div class="feature-content" data-aos="fade-up">
        <h2>{{ $t('create.features.title') }}</h2>
        <p>{{ $t('create.features.description') }}</p>
      </div>
    </div>

    <!-- 在 features-section 后添加新的部分 -->
    <div class="slide-sections">
      <!-- 左侧内容区域 -->
      <div class="slide-content">
        <div
          v-for="(section, index) in sections"
          :key="index"
          :ref="
            (el) => {
              if (el) sectionRefs[index] = el as HTMLElement
            }
          "
          class="slide-section"
          data-aos="fade-up"
        >
          <div class="text-content" :class="{ 'is-active': currentSection === index }">
            <div class="title-wrapper">
              <h2
                class="main-title"
                :class="{
                  'title-create': section.title === sections[0].title,
                  'title-manage': section.title === sections[1].title,
                }"
              >
                {{
                  section.title === sections[0].title
                    ? $t('create.sections.create.title')
                    : $t('create.sections.manage.title')
                }}
                <span :class="{ cursor: section.title === sections[1].title }"></span>
              </h2>
              <h3
                class="sub-title"
                :class="{
                  'subtitle-create': section.title === sections[0].title,
                  'subtitle-manage': section.title === sections[1].title,
                }"
              >
                {{
                  section.title === sections[0].title
                    ? $t('create.sections.create.subtitle[0]')
                    : $t('create.sections.manage.subtitle[0]')
                }}<br />
                {{
                  section.title === sections[0].title
                    ? $t('create.sections.create.subtitle[1]')
                    : $t('create.sections.manage.subtitle[1]')
                }}
              </h3>
            </div>
            <p class="description">
              {{
                section.title === sections[0].title
                  ? $t('create.sections.create.description')
                  : $t('create.sections.manage.description')
              }}
            </p>
          </div>
        </div>
      </div>

      <!-- 右侧固定图片区域 -->
      <div class="sticky-wrapper">
        <div class="image-container">
          <div
            v-for="(section, index) in sections"
            :key="index"
            class="image-wrapper"
            :class="{ 'is-active': currentSection === index }"
          >
            <img :src="section.image" :alt="section.title" class="section-image" />
          </div>
        </div>
      </div>
    </div>
    <!-- 在 slide-sections 后添加新的部分 -->
    <div class="ai-partner-section">
      <div class="ai-content">
        <div class="ai-title" data-aos="fade-up">
          <span class="ai-highlight">Token</span> {{ $t('create.aiPartner.title') }}<br />
          {{ $t('create.aiPartner.subtitle') }}
        </div>
        <div class="ai-subtitle" data-aos="fade-up">
          {{ $t('create.aiPartner.description1') }}<br />
          {{ $t('create.aiPartner.description2') }}
        </div>
        <button class="learn-more-btn" data-aos="fade-up" @click="openQQFriend">
          {{ $t('create.aiPartner.startButton') }} <span class="arrow">+</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 150vh;
  padding: 20px;
}

.dark .container {
  background: #141414;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  text-align: center;
}

.hero {
  max-width: 800px;
  margin: 100px auto;
  transition: opacity 0.3s;
}

h1 {
  font-size: clamp(28px, 5vw, 64px);
  line-height: 1.2;
  font-weight: 900;
}

.highlight {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #0091ff;
  color: white;
  padding: 4px;
  border-radius: 8px;
  width: 48px;
  height: 48px;
}

.accent {
  color: #0091ff;
  font-weight: 900;
}

.subtitle {
  font-size: clamp(16px, 2vw, 20px);
  color: #666;
  line-height: 1.6;
  margin: 32px auto;
  max-width: 600px;
}

.btn {
  background: #1a1a1a;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn:hover {
  background: #333;
  transform: translateY(-2px);
}

.video-wrapper {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  margin: 48px auto 0;
  box-shadow: var(--card-shadow);
  transition: all 0.3s ease;
  background: var(--card-bg);
}

.dark .video-wrapper {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

video {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.dark video {
  opacity: 0.8;
  filter: brightness(0.85) contrast(1.1);
}

.video-wrapper:hover video {
  opacity: 1;
}

.dark .video-wrapper:hover video {
  filter: brightness(0.95) contrast(1.05);
}

/* 添加视频控件的深色模式样式 */
.dark video::-webkit-media-controls {
  background-color: rgba(0, 0, 0, 0.7);
}

.dark video::-webkit-media-controls-panel {
  background-color: rgba(20, 20, 20, 0.7);
}

.dark video::-webkit-media-controls-play-button,
.dark video::-webkit-media-controls-timeline,
.dark video::-webkit-media-controls-current-time-display,
.dark video::-webkit-media-controls-time-remaining-display,
.dark video::-webkit-media-controls-mute-button,
.dark video::-webkit-media-controls-toggle-closed-captions-button,
.dark video::-webkit-media-controls-volume-slider {
  color: #ffffff;
}

/* 视频加载动画 */
.video-wrapper::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  border: 3px solid var(--card-bg);
  border-top-color: var(--highlight-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  opacity: 0;
  transition: opacity 0.3s;
}

.video-wrapper.loading::before {
  opacity: 1;
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

/* 视频悬停效果 */
.video-wrapper:hover {
  transform: translateY(-5px);
  box-shadow: var(--card-shadow-hover);
}

/* 添加CSS变量 */
:root {
  --card-shadow-hover: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.dark {
  --card-shadow-hover: 0 12px 40px rgba(0, 0, 0, 0.4);
}

.container {
  background:
    linear-gradient(var(--bg-gradient), var(--bg-gradient)),
    var(--bg-image) center center fixed;
  background-size: cover;
}

.partners-section {
  padding: 80px 0;
  text-align: center;
  background: var(--card-bg);
  position: relative;
}

.partners-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 60px;
  color: var(--text-color);
}

.partners-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  margin-top: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.partners-container {
  width: 100%;
  overflow: hidden;
  padding: 40px 0;
  position: relative;
  background: var(--card-bg);
}

.partner-track {
  width: 50%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}

.partner-track::before,
.partner-track::after {
  content: '';
  position: absolute;
  top: 0;
  width: 150px;
  height: 100%;
  z-index: 2;
}

.partner-track::before {
  left: 0;
  background: linear-gradient(
    to right,
    var(--card-bg) 0%,
    rgba(var(--card-bg-rgb), 0.9) 20%,
    rgba(var(--card-bg-rgb), 0) 100%
  );
}

.partner-track::after {
  right: 0;
  background: linear-gradient(
    to left,
    var(--card-bg) 0%,
    rgba(var(--card-bg-rgb), 0.9) 20%,
    rgba(var(--card-bg-rgb), 0) 100%
  );
}

.partner-marquee {
  display: flex;
  animation: scroll 30s linear infinite;
}

.partner-row {
  display: flex;
  gap: 80px;
  padding: 0 40px;
  align-items: center;
}

.partner-logo {
  height: 40px;
  opacity: 0.7;
  transition: all 0.3s ease;
  filter: var(--logo-filter);
}

.dark .partner-logo {
  filter: brightness(0.8) invert(1);
}

.partner-logo:hover {
  opacity: 1;
  transform: translateY(-2px);
  filter: var(--logo-filter-hover);
}

.dark .partner-logo:hover {
  filter: brightness(1) invert(1);
}

.partner-track:hover .partner-logo {
  opacity: 0.85;
}

.partner-track:hover .partner-logo:hover {
  opacity: 1;
  transform: translateY(-2px) scale(1.05);
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.partner-track:hover .partner-marquee {
  animation-play-state: paused;
}

/* 渐变遮罩效果 */
.partners-container::before,
.partners-container::after {
  content: '';
  position: absolute;
  top: 0;
  width: 80px;
  height: 100%;
  z-index: 2;
}

.partners-container::before {
  left: 15%;
  background: linear-gradient(to right, var(--card-bg), transparent);
}

.partners-container::after {
  right: 15%;
  background: linear-gradient(to left, var(--card-bg), transparent);
}

/* 深色模式下的特殊处理 */
.dark .partners-section {
  background: var(--card-bg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.dark .partners-container::before {
  background: linear-gradient(to right, var(--card-bg), rgba(26, 26, 26, 0));
}

.dark .partners-container::after {
  background: linear-gradient(to left, var(--card-bg), rgba(26, 26, 26, 0));
}

/* 添加CSS变量 */
:root {
  --card-bg-rgb: 255, 255, 255;
  --logo-filter: none;
  --logo-filter-hover: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

.dark {
  --card-bg-rgb: 26, 26, 26;
  --logo-filter: brightness(0.8) invert(1);
  --logo-filter-hover: brightness(1) invert(1) drop-shadow(0 4px 6px rgba(255, 255, 255, 0.1));
}

.features-section {
  padding: 80px 0;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.feature-icons {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin: 40px 0;
  flex-wrap: wrap;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.icon-item:hover {
  transform: translateY(-5px);
}

.icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.icon-svg {
  width: 32px;
  height: 32px;
  fill: currentColor;
}

/* 图标颜色和背景 */
.icon-note {
  background: rgba(64, 158, 255, 0.1);
  color: #409eff;
}

.icon-knowledge {
  background: rgba(103, 194, 58, 0.1);
  color: #67c23a;
}

.icon-tools {
  background: rgba(230, 162, 60, 0.1);
  color: #e6a23c;
}

.icon-team {
  background: rgba(144, 147, 153, 0.1);
  color: #909399;
}

.icon-ai {
  background: rgba(245, 108, 108, 0.1);
  color: #f56c6c;
}

/* 悬停效果 */
.icon-item:hover .icon {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.icon-item:hover .icon-note {
  background: rgba(64, 158, 255, 0.2);
}

.icon-item:hover .icon-knowledge {
  background: rgba(103, 194, 58, 0.2);
}

.icon-item:hover .icon-tools {
  background: rgba(230, 162, 60, 0.2);
}

.icon-item:hover .icon-team {
  background: rgba(144, 147, 153, 0.2);
}

.icon-item:hover .icon-ai {
  background: rgba(245, 108, 108, 0.2);
}

.icon-item span {
  font-size: 14px;
  color: #606266;
}

.feature-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
}

.feature-content h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  line-height: 1.3;
}

.dark .feature-content h2 {
  color: #ffffff;
}

.feature-content p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .feature-icons {
    gap: 12px;
  }

  .icon-item {
    padding: 12px;
  }

  .icon {
    width: 40px;
    height: 40px;
  }

  .feature-content h2 {
    font-size: 1.5rem;
  }

  .feature-content p {
    font-size: 1rem;
  }
}

/* 添加新的样式 */
.write-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
  gap: 60px;
}

.text-content {
  flex: 1;
  max-width: 500px;
}

.animated-title {
  animation: slideUp 0.8s ease-out;
}

.title-wrapper {
  margin-bottom: 24px;
}

.main-title {
  font-size: 64px;
  font-weight: 700;
  color: #000;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  font-family: 'Segoe UI', sans-serif;
}

.dark .main-title {
  color: #ffffff;
}

.sub-title {
  font-size: 64px;
  font-weight: 700;
  color: #000;
  line-height: 1.1;
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
}

.dark .sub-title {
  color: #ffffff;
}

.highlight {
  top: 20px;
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 12px;
  background-color: #0091ff;
  opacity: 0.3;
  border-radius: 6px;
  z-index: -1;
}

.creativity {
  font-family: 'Comic Sans MS', cursive;
  font-style: italic;
}

.creativity::after {
  height: 16px;
  background-color: #0091ff;
  opacity: 0.2;
  border-radius: 20px;
  transform: rotate(-2deg);
}

.description {
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  margin: 0;
  margin-top: 32px;
}
.image-content {
  flex: 1;
  max-width: 600px;
}

.image-slider {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.slider-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blink {
  from,
  to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .write-section {
    flex-direction: column;
    text-align: left;
    padding: 40px 20px;
  }

  .main-title {
    font-size: 48px;
  }

  .sub-title {
    font-size: 48px;
  }

  .description {
    font-size: 16px;
    margin-top: 24px;
  }

  .cursor {
    height: 48px;
  }

  .highlight::after {
    height: 8px;
  }

  .creativity::after {
    height: 12px;
  }
}

/* 添加新的样式 */
.sections-container {
  position: relative;
}

.section {
  height: 100vh;
  position: relative;
}

.content-wrapper {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.text-content {
  flex: 1;
  max-width: 500px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.text-content.is-active {
  opacity: 1;
  transform: translateY(0);
}

.section-image.is-active {
  opacity: 1;
  transform: translateY(0);
}

.title-wrapper {
  margin-bottom: 24px;
}

.main-title {
  font-size: 64px;
  font-weight: 700;
  color: #000;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.sub-title {
  font-size: 64px;
  font-weight: 700;
  color: #000;
  line-height: 1.2;
  margin: 0;
}

.underline {
  position: relative;
  display: inline-block;
}

.underline::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: -4px;
  right: -4px;
  height: 12px;
  background-color: #0091ff;
  opacity: 0.2;
  border-radius: 20px;
  z-index: -1;
}

.handwriting {
  font-family: 'Comic Sans MS', cursive;
  font-style: italic;
  position: relative;
  display: inline-block;
  transform: rotate(-2deg);
}

.handwriting::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: -4px;
  right: -4px;
  height: 16px;
  background-color: #0091ff;
  opacity: 0.2;
  border-radius: 20px;
  z-index: -1;
  transform: rotate(-1deg) scale(1.1);
}

.cursor {
  margin-top: 10px;
  display: inline-block;
  width: 5px;
  height: 64px;
  background-color: #0091ff;
  margin-left: 4px;
  animation: blink 1s step-end infinite;
}

.description {
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  margin-top: 32px;
}

@keyframes blink {
  from,
  to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 48px;
  }

  .sub-title {
    font-size: 48px;
  }

  .cursor {
    height: 48px;
  }

  .description {
    font-size: 16px;
  }
}

/* 添加新的样式 */
.slide-sections {
  position: relative;
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 0;
  margin-top: 60px;
}

.slide-content {
  flex: 1;
  max-width: 500px;
}

.slide-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.sticky-wrapper {
  position: relative;
  flex: 1;
  max-width: 600px;
}

.image-container {
  position: sticky;
  top: 120px;
  width: 100%;
  height: 600px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.dark .image-container {
  background: #141414;
}

.image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.image-wrapper.is-active {
  opacity: 1;
  transform: translateY(0);
}

.section-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 修改文字内容的过渡效果 */
.text-content {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
  padding-right: 40px;
}

.text-content.is-active {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .slide-sections {
    flex-direction: column;
  }

  .sticky-wrapper {
    display: none; /* 在移动端可以选择隐藏或其他处理方式 */
  }

  .slide-section {
    min-height: auto;
    padding: 40px 0;
  }
}

/* 添加新的样式 */
.ai-partner-section {
  padding: 120px 20px;
  background: #fff;
  text-align: center;
}

.dark .ai-partner-section {
  background: #141414;
}

.ai-content {
  max-width: 1200px;
  margin: 0 auto;
}

.ai-title {
  font-size: 64px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
  color: #1a1a1a;
}

.dark .ai-title {
  color: #ffffff;
}

.ai-highlight {
  color: #0091ff;
  position: relative;
  display: inline-block;
}

.ai-highlight::after {
  content: '✧';
  position: absolute;
  top: -10px;
  right: -15px;
  font-size: 24px;
  color: #0091ff;
}

.ai-subtitle {
  font-size: 20px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 40px;
}

.learn-more-btn {
  background: #000;
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.learn-more-btn:hover {
  background: #333;
  transform: translateY(-2px);
}

.arrow {
  font-size: 20px;
  font-weight: 300;
}

@media (max-width: 768px) {
  .ai-partner-section {
    padding: 60px 20px;
  }

  .ai-title {
    font-size: 36px;
  }

  .ai-subtitle {
    font-size: 16px;
  }

  .learn-more-btn {
    padding: 12px 24px;
    font-size: 16px;
  }
}

/* 创作部分样式 */
.title-create {
  font-family: 'Comic Sans MS', cursive;
  font-style: italic;
  position: relative;
}

.title-create::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: -5px;
  right: -5px;
  height: 12px;
  background: rgba(0, 157, 255, 0.2);
  z-index: -1;
  border-radius: 6px;
}

.subtitle-create {
  position: relative;
  display: inline-block;
}

.subtitle-create::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: -2px;
  right: -2px;
  height: 8px;
  background: rgba(0, 157, 255, 0.15);
  z-index: -1;
  border-radius: 4px;
}

/* 管理部分样式 */
.title-manage {
  font-size: 72px;
  font-weight: 900;
  line-height: 1.1;
}

.subtitle-manage {
  font-size: 64px;
  line-height: 1.2;
  margin-top: 20px;
}

.subtitle-manage br:first-child {
  margin-bottom: 10px;
}

.subtitle-manage br + * {
  font-weight: 900;
  font-size: 72px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .title-manage {
    font-size: 48px;
  }

  .subtitle-manage {
    font-size: 42px;
  }
}

/* 添加机器人头像样式 */
.robot-avatar {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 120px;
  height: 120px;
  z-index: 2;
  transform: rotate(-15deg);
}

.robot-head {
  width: 100%;
  height: 100%;
  transform-origin: center;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
</style>
