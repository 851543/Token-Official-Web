<template>
  <section class="contact" id="contact">
    <h2>Contact Us</h2>
    <div class="contact-container">
      <form @submit.prevent="handleSubmit" class="contact-form">
        <div class="form-group">
          <input 
            v-model="form.name" 
            type="text" 
            placeholder="Your Name"
            required
          >
        </div>
        <div class="form-group">
          <input 
            v-model="form.email" 
            type="email" 
            placeholder="Your Email"
            required
          >
        </div>
        <div class="form-group">
          <textarea 
            v-model="form.message" 
            placeholder="Your Message"
            required
          ></textarea>
        </div>
        <button type="submit" class="submit-btn">Send Message</button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface ContactForm {
  name: string
  email: string
  message: string
}

const form = reactive<ContactForm>({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Form submitted:', form)
  // 这里添加表单提交逻辑
}
</script>

<style scoped>
.contact {
  padding: 4rem 2rem;
  background: #f8f9fa;
}

.contact-container {
  max-width: 800px;
  margin: 0 auto;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  height: 150px;
}

.submit-btn {
  padding: 1rem 2rem;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style> 