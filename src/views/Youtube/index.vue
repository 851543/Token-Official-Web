<template>
  <div class="youtube-container">
    <h1 class="page-title">视频</h1>
    <p class="page-description">
      在这里，我们分享最新的技术教程和学习资源。通过视频的形式，让学习变得更加直观和有趣。
    </p>

    <div class="video-grid">
      <div class="video-card" v-for="video in videos" :key="video.id">
        <div class="video-thumbnail">
          <img :src="video.thumbnail" :alt="video.title" />
        </div>
        <div class="video-info">
          <h3>{{ video.title }}</h3>
          <p>{{ video.description }}</p>
          <span class="video-date">{{ video.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const videos = [
  {
    id: 1,
    title: 'Vue3 基础教程',
    description: '从零开始学习 Vue3 的核心概念和使用方法',
    thumbnail: '@/assets/images/video-thumb-1.jpg',
    date: '2024-01-15',
  },
  // 更多视频数据...
]
</script>

<style scoped>
.youtube-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 300;
}

.page-description {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px;
  color: #666;
  font-weight: 300;
  line-height: 1.6;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.video-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.video-card:hover {
  transform: translateY(-5px);
}

.video-thumbnail img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.video-info {
  padding: 15px;
}

.video-info h3 {
  margin: 0 0 10px;
  font-size: 1.2em;
  font-weight: 400;
}

.video-info p {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 10px;
}

.video-date {
  color: #999;
  font-size: 0.8em;
}

/* 暗色模式 */
.dark .video-card {
  background: #2a2a2a;
}

.dark .video-info h3 {
  color: #fff;
}

.dark .video-info p {
  color: #aaa;
}

.dark .video-date {
  color: #888;
}
</style>
