<template>
  <div class="footer-container">
    <div class="gradient-border">
      <div class="footer">
        <div class="footer-content">
          <div class="copyright">版权所有 © 2024 - {{ currentYear }} Token. 保留所有权利</div>
          <div class="powered-by">
            由
            <a href="javascript:void(0)" rel="noopener">VUE3</a>
            驱动 &
            <a href="javascript:void(0)" rel="noopener">TOEKN</a>
            主题
          </div>
          <div class="stats">
            <span>浏览次数：{{ visitCount }}</span>
            <span>建站天数：{{ daysSinceCreation }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const currentYear = new Date().getFullYear()

// 计算建站天数
const startDate = new Date('2019-01-01')
const today = new Date()
const daysSinceCreation = Math.floor(
  (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
)

// 访问次数
const visitCount = ref(107059)
</script>

<style scoped>
.footer {
  background: #fff;
  padding: 20px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  color: #888;
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei', '微软雅黑',
    sans-serif;
  font-weight: 300;
  letter-spacing: 0.3px;
}

.powered-by a {
  color: #4285f4;
  text-decoration: none;
  transition: color 0.3s;
  font-weight: 400;
}

.powered-by a:hover {
  color: #ff4081;
}

.stats {
  display: flex;
  gap: 20px;
  font-weight: 300;
}

.stats span {
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
}

@keyframes gradient {
  0% {
    background-position: 200% center;
  }
  100% {
    background-position: -200% center;
  }
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 10px;
    text-align: center;
    padding: 15px;
    font-size: 12px;
  }

  .stats {
    flex-direction: column;
    gap: 5px;
  }
}
</style>
