<template>
  <div class="contact-container">
    <h1 class="page-title">联系我们</h1>
    <p class="page-description">有任何问题或建议？欢迎随时与我们联系。</p>

    <div class="contact-content">
      <div class="contact-info">
        <div class="info-item">
          <h3>社交媒体</h3>
          <div class="social-links">
            <a href="#" target="_blank">
              <img src="@/assets/images/Github.svg" alt="GitHub" />
            </a>
            <a href="#" target="_blank">
              <img src="@/assets/images/Discord.svg" alt="Discord" />
            </a>
          </div>
        </div>

        <div class="info-item">
          <h3>电子邮件</h3>
          <p>contact@token.com</p>
        </div>

        <div class="info-item">
          <h3>地址</h3>
          <p>中国，北京市</p>
        </div>
      </div>

      <form class="contact-form" @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">姓名</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>

        <div class="form-group">
          <label for="email">邮箱</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>

        <div class="form-group">
          <label for="message">留言</label>
          <textarea id="message" v-model="form.message" required></textarea>
        </div>

        <button type="submit" class="submit-btn">发送消息</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const submitForm = () => {
  // 处理表单提交
  console.log('Form submitted:', form)
}
</script>

<style scoped>
.contact-container {
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

.contact-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
}

.contact-info {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.info-item {
  margin-bottom: 30px;
}

.info-item h3 {
  margin-bottom: 10px;
  font-weight: 400;
}

.info-item p {
  color: #666;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-links img {
  width: 24px;
  height: 24px;
  transition: opacity 0.3s;
}

.social-links img:hover {
  opacity: 0.7;
}

.contact-form {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #666;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.form-group textarea {
  height: 150px;
  resize: vertical;
}

.submit-btn {
  background: #4285f4;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background: #3367d6;
}

/* 暗色模式 */
.dark .contact-info,
.dark .contact-form {
  background: #2a2a2a;
}

.dark .info-item h3 {
  color: #fff;
}

.dark .info-item p {
  color: #aaa;
}

.dark .form-group label {
  color: #aaa;
}

.dark .form-group input,
.dark .form-group textarea {
  background: #333;
  border-color: #444;
  color: #fff;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}
</style>
