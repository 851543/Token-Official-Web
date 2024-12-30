<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const scrollProgress = ref(0)
const videoRef = ref<HTMLVideoElement | null>(null)


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

// 生命周期钩子
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

// 添加新的响应式数据
const images = [
  '/src/assets/images/logo.png',
  '/src/assets/images/test.png',
]
const currentImageIndex = ref(0)

// 添加图片切换逻辑
const switchImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length
}

onMounted(() => {
  setInterval(switchImage, 3000)
})

// 添加新的响应式数据
const sections = [
  {
    title: '写作',
    subtitle: ['让创作', '更有灵感'],
    description: '像搭建积木一样构建你的内容，让创意自由流动。AI 助手帮你突破创作瓶颈，激发更多灵感。',
    image: '/src/assets/images/logo.png'
  },
  {
    title: '绘画',
    subtitle: ['让表达', '更加生动'],
    description: '无限画布，自由创作。让你的想法通过图形完美呈现，AI 辅助让创作更加轻松。',
    image: '/src/assets/images/test.png'
  }
]

const currentSection = ref(0)
const sectionRefs = ref<HTMLElement[]>([])

// 添加滚动处理函数
const handleSectionScroll = () => {
  const scrollPosition = window.scrollY
  const windowHeight = window.innerHeight
  
  sectionRefs.value.forEach((section, index) => {
    const rect = section.getBoundingClientRect()
    if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
      currentSection.value = index
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleSectionScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleSectionScroll)
})
</script>

<template>
  <div class="container">
    <div class="content">
      <!-- 标题部分 -->
      <div class="hero" :style="{ opacity: 1 - scrollProgress * 1.5 }">
        <h1>
          写作, 绘画, <span class="highlight">✓</span> 规划,
          <br>一次性搞定. <span class="accent">AI 助力.</span>
        </h1>
        
        <p class="subtitle">
          在 TOKEN，我们的目标是学习和教学、开发者、设计师和管理者齐聚一堂，
          共同创建一个激励大家进步的团队。加入我们！
        </p>
        
        <button class="btn">立即开始</button>
      </div>

      <!-- 视频部分 -->
      <div class="video-wrapper" :style="{
        transform: `translateY(${-scrollProgress * 50}px)`
      }">
        <video 
          ref="videoRef" 
          src="@/video/hero-cover.mp4"
          muted
          playsinline
          loop
        />
      </div>
    </div>

    <!-- 添加合作伙伴部分 -->
    <div class="partners-section">
      <h2 class="partners-title">
        值得信赖的合作伙伴<br>
        从初创企业到行业领军者
      </h2>
      
      <div class="partners-grid">
        <!-- 第一行 -->
        <div class="partner-row">
          <img src="@/assets/images/partners/google.svg" alt="Google">
          <img src="@/assets/images/partners/microsoft.svg" alt="Microsoft">
          <img src="@/assets/images/partners/amazon.svg" alt="Amazon">
          <img src="@/assets/images/partners/meta.svg" alt="Meta">
          <img src="@/assets/images/partners/ibm.svg" alt="IBM">
        </div>
        
        <!-- 第二行 -->
        <div class="partner-row">
          <img src="@/assets/images/partners/tiktok.svg" alt="TikTok">
          <img src="@/assets/images/partners/shopify.svg" alt="Shopify">
          <img src="@/assets/images/partners/apache.svg" alt="Apache">
          <img src="@/assets/images/partners/cloud303.svg" alt="Cloud303">
          <img src="@/assets/images/partners/sap.svg" alt="SAP">
        </div>
        
        <!-- 第三行 -->
        <div class="partner-row">
          <img src="@/assets/images/partners/michigan.svg" alt="University of Michigan">
          <img src="@/assets/images/partners/arqcap.svg" alt="ArqCap">
          <img src="@/assets/images/partners/neuc.svg" alt="Neuc">
          <img src="@/assets/images/partners/keyman.svg" alt="Keyman">
          <img src="@/assets/images/partners/bonfire.svg" alt="Bonfire Leads">
        </div>
      </div>
    </div>

    <!-- 新功能区域 -->
    <div class="features-section">
      <div class="feature-icons">
        <div class="icon-item">
          <div class="icon">
            <svg viewBox="0 0 24 24" class="icon-svg">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
              <path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z"/>
            </svg>
          </div>
          <span>灵感板</span>
        </div>

        <div class="icon-item">
          <div class="icon">
            <svg viewBox="0 0 24 24" class="icon-svg">
              <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
            </svg>
          </div>
          <span>文档与知识库</span>
        </div>

        <div class="icon-item">
          <div class="icon">
            <svg viewBox="0 0 24 24" class="icon-svg">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </div>
          <span>故事板</span>
        </div>

        <div class="icon-item">
          <div class="icon">
            <svg viewBox="0 0 24 24" class="icon-svg">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
              <path d="M18 9l-1.4-1.4-6.6 6.6-2.6-2.6L6 13l4 4z"/>
            </svg>
          </div>
          <span>项目任务</span>
        </div>

        <div class="icon-item">
          <div class="icon">
            <svg viewBox="0 0 24 24" class="icon-svg">
              <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"/>
              <path d="M12 12c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 8.58c0-2.5-3.97-3.58-6-3.58s-6 1.08-6 3.58V18h12v-1.42zM8.48 16c.74-.51 2.23-1 3.52-1s2.78.49 3.52 1H8.48z"/>
            </svg>
          </div>
          <span>思维导图</span>
        </div>
      </div>

      <div class="feature-content">
        <h2>专注创作，释放无限创意</h2>
        <p>一站式知识管理系统，让写作、绘画和规划变得轻松自如，激发你的创作灵感。</p>
      </div>
    </div>

    <!-- 在 features-section 后添加新的部分 -->
    <div class="slide-sections">
      <!-- 左侧内容区域 -->
      <div class="slide-content">
        <div 
          v-for="(section, index) in sections" 
          :key="index"
          :ref="el => { if (el) sectionRefs[index] = el as HTMLElement }"
          class="slide-section"
        >
          <div class="text-content" :class="{ 'is-active': currentSection === index }">
            <div class="title-wrapper">
              <h2 class="main-title">
                {{ section.title }}<span class="cursor">|</span>
              </h2>
              <h3 class="sub-title">
                {{ section.subtitle[0] }}<br>
                {{ section.subtitle[1] }}
              </h3>
            </div>
            <p class="description">{{ section.description }}</p>
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
            <img 
              :src="section.image" 
              :alt="section.title"
              class="section-image"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 在 slide-sections 后添加新的部分 -->
    <div class="ai-partner-section">
      <div class="ai-content">
        <div class="ai-title">
          <span class="ai-highlight">AI</span> 助手让你的创作<br>
          写作、绘画、规划更出色
        </div>
        <div class="ai-subtitle">
          让思维更开阔，创作更快速，工作更智能<br>
          随时随地，激发灵感
        </div>
        <button class="learn-more-btn">
          了解更多 <span class="arrow">+</span>
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

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  text-align: center;
}

.hero {
  max-width: 800px;
  margin: 0 auto;
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
  width: 100%;
  max-width: 1200px;
  margin: 48px auto 0;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  overflow: hidden;
  transition: transform 0.3s;
}

video {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
}

/* 暗色模式 */
:root {
  --bg-gradient: rgba(255,255,255,0.9);
  --bg-image: url('@/assets/images/after-landing.svg');
}

.dark {
  --bg-gradient: rgba(32,32,32,0.9);
  --bg-image: url('@/assets/images/after-landing-dark.svg');
}

.container {
  background: linear-gradient(var(--bg-gradient), var(--bg-gradient)),
              var(--bg-image) center center fixed;
  background-size: cover;
}

.partners-section {
  padding: 100px 0;
  text-align: center;
}

.partners-title {
  font-size: 2.5rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 60px;
  line-height: 1.4;
}

.partners-grid {
  display: flex;
  flex-direction: column;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.partner-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
}

.partner-row img {
  height: 40px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.partner-row img:hover {
  filter: grayscale(0%);
  opacity: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .partners-title {
    font-size: 1.8rem;
    padding: 0 20px;
  }
  
  .partner-row {
    gap: 30px;
  }
  
  .partner-row img {
    height: 30px;
  }
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
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.icon-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #f5f5f5;
}

.icon-svg {
  width: 24px;
  height: 24px;
  fill: #666;
}

.icon-item span {
  font-size: 14px;
  color: #666;
  font-weight: 500;
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

.sub-title {
  font-size: 64px;
  font-weight: 700;
  color: #000;
  line-height: 1.1;
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
}

.highlight {
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

.cursor {
  display: inline-block;
  width: 3px;
  height: 64px;
  background-color: #0091ff;
  margin-left: 4px;
  animation: blink 1s step-end infinite;
}

.image-content {
  flex: 1;
  max-width: 600px;
}

.image-slider {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
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
  from, to {
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
  display: inline-block;
  width: 3px;
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
  from, to {
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
</style>
