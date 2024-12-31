<template>
  <div class="daily-goal" :class="{ 'show': isVisible }">
    <div class="daily-goal-content">
      <div class="daily-goal-text">老朋友，你怎么才回来呀～</div>
    </div>
    <div class="mascot">
      <div class="eyes">
        <div class="eye"></div>
        <div class="eye"></div>
      </div>
      <div class="glow"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 2000)
})
</script>

<style scoped>
.daily-goal {
  position: fixed;
  left: 20px;
  bottom: 20px;
  background: rgba(17, 17, 17, 0.8);
  border-radius: 12px;
  padding: 12px 20px;
  color: white;
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1000;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.daily-goal.show {
  transform: translateY(0);
  opacity: 1;
}

.daily-goal-content {
  position: relative;
  z-index: 2;
}

.daily-goal-text {
  font-size: 14px;
  margin-bottom: 30px;
}

.mascot {
  position: absolute;
  bottom: -20px;
  left: 20px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #7928CA, #FF0080);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: float 3s ease-in-out infinite;
}

.eyes {
  display: flex;
  gap: 8px;
  transform: translateY(-2px);
}

.eye {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  position: relative;
}

.glow {
  position: absolute;
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: 50%;
  filter: blur(15px);
  opacity: 0.5;
  z-index: -1;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* 添加鼠标悬停效果 */
.mascot:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

.mascot:hover .eye {
  animation: blink 2s infinite;
}

@keyframes blink {
  0%, 100% { height: 8px; }
  50% { height: 1px; }
}
</style> 