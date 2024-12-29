<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';

const scrollProgress = ref(0);

const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const threshold = windowHeight * 0.3;
    scrollProgress.value = Math.min(Math.max(scrollPosition / threshold, 0), 1);
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
<div class="container container-main holded-container container-main-last" id="our-work-scroll">
    <div class="content-wrapper">
        <div class="hero-section">
            <div class="title-content" :style="{ 
                opacity: 1 - scrollProgress * 1.5,
                transform: `translateY(${scrollProgress * 30}px)`
            }">
                <h1 class="title-line">写作, 绘画, <span class="highlight">✓</span> 规划,</h1>
                <h1 class="title-line">一次性搞定. <span class="highlight-text">AI 助力.</span></h1>
                <div class="subtitle-container">
                    <p class="subtitle">
                        在 TOKEN，我们的目标是<br>
                        学习和教学、开发者、设计师和管理者齐聚一堂，<br>
                        共同创建一个激励大家进步的团队。加入我们！
                    </p>
                </div>
                <button class="get-started-btn">立即开始</button>
            </div>
            <div class="hero-cover-wrapper" :style="{
                transform: `translateY(${-scrollProgress * 50}px) scale(${1 + scrollProgress * 0.05})`,
                zIndex: scrollProgress > 0.5 ? 2 : 1
            }">
                <div class="video-card">
                    <div class="video-container">
                        <video src="@/video/test01.mp4" controls>
                            您的浏览器不支持视频标签。
                        </video>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    min-height: 150vh;
}

.hero-section {
    padding: 60px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.title-content {
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
    will-change: transform, opacity;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
}

.title-line {
    font-size: 64px;
    line-height: 1.2;
    margin: 0;
    font-weight: 900;
    letter-spacing: -0.02em;
    text-align: center;
}

.title-line:first-child {
    margin-bottom: 10px;
}

.subtitle-container {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 32px 0;
}

.subtitle {
    font-size: 20px;
    color: #666;
    line-height: 1.6;
    text-align: center;
    margin: 0;
    max-width: 600px;
}

.highlight {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #0091ff;
    color: white;
    padding: 4px;
    border-radius: 8px;
    margin: 0 5px;
    width: 48px;
    height: 48px;
    vertical-align: baseline;
    font-size: 32px;
}

.highlight-text {
    color: #0091ff;
    font-weight: 900;
}

.get-started-btn {
    background: #1a1a1a;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 32px auto 48px;
    display: block;
}

.get-started-btn:hover {
    background: #333;
    transform: translateY(-2px);
}

.hero-cover-wrapper {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    transition: transform 0.3s ease;
    will-change: transform;
    position: relative;
}

.video-card {
    width: 100%;
    background: #fff;
    overflow: hidden;
}

.video-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    height: 0;
    overflow: hidden;
}

.video-container video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
    .title-line {
        font-size: 48px;
    }
    
    .highlight {
        width: 36px;
        height: 36px;
        font-size: 24px;
    }
    
    .subtitle {
        font-size: 18px;
    }
}

@media (max-width: 768px) {
    .title-line {
        font-size: 36px;
    }
    
    .content-wrapper {
        padding: 10px;
    }
    
    .hero-section {
        padding: 40px 10px;
    }
    
    .highlight {
        width: 28px;
        height: 28px;
        font-size: 18px;
    }
}

@media (max-width: 480px) {
    .title-line {
        font-size: 28px;
    }
    
    .subtitle {
        font-size: 16px;
    }
    
    .highlight {
        width: 24px;
        height: 24px;
        font-size: 16px;
    }
    
    .get-started-btn {
        padding: 10px 20px;
        font-size: 14px;
    }
}

.container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}

@media (min-width: 768px) {
    .container {
        width: 750px;
    }
}

@media (min-width: 992px) {
    .container {
        width: 970px;
    }
}

@media (min-width: 1200px) {
    .container {
        width: 1170px;
    }
}

.container-main {
    background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
                url('@/assets/images/after-landing.svg') center center fixed;
    background-size: cover;
    min-height: 100vh;
    padding: 40px 0;
}

.dark .container-main {
    background: linear-gradient(rgba(32, 32, 32, 0.9), rgba(32, 32, 32, 0.9)),
                url('@/assets/images/after-landing-dark.svg') center center fixed;
    background-size: cover;
}
</style>
