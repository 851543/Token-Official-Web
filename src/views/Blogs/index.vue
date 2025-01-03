<template>
  <div class="blogs-container">
    <!-- 头部区域 -->
    <div class="hero-section">
      <h1 class="page-title">Token 博客</h1>
      <p class="page-description">
        探索 AI 创新与知识管理的前沿
        <span class="highlight">·</span>
        分享技术见解
        <span class="highlight">·</span>
        激发创作灵感
      </p>
    </div>

    <!-- 热门分类 -->
    <section class="categories-section">
      <h2 class="section-title">探索领域</h2>
      <div class="categories-grid">
        <div class="category-card" v-for="category in categories" :key="category.id">
          <div class="category-icon" :style="{ background: category.gradient }">
            <svg viewBox="0 0 24 24" v-html="category.icon"></svg>
          </div>
          <div class="category-content">
            <h3>{{ category.title }}</h3>
            <p class="category-count">{{ category.count }} 篇文章</p>
            <p class="category-desc">{{ category.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 精选文章 -->
    <section class="featured-section">
      <h2 class="section-title">精选专栏</h2>
      <div class="featured-grid">
        <article class="featured-card" v-for="article in featuredArticles" :key="article.id">
          <div class="article-image">
            <div class="svg-icon" v-html="article.icon"></div>
            <div class="article-meta">
              <span class="article-date">{{ article.date }}</span>
              <span class="article-author">{{ article.author }}</span>
            </div>
          </div>
          <div class="article-content">
            <div class="article-tags">
              <span class="tag" v-for="tag in article.tags" :key="tag">{{ tag }}</span>
            </div>
            <h3>{{ article.title }}</h3>
            <p>{{ article.excerpt }}</p>
            <router-link :to="`/blog/${article.id}`" class="read-more">
              阅读全文
              <svg viewBox="0 0 24 24">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </router-link>
        </div>
      </article>
    </div>
    </section>

    <!-- 技术专题 -->
    <section class="topics-section">
      <h2 class="section-title">技术专题</h2>
      <div class="topics-grid">
        <div class="topic-card" v-for="topic in techTopics" :key="topic.id">
          <div class="topic-header" :style="{ background: topic.gradient }">
            <div class="topic-icon">{{ topic.icon }}</div>
            <h3>{{ topic.title }}</h3>
          </div>
          <div class="topic-content">
            <p class="topic-desc">{{ topic.description }}</p>
            <ul class="topic-articles">
              <li v-for="article in topic.articles" :key="article.id">
                <router-link :to="`/blog/${article.id}`">{{ article.title }}</router-link>
                <span class="article-date">{{ article.date }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 作者专栏 -->
    <section class="authors-section">
      <h2 class="section-title">团队专栏</h2>
      <div class="authors-grid">
        <div class="author-card" v-for="author in authors" :key="author.id">
          <div class="author-avatar">
            <div class="avatar-icon" v-html="author.icon"></div>
          </div>
          <div class="author-info">
            <h3>{{ author.name }}</h3>
            <p class="author-title">{{ author.title }}</p>
            <p class="author-desc">{{ author.description }}</p>
            <div class="author-stats">
              <div class="stat">
                <span class="stat-number">{{ author.articles }}</span>
                <span class="stat-label">文章</span>
              </div>
              <div class="stat">
                <span class="stat-number">{{ author.views }}k</span>
                <span class="stat-label">阅读</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 最新动态 -->
    <section class="updates-section">
      <h2 class="section-title">最新动态</h2>
      <div class="timeline">
        <div class="timeline-item" v-for="update in updates" :key="update.id">
          <div class="timeline-date">{{ update.date }}</div>
          <div class="timeline-content">
            <h3>{{ update.title }}</h3>
            <p>{{ update.content }}</p>
            <div class="timeline-tags">
              <span class="tag" v-for="tag in update.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 分类数据
const categories = [
  {
    id: 1,
    title: 'AI 技术创新',
    count: 156,
    description: '探索人工智能前沿技术与应用实践',
    gradient: 'linear-gradient(135deg, #6366F1, #818CF8)',
    icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>'
  },
  {
    id: 2,
    title: '知识管理',
    count: 98,
    description: '构建高效的个人与团队知识体系',
    gradient: 'linear-gradient(135deg, #10B981, #34D399)',
    icon: '<path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>'
  },
  {
    id: 3,
    title: '创作效能',
    count: 127,
    description: '提升内容创作效率与质量的方法论',
    gradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
    icon: '<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>'
  },
  {
    id: 4,
    title: '团队协作',
    count: 84,
    description: '打造高效团队与协作最佳实践',
    gradient: 'linear-gradient(135deg, #EC4899, #F472B6)',
    icon: '<path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm18 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-12-2c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>'
  }
]

// 精选文章
const featuredArticles = [
  {
    id: 1,
    title: '深入理解 Token 平台的 AI 辅助创作功能',
    excerpt: '探索如何利用 AI 助手提升创作效率，从创意发想到内容优化的全流程实践指南...',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14c-2.67 0-8-1.34-8-4 0-2.67 5.33-4 8-4s8 1.33 8 4c0 2.67-5.33 4-8 4z"/>
    </svg>`,
    date: '2024-01-28',
    author: 'Token 技术团队',
    tags: ['AI 助手', '创作效率', '最佳实践']
  },
  {
    id: 2,
    title: '构建个人知识管理体系的实践之路',
    excerpt: '分享如何利用 Token 平台构建个性化的知识管理系统，提升学习效率与知识复用...',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
    </svg>`,
    date: '2024-01-25',
    author: '知识管理专家',
    tags: ['知识管理', '学习方法', '效率提升']
  },
  {
    id: 3,
    title: 'AI 驱动的团队协作新模式',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm18 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-12-2c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
    </svg>`,
    excerpt: '探讨如何将 AI 技术融入团队协作流程，提升沟通效率和创意激发...',
    date: '2024-01-22',
    author: '产品经理',
    tags: ['团队协作', 'AI 应用', '效率工具']
  }
]

// 技术专题
const techTopics = [
  {
    id: 1,
    title: 'AI 模型应用实践',
    icon: '🤖',
    gradient: 'linear-gradient(135deg, #6366F1, #818CF8)',
    description: '深入探讨 AI 模型在实际场景中的应用与优化',
    articles: [
      {
        id: 101,
        title: 'Transformer 模型在文本生成中的应用',
        date: '2024-01-20'
      },
      {
        id: 102,
        title: '如何优化 AI 模型的推理性能',
        date: '2024-01-18'
      }
    ]
  },
  {
    id: 2,
    title: '知识管理最佳实践',
    icon: '📚',
    gradient: 'linear-gradient(135deg, #10B981, #34D399)',
    description: '探索高效的知识管理方法和工具',
    articles: [
      {
        id: 201,
        title: '构建个人知识管理系统的方法论',
        date: '2024-01-15'
      },
      {
        id: 202,
        title: '团队知识库的搭建与维护',
        date: '2024-01-12'
      }
    ]
  }
]

// 作者信息
const authors = [
  {
    id: 1,
    name: '张明',
    title: 'AI 研究员',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="8" r="5"/>
      <path d="M3 21v-2c0-2.2 3.6-4 8-4s8 1.8 8 4v2"/>
    </svg>`,
    description: '专注于 AI 模型优化与应用研究',
    articles: 45,
    views: 120
  },
  {
    id: 2,
    name: '李华',
    title: '知识管理专家',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="8" r="5"/>
      <path d="M3 21v-2c0-2.2 3.6-4 8-4s8 1.8 8 4v2"/>
    </svg>`,
    description: '致力于知识管理体系的研究与实践',
    articles: 38,
    views: 95
  },
  {
    id: 3,
    name: '王芳',
    title: '产品经理',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="8" r="5"/>
      <path d="M3 21v-2c0-2.2 3.6-4 8-4s8 1.8 8 4v2"/>
    </svg>`,
    description: '关注产品创新与用户体验优化',
    articles: 42,
    views: 108
  }
]

// 最新动态
const updates = [
  {
    id: 1,
    date: '2024-01-30',
    title: 'Token AI 助手重大更新',
    content: '新版本支持多模态创作，提供更智能的写作建议...',
    tags: ['产品更新', 'AI 助手']
  },
  {
    id: 2,
    date: '2024-01-28',
    title: '知识管理工具升级',
    content: '新增智能标签系统，支持更精准的知识关联...',
    tags: ['功能优化', '知识管理']
  },
  {
    id: 3,
    date: '2024-01-25',
    title: '团队协作新特性',
    content: '引入实时协作编辑功能，支持多人同时创作...',
    tags: ['协作功能', '团队效率']
  }
]
</script>

<style scoped>
/* 调整整体容器和模块间距 */
.blogs-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 120px 60px;
}

/* 调整每个主要区块的间距 */
.hero-section {
  text-align: center;
  margin: 0 auto 160px;  /* 增加底部间距 */
  max-width: 1000px;
  position: relative;
}

.categories-section,
.featured-section,
.topics-section,
.authors-section,
.updates-section {
  margin-bottom: 200px;  /* 增加区块之间的间距 */
  position: relative;
}

/* 添加视觉分隔 */
.categories-section::after,
.featured-section::after,
.topics-section::after,
.authors-section::after {
  content: '';
  position: absolute;
  bottom: -100px;  /* 分隔线位置 */
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 2px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(99, 102, 241, 0.2),
    transparent
  );
}

/* 优化网格布局间距 */
.categories-grid {
  gap: 60px;  /* 增加卡片之间的间距 */
  padding: 40px 20px;
  margin-top: 80px;  /* 增加与标题的间距 */
}

.featured-grid {
  gap: 60px;
  padding: 40px 20px;
  margin-top: 80px;
}

.topics-grid {
  gap: 60px;
  padding: 40px 20px;
  margin-top: 80px;
}

.authors-grid {
  gap: 60px;
  padding: 40px 20px;
  margin-top: 80px;
}

/* 优化标题与内容的间距 */
.section-title {
  font-size: 2.4em;
  font-weight: 700;
  margin-bottom: 2em;  /* 增加标题与内容的间距 */
  text-align: center;
  color: #2D3748;
  position: relative;
}

/* 添加标题装饰 */
.section-title::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(to right, #6366F1, #818CF8);
  border-radius: 2px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .blogs-container {
    padding: 80px 20px;
  }

  .hero-section {
    margin-bottom: 120px;
  }

  .categories-section,
  .featured-section,
  .topics-section,
  .authors-section,
  .updates-section {
    margin-bottom: 160px;
  }

  .categories-grid,
  .featured-grid,
  .topics-grid,
  .authors-grid {
    gap: 40px;
    padding: 20px;
    margin-top: 60px;
  }

  .section-title {
    margin-bottom: 1.5em;
  }
}

/* 暗色模式适配 */
.dark .section-title::after {
  background: linear-gradient(to right, #818CF8, #6366F1);
}

.dark .categories-section::after,
.dark .featured-section::after,
.dark .topics-section::after,
.dark .authors-section::after {
  background: linear-gradient(
    to right,
    transparent,
    rgba(129, 140, 248, 0.2),
    transparent
  );
}

/* 整体容器样式 */
.blogs-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 120px 60px;
}

/* 头部区域 */
.hero-section {
  text-align: center;
  margin: 0 auto 160px;
  max-width: 1000px;
  position: relative;
}

.hero-section::before {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(129, 140, 248, 0.1));
  filter: blur(80px);
  top: -150px;
  left: -100px;
  border-radius: 50%;
  z-index: -1;
}

.page-title {
  font-size: 3.5em;
  font-weight: 900;
  background: linear-gradient(120deg, #6366F1, #818CF8, #A5B4FC);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;
  letter-spacing: -1px;
  position: relative;
}

.page-title::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  background: linear-gradient(120deg, #6366F1, #818CF8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.3;
  filter: blur(12px);
  animation: glow 3s ease-in-out infinite alternate;
}

.page-description {
  font-size: 1.2em;
  color: #666;
  line-height: 1.6;
}

/* 分类卡片 */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 50px;
  padding: 20px;
}

.category-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(99, 102, 241, 0.1);
  padding: 50px 40px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 30px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.category-card:hover {
  transform: translateY(-10px);
  border-color: rgba(99, 102, 241, 0.2);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.1);
}

.category-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin-bottom: 30px;
}

.category-icon svg {
  width: 40px;
  height: 40px;
  fill: white;
}

/* 精选文章 */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 50px;
  padding: 20px;
}

.featured-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 30px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-card:hover {
  transform: translateY(-10px);
  border-color: rgba(99, 102, 241, 0.2);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.1);
}

.article-image {
  position: relative;
  height: 280px;
  background: linear-gradient(135deg, #6366F1, #818CF8);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.svg-icon {
  width: 120px;
  height: 120px;
  color: rgba(255, 255, 255, 0.9);
  opacity: 0.8;
  transition: all 0.3s ease;
}

.featured-card:hover .svg-icon {
  transform: scale(1.1);
  opacity: 1;
}

.article-meta {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
}

.article-content {
  padding: 40px;
}

.article-tags {
  margin-bottom: 20px;
}

.tag {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(99, 102, 241, 0.1);
  color: #6366F1;
  border-radius: 20px;
  margin: 0 12px 12px 0;
  font-size: 0.95em;
  font-weight: 500;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
}

.tag:hover {
  background: rgba(99, 102, 241, 0.2);
  transform: translateY(-2px);
}

.read-more {
  display: inline-flex;
  align-items: center;
  color: #6366F1;
  text-decoration: none;
  margin-top: 20px;
  font-weight: 500;
}

.read-more svg {
  width: 20px;
  height: 20px;
  margin-left: 8px;
  fill: currentColor;
}

/* 技术专题 */
.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  margin-top: 60px;
}

.topic-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 30px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.topic-header {
  padding: 40px;
  color: white;
}

.topic-icon {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.topic-content {
  padding: 40px;
}

.topic-articles {
  list-style: none;
  padding: 0;
  margin: 20px 0 0;
}

.topic-articles li {
  margin-bottom: 16px;
}

.topic-articles a {
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

/* 作者专栏 */
.authors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 60px;
}

.author-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(99, 102, 241, 0.1);
  padding: 50px 40px;
  border-radius: 30px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.author-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366F1, #818CF8);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar-icon {
  width: 60px;
  height: 60px;
  color: rgba(255, 255, 255, 0.9);
}

.author-info h3 {
  font-size: 1.6em;
  margin: 0.5em 0;
  color: #2D3748;
}

.author-title {
  font-size: 1.1em;
  color: #6366F1;
  margin-bottom: 1em;
  font-weight: 500;
}

.author-desc {
  font-size: 1.1em;
  line-height: 1.7;
  color: #4A5568;
  margin-bottom: 1.5em;
}

.author-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.8em;
  font-weight: 700;
  color: #6366F1;
  margin-bottom: 0.2em;
}

.stat-label {
  font-size: 0.95em;
  color: #4A5568;
  font-weight: 500;
}

/* 最新动态 */
.timeline {
  margin-top: 60px;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, rgba(99, 102, 241, 0.1), rgba(129, 140, 248, 0.1));
}

.timeline-item {
  margin-bottom: 80px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 40px;
}

.timeline-date {
  text-align: right;
  padding-right: 40px;
  color: #666;
  font-size: 1.1em;
  font-weight: 500;
}

.timeline-content {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(99, 102, 241, 0.1);
  padding: 30px;
  border-radius: 20px;
}

/* 暗色模式 */
.dark .blogs-container {
  background: linear-gradient(to bottom, #111, #1a1a1a);
}

.dark .category-card,
.dark .featured-card,
.dark .topic-card,
.dark .author-card,
.dark .timeline-content {
  background: rgba(31, 31, 31, 0.9);
  border-color: rgba(255, 255, 255, 0.05);
}

.dark .page-description,
.dark .timeline-date {
  color: #999;
}

.dark .topic-articles a {
  color: #fff;
}

/* 动画效果 */
@keyframes titleFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* 响应式适配 */
@media (max-width: 768px) {
  .blogs-container {
    padding: 80px 20px;
  }
  
  .hero-section {
    margin-bottom: 120px;
  }
  
  .page-title {
    font-size: 3em;
  }
  
  .timeline-item {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .timeline-date {
    text-align: left;
    padding-right: 0;
  }
}

/* 调整标题和段落样式 */
.section-title {
  font-size: 2.4em;
  font-weight: 700;
  margin-bottom: 1.5em;
  text-align: center;
  color: #2D3748;
}

.dark .section-title {
  color: #E2E8F0;
}

/* 调整卡片间距和布局 */
.categories-grid {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 50px;
  padding: 20px;
}

.category-card {
  padding: 50px 40px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.category-content h3 {
  font-size: 1.8em;
  margin-bottom: 1em;
}

.category-count {
  font-size: 1.1em;
  color: #6366F1;
  margin-bottom: 1em;
  font-weight: 600;
}

.category-desc {
  font-size: 1.1em;
  line-height: 1.7;
  color: #4A5568;
}

/* 优化文章卡片样式 */
.featured-grid {
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 50px;
  padding: 20px;
}

.article-content h3 {
  font-size: 1.6em;
  font-weight: 800;
  background: linear-gradient(45deg, #2D3748, #4A5568);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform-origin: left;
  transition: all 0.3s ease;
}

.featured-card:hover .article-content h3 {
  transform: scale(1.02);
  background: linear-gradient(45deg, #6366F1, #818CF8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.article-content p {
  font-size: 1.1em;
  line-height: 1.8;
  color: #4A5568;
  margin-bottom: 1.5em;
}

/* 优化标签样式 */
.tag {
  padding: 8px 16px;
  margin: 0 12px 12px 0;
  font-size: 0.95em;
  font-weight: 500;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
}

.tag:hover {
  background: rgba(99, 102, 241, 0.2);
  transform: translateY(-2px);
}

/* 替换默认图片的 SVG 背景 */
.article-image {
  position: relative;
  height: 280px;
  background: linear-gradient(135deg, #6366F1, #818CF8);
  overflow: hidden;
}

.article-image::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(255,255,255,0.1)' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.3;
}

/* 优化作者卡片样式 */
.author-card {
  padding: 50px 40px;
}

.author-info h3 {
  font-size: 1.6em;
  margin: 0.5em 0;
  color: #2D3748;
}

.author-title {
  font-size: 1.1em;
  color: #6366F1;
  margin-bottom: 1em;
  font-weight: 500;
}

.author-desc {
  font-size: 1.1em;
  line-height: 1.7;
  color: #4A5568;
  margin-bottom: 1.5em;
}

.author-stats .stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.8em;
  font-weight: 700;
  color: #6366F1;
  margin-bottom: 0.2em;
}

.stat-label {
  font-size: 0.95em;
  color: #4A5568;
  font-weight: 500;
}

/* 优化时间线样式 */
.timeline-item {
  margin-bottom: 80px;
}

.timeline-date {
  font-size: 1.1em;
  font-weight: 500;
}

.timeline-content h3 {
  font-size: 1.4em;
  margin-bottom: 1em;
  color: #2D3748;
}

.timeline-content p {
  font-size: 1.1em;
  line-height: 1.7;
  color: #4A5568;
  margin-bottom: 1.5em;
}

/* 暗色模式补充 */
.dark .category-content h3,
.dark .article-content h3,
.dark .author-info h3,
.dark .timeline-content h3 {
  color: #E2E8F0;
}

.dark .category-desc,
.dark .article-content p,
.dark .author-desc,
.dark .timeline-content p,
.dark .stat-label {
  color: #A0AEC0;
}

/* 添加更多动画效果 */
.category-card,
.featured-card,
.author-card,
.timeline-content {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.category-card:hover,
.featured-card:hover,
.author-card:hover {
  transform: translateY(-10px) scale(1.02);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.section-title,
.categories-grid,
.featured-grid,
.authors-grid,
.timeline {
  animation: fadeIn 0.8s ease-out forwards;
}

/* 标题动效 */
.page-title {
  font-size: 3.5em;
  font-weight: 900;
  background: linear-gradient(120deg, #6366F1, #818CF8, #A5B4FC);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;
  letter-spacing: -1px;
  position: relative;
}

.page-title::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  background: linear-gradient(120deg, #6366F1, #818CF8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.3;
  filter: blur(12px);
  animation: glow 3s ease-in-out infinite alternate;
}

/* 分类卡片标题 */
.category-content h3 {
  font-size: 1.8em;
  font-weight: 800;
  background: linear-gradient(to right, #fff, #e2e8f0);
  -webkit-background-clip: text;
  position: relative;
  transition: all 0.3s ease;
}

.category-content h3::before {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 0;
  background: linear-gradient(90deg, #6366F1, transparent);
  transition: width 0.3s ease;
}

.category-card:hover h3::before {
  width: 100%;
}

/* 文章标题 */
.article-content h3 {
  font-size: 1.6em;
  font-weight: 800;
  background: linear-gradient(45deg, #2D3748, #4A5568);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform-origin: left;
  transition: all 0.3s ease;
}

.featured-card:hover .article-content h3 {
  transform: scale(1.02);
  background: linear-gradient(45deg, #6366F1, #818CF8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 标签样式 */
.tag {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9em;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.tag::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(99, 102, 241, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.tag:hover::before {
  width: 300%;
  height: 300%;
}

/* 动画效果 */
@keyframes shine {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

@keyframes glow {
  0% { filter: blur(12px) brightness(100%); }
  100% { filter: blur(16px) brightness(120%); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* 卡片悬浮效果 */
.category-card,
.featured-card,
.author-card {
  position: relative;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.category-card::after,
.featured-card::after,
.author-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(129, 140, 248, 0.2));
  opacity: 0;
  transition: opacity 0.5s ease;
}

.category-card:hover,
.featured-card:hover,
.author-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
}

.category-card:hover::after,
.featured-card:hover::after,
.author-card:hover::after {
  opacity: 1;
}

/* 数字动效 */
.stat-number {
  font-size: 2em;
  font-weight: 800;
  background: linear-gradient(120deg, #6366F1, #818CF8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  animation: float 3s ease-in-out infinite;
}

.stat-number::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #6366F1, transparent);
  animation: shine 2s linear infinite;
}

/* 暗色模式适配 */
.dark .category-content h3,
.dark .article-content h3 {
  background: linear-gradient(to right, #e2e8f0, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dark .tag {
  background: rgba(99, 102, 241, 0.15);
  border-color: rgba(99, 102, 241, 0.3);
}
</style>
