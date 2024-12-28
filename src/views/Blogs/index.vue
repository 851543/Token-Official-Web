<template>
  <div class="blogs-container">
    <h1 class="page-title">博客</h1>
    <p class="page-description">分享我们的技术见解、开发经验和学习心得。</p>

    <div class="blog-grid">
      <article class="blog-card" v-for="blog in blogs" :key="blog.id">
        <div class="blog-image">
          <img :src="blog.image" :alt="blog.title" />
        </div>
        <div class="blog-content">
          <div class="blog-meta">
            <span class="blog-date">{{ blog.date }}</span>
            <span class="blog-author">{{ blog.author }}</span>
          </div>
          <h2>{{ blog.title }}</h2>
          <p>{{ blog.excerpt }}</p>
          <router-link :to="`/blog/${blog.id}`" class="read-more"> 阅读全文 </router-link>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const blogs = [
  {
    id: 1,
    title: 'Vue3 和 TypeScript 实战经验',
    excerpt: '分享在实际项目中使用 Vue3 和 TypeScript 的经验和最佳实践...',
    date: '2024-01-25',
    author: '张三',
    image: '@/assets/images/blog-1.jpg',
  },
  // 更多博客数据...
]
</script>

<style scoped>
.blogs-container {
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

.blog-grid {
  display: grid;
  gap: 30px;
}

.blog-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.blog-card:hover {
  transform: translateY(-5px);
}

.blog-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog-content {
  padding: 20px;
}

.blog-meta {
  display: flex;
  gap: 15px;
  color: #999;
  font-size: 0.9em;
  margin-bottom: 10px;
}

.blog-content h2 {
  margin: 0 0 10px;
  font-size: 1.4em;
  font-weight: 400;
}

.blog-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.read-more {
  display: inline-block;
  color: #4285f4;
  text-decoration: none;
  font-size: 0.9em;
  transition: opacity 0.3s;
}

.read-more:hover {
  opacity: 0.7;
}

/* 暗色模式 */
.dark .blog-card {
  background: #2a2a2a;
}

.dark .blog-content h2 {
  color: #fff;
}

.dark .blog-content p {
  color: #aaa;
}

.dark .blog-meta {
  color: #888;
}
</style>
