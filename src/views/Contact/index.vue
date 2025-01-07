<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 定义表单数据
const form = reactive({
  name: '',
  email: '',
  type: '',
  message: '',
})

// 提示窗口状态
const showNotification = ref(false)
const notificationMessage = ref('')
const notificationType = ref('success')
const isLoading = ref(false)

// 显示提示窗口
const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  notificationMessage.value = message
  notificationType.value = type
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
}

// 表单提交处理
const submitForm = async () => {
  try {
    isLoading.value = true
    // 准备发送的数据
    const emailData = {
      service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      user_id: import.meta.env.VITE_EMAILJS_USER_ID,
      template_params: {
        from_name: form.name,
        from_email: form.email,
        to_name: 'Token 团队',
        message: form.message,
        reply_to: form.email,
        type:
          form.type === 'business'
            ? t('contact.form.typeOptions.business')
            : form.type === 'technical'
              ? t('contact.form.typeOptions.technical')
              : t('contact.form.typeOptions.other'),
      },
    }

    // 直接调用 EmailJS API 发送邮件
    const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', emailData)

    if (response.status === 200) {
      showToast(t('contact.notification.success'))
      // 清空表单
      form.name = ''
      form.email = ''
      form.type = ''
      form.message = ''
    }
  } catch (error) {
    console.error('Error:', error)
    showToast(t('contact.notification.error'), 'error')
  } finally {
    // 恢复按钮状态
    isLoading.value = false
  }
}
</script>

<template>
  <div class="contact-wrapper">
    <div class="contact-container">
      <div class="hero-section">
        <h1 class="page-title">{{ $t('contact.title') }}</h1>
        <p class="page-description">
          {{ $t('contact.description') }}
          <span class="highlight">·</span>
          {{ $t('contact.description2') }}
        </p>
      </div>

      <section class="why-us-section">
        <h2 class="section-title">{{ $t('contact.whyUs.title') }}</h2>
        <div class="card-grid">
          <div class="feature-card">
            <div class="card-icon ai-icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                />
              </svg>
            </div>
            <h3>{{ $t('contact.whyUs.ai.title') }}</h3>
            <p>{{ $t('contact.whyUs.ai.desc') }}</p>
          </div>
          <div class="feature-card">
            <div class="card-icon knowledge-icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"
                />
              </svg>
            </div>
            <h3>{{ $t('contact.whyUs.knowledge.title') }}</h3>
            <p>{{ $t('contact.whyUs.knowledge.desc') }}</p>
          </div>
          <div class="feature-card">
            <div class="card-icon support-icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                />
              </svg>
            </div>
            <h3>{{ $t('contact.whyUs.support.title') }}</h3>
            <p>{{ $t('contact.whyUs.support.desc') }}</p>
          </div>
        </div>
      </section>

      <section class="process-section">
        <h2 class="section-title">{{ $t('contact.process.title') }}</h2>
        <div class="process-steps">
          <div class="step">
            <div class="step-number">01</div>
            <h3>{{ $t('contact.process.steps.submit.title') }}</h3>
            <p>{{ $t('contact.process.steps.submit.desc') }}</p>
          </div>
          <div class="step">
            <div class="step-number">02</div>
            <h3>{{ $t('contact.process.steps.evaluate.title') }}</h3>
            <p>{{ $t('contact.process.steps.evaluate.desc') }}</p>
          </div>
          <div class="step">
            <div class="step-number">03</div>
            <h3>{{ $t('contact.process.steps.confirm.title') }}</h3>
            <p>{{ $t('contact.process.steps.confirm.desc') }}</p>
          </div>
          <div class="step">
            <div class="step-number">04</div>
            <h3>{{ $t('contact.process.steps.start.title') }}</h3>
            <p>{{ $t('contact.process.steps.start.desc') }}</p>
          </div>
        </div>
      </section>

      <section class="highlights-section">
        <h2 class="section-title">{{ $t('contact.highlights.title') }}</h2>
        <div class="highlights-grid">
          <div class="highlight-card">
            <div class="highlight-icon">🚀</div>
            <div class="highlight-content">
              <h3>{{ $t('contact.highlights.response.title') }}</h3>
              <p class="highlight-number">{{ $t('contact.highlights.response.number') }}</p>
              <p class="highlight-desc">{{ $t('contact.highlights.response.desc') }}</p>
            </div>
          </div>

          <div class="highlight-card">
            <div class="highlight-icon">💡</div>
            <div class="highlight-content">
              <h3>{{ $t('contact.highlights.innovation.title') }}</h3>
              <p class="highlight-number">{{ $t('contact.highlights.innovation.number') }}</p>
              <p class="highlight-desc">{{ $t('contact.highlights.innovation.desc') }}</p>
            </div>
          </div>

          <div class="highlight-card">
            <div class="highlight-icon">👥</div>
            <div class="highlight-content">
              <h3>{{ $t('contact.highlights.team.title') }}</h3>
              <p class="highlight-number">{{ $t('contact.highlights.team.number') }}</p>
              <p class="highlight-desc">{{ $t('contact.highlights.team.desc') }}</p>
            </div>
          </div>

          <div class="highlight-card">
            <div class="highlight-icon">🌟</div>
            <div class="highlight-content">
              <h3>{{ $t('contact.highlights.satisfaction.title') }}</h3>
              <p class="highlight-number">{{ $t('contact.highlights.satisfaction.number') }}</p>
              <p class="highlight-desc">{{ $t('contact.highlights.satisfaction.desc') }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="contact-section">
        <div class="contact-grid">
          <div class="contact-info">
            <div class="info-group">
              <h3>{{ $t('contact.contact.business.title') }}</h3>
              <div class="info-item">
                <svg viewBox="0 0 24 24" class="info-icon">
                  <path
                    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                  />
                </svg>
                <span>851543@qq.com</span>
              </div>
              <div class="info-item">
                <svg viewBox="0 0 24 24" class="info-icon">
                  <path
                    d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                  />
                </svg>
                <span>{{ $t('contact.contact.business.phone') }}</span>
              </div>
            </div>

            <div class="info-group">
              <h3>{{ $t('contact.contact.technical.title') }}</h3>
              <div class="info-item">
                <svg viewBox="0 0 24 24" class="info-icon">
                  <path
                    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                  />
                </svg>
                <span>{{ $t('contact.contact.technical.email') }}</span>
              </div>
              <div class="info-item">
                <svg viewBox="0 0 24 24" class="info-icon">
                  <path
                    d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-5.373-9-12-9z"
                  />
                </svg>
                <span>{{ $t('contact.contact.technical.support') }}</span>
              </div>
            </div>

            <div class="info-group">
              <h3>{{ $t('contact.contact.social.title') }}</h3>
              <div class="social-links">
                <a href="https://github.com/851543" target="_blank" class="social-link">
                  <svg viewBox="0 0 24 24" class="social-icon">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.222 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                  GitHub
                </a>
                <a href="javascript:void(0)" class="social-link">
                  <svg viewBox="0 0 24 24" class="social-icon">
                    <path
                      d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
                    />
                  </svg>
                  Discord
                </a>
                <a href="javascript:void(0)" class="social-link">
                  <svg viewBox="0 0 24 24" class="social-icon">
                    <path
                      d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
                    />
                  </svg>
                  Twitter
                </a>
                <a href="javascript:void(0)" class="social-link">
                  <svg viewBox="0 0 24 24" class="social-icon">
                    <path
                      d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                    />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>

            <div class="info-group">
              <h3>{{ $t('contact.contact.workingHours.title') }}</h3>
              <div class="info-item">
                <svg viewBox="0 0 24 24" class="info-icon">
                  <path
                    d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                  />
                </svg>
                <div class="working-hours">
                  <p>{{ $t('contact.contact.workingHours.weekdays') }}</p>
                  <p>{{ $t('contact.contact.workingHours.weekends') }}</p>
                </div>
              </div>
            </div>

            <div class="info-group">
              <h3>{{ $t('contact.contact.emergency.title') }}</h3>
              <div class="info-item emergency">
                <svg viewBox="0 0 24 24" class="info-icon">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                  />
                </svg>
                <div class="emergency-info">
                  <p>{{ $t('contact.contact.emergency.phone') }}</p>
                  <small>{{ $t('contact.contact.emergency.note') }}</small>
                </div>
              </div>
            </div>
          </div>

          <div class="contact-form">
            <h2>{{ $t('contact.form.title') }}</h2>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">{{ $t('contact.form.name') }}</label>
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  :placeholder="$t('contact.form.namePlaceholder')"
                  required
                />
              </div>

              <div class="form-group">
                <label for="email">{{ $t('contact.form.email') }}</label>
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  :placeholder="$t('contact.form.emailPlaceholder')"
                  required
                />
              </div>

              <div class="form-group">
                <label for="type">{{ $t('contact.form.type') }}</label>
                <select id="type" v-model="form.type" required>
                  <option value="">{{ $t('contact.form.typePlaceholder') }}</option>
                  <option value="business">{{ $t('contact.form.typeOptions.business') }}</option>
                  <option value="technical">{{ $t('contact.form.typeOptions.technical') }}</option>
                  <option value="other">{{ $t('contact.form.typeOptions.other') }}</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message">{{ $t('contact.form.message') }}</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  :placeholder="$t('contact.form.messagePlaceholder')"
                  required
                ></textarea>
              </div>

              <button type="submit" class="submit-btn" :disabled="isLoading">
                <template v-if="isLoading">
                  <span class="loading-spinner"></span>
                  <span>{{ $t('contact.form.sending') }}</span>
                </template>
                <template v-else>
                  <span>{{ $t('contact.form.submit') }}</span>
                  <svg viewBox="0 0 24 24" class="send-icon">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </template>
              </button>
            </form>
          </div>
        </div>
      </section>

      <section class="office-section">
        <h2 class="section-title">{{ $t('contact.offices.title') }}</h2>
        <div class="office-grid">
          <div class="office-card">
            <div class="office-icon">📍</div>
            <h3>{{ $t('contact.offices.nanning.title') }}</h3>
            <p>{{ $t('contact.offices.nanning.address') }}</p>
            <p>{{ $t('contact.offices.nanning.hours') }}</p>
          </div>
          <div class="office-card">
            <div class="office-icon">📍</div>
            <h3>{{ $t('contact.offices.yulin.title') }}</h3>
            <p>{{ $t('contact.offices.yulin.address') }}</p>
            <p>{{ $t('contact.offices.yulin.hours') }}</p>
          </div>
          <div class="office-card">
            <div class="office-icon">📍</div>
            <h3>{{ $t('contact.offices.beihai.title') }}</h3>
            <p>{{ $t('contact.offices.beihai.address') }}</p>
            <p>{{ $t('contact.offices.beihai.hours') }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
  <Transition name="slide">
    <div
      v-if="showNotification"
      class="notification"
      :class="{
        'notification-success': notificationType === 'success',
        'notification-error': notificationType === 'error',
      }"
    >
      {{ notificationMessage }}
    </div>
  </Transition>
</template>

<style scoped>
/* 全屏包装盒子 */
.contact-wrapper {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: #fff;
  transition: background-color 0.3s ease;
}

/* 黑夜模式 */
.dark .contact-wrapper {
  background: #121212;
  color: #fff;
}

/* 整体容器样式 */
.contact-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 120px 60px;
}

/* 头部区域 */
.hero-section {
  text-align: center;
  margin: 0 auto 200px;
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
  font-size: 4.5em;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #6366f1, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleFloat 3s ease-in-out infinite;
}

.page-description {
  font-size: 1.2em;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.highlight {
  color: #6366f1;
  margin: 0 8px;
}

.why-us-section {
  margin-bottom: 160px;
}

.section-title {
  text-align: center;
  font-size: 2.4em;
  margin-bottom: 50px;
  color: #333;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 40px;
  padding: 20px;
}

.feature-card {
  background: #fff;
  padding: 50px;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.12);
}

.card-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon svg {
  width: 32px;
  height: 32px;
  fill: white;
}

.ai-icon {
  background: linear-gradient(135deg, #6366f1, #818cf8);
}

.knowledge-icon {
  background: linear-gradient(135deg, #10b981, #34d399);
}

.support-icon {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
}

.feature-card h3 {
  font-size: 1.4em;
  margin-bottom: 12px;
  color: #333;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.process-section {
  margin: 160px 0;
}

.process-steps {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-top: 60px;
}

.step {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(99, 102, 241, 0.1);
  padding: 50px 40px;
  border-radius: 30px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.step::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(129, 140, 248, 0.05));
  top: 0;
  left: 0;
  transform: translateY(100%);
  transition: transform 0.4s ease;
}

.step:hover::before {
  transform: translateY(0);
}

.step:hover {
  transform: translateY(-10px);
  border-color: rgba(99, 102, 241, 0.2);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.1);
}

.step-number {
  font-size: 3.5em;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 30px;
  position: relative;
}

.highlights-section {
  margin: 160px 0;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 40px;
  margin-top: 60px;
}

.highlight-card {
  background: #fff;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 24px;
}

.highlight-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.12);
}

.highlight-icon {
  font-size: 2.5em;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(129, 140, 248, 0.1));
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}

.highlight-content {
  flex: 1;
}

.highlight-content h3 {
  font-size: 1.2em;
  margin-bottom: 12px;
  color: #333;
}

.highlight-number {
  font-size: 2.5em;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}

.highlight-desc {
  color: #666;
  font-size: 0.95em;
}

.contact-section {
  margin-top: 60px;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 60px;
  margin-top: 80px;
}

.contact-info {
  background: #fff;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.info-group {
  margin-bottom: 40px;
}

.info-group h3 {
  font-size: 1.2em;
  margin-bottom: 16px;
  color: #333;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.info-item:hover {
  background: rgba(99, 102, 241, 0.05);
}

.info-icon {
  width: 24px;
  height: 24px;
  fill: #6366f1;
  flex-shrink: 0;
}

.social-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;
  font-size: 0.95em;
}

.social-link:hover {
  background: #6366f1;
  color: white;
  transform: translateY(-2px);
}

.social-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.working-hours p,
.emergency-info p {
  margin: 0;
  line-height: 1.6;
}

.working-hours p:last-child,
.emergency-info small {
  color: #666;
  font-size: 0.9em;
}

.emergency {
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.1);
}

.emergency .info-icon {
  fill: #ef4444;
}

.emergency:hover {
  background: rgba(239, 68, 68, 0.1);
}

.contact-form {
  background: #fff;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.contact-form h2 {
  font-size: 1.8em;
  margin-bottom: 30px;
  color: #333;
}

.form-group {
  margin-bottom: 32px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 16px;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 1em;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #6366f1;
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-group textarea {
  height: 150px;
  resize: vertical;
}

.submit-btn {
  background: linear-gradient(135deg, #6366f1, #818cf8);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  min-width: 160px;
  height: 52px;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.send-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.office-section {
  margin: 160px 0;
}

.office-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 60px;
}

.office-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(99, 102, 241, 0.1);
  padding: 50px 40px;
  border-radius: 30px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.office-card::after {
  content: '';
  position: absolute;
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(129, 140, 248, 0.1));
  border-radius: 50%;
  bottom: -100px;
  right: -100px;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.office-card:hover::after {
  opacity: 1;
}

.office-card:hover {
  transform: translateY(-10px);
  border-color: rgba(99, 102, 241, 0.2);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.1);
}

.office-icon {
  font-size: 2.5em;
  margin-bottom: 30px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(129, 140, 248, 0.1));
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin: 0 auto 30px;
}

.office-card h3 {
  margin-bottom: 16px;
  color: #333;
}

.office-card p {
  color: #666;
  line-height: 1.6;
}

/* 动画效果 */
@keyframes titleFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 加载动画 */
.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 提示窗口 */
.notification {
  position: fixed;
  top: 60px;
  right: 20px;
  padding: 16px 24px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  font-size: 0.95em;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(400px);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.notification-success {
  background: #10b981;
  color: white;
}

.notification-error {
  background: #ef4444;
  color: white;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .contact-container {
    padding: 60px 30px;
  }

  .hero-section {
    margin: 80px auto 120px;
  }

  .card-grid {
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .contact-container {
    padding: 40px 20px;
  }

  .hero-section {
    margin: 60px auto 100px;
  }

  .feature-card,
  .contact-info,
  .contact-form {
    padding: 30px;
  }

  .page-title {
    font-size: 2.5em;
  }

  .social-links {
    grid-template-columns: repeat(2, 1fr);
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .highlights-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  .highlight-card {
    padding: 30px;
  }

  .highlight-icon {
    width: 60px;
    height: 60px;
    font-size: 2em;
  }

  .highlight-number {
    font-size: 2em;
  }
}

/* Dark mode styles */
.dark .feature-card,
.dark .contact-info,
.dark .contact-form {
  background: #1f1f1f;
}

.dark .feature-card h3,
.dark .contact-form h2,
.dark .info-group h3 {
  color: #fff;
}

.dark .feature-card p,
.dark .info-item span {
  color: #999;
}

.dark .social-link {
  background: #2a2a2a;
  color: #fff;
}

.dark .form-group label {
  color: #fff;
}

.dark .form-group input,
.dark .form-group select,
.dark .form-group textarea {
  background: #2a2a2a;
  border-color: #333;
  color: #fff;
}

.dark .highlight-card {
  background: #1f1f1f;
}

.dark .highlight-icon {
  background: rgba(255, 255, 255, 0.05);
}

.dark .highlight-content h3 {
  color: #fff;
}

.dark .highlight-desc {
  color: #999;
}

.dark .step,
.dark .office-card {
  background: rgba(31, 31, 31, 0.9);
  border-color: rgba(255, 255, 255, 0.05);
}

.dark .step-number {
  color: #818cf8;
}

.dark .office-card h3 {
  color: #fff;
}

.dark .office-card p {
  color: #999;
}

.dark .notification {
  background: #1f1f1f;
  color: white;
}

.dark .info-item:hover {
  background: rgba(99, 102, 241, 0.1);
}

.dark .working-hours p:last-child,
.dark .emergency-info small {
  color: #999;
}

.dark .emergency {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.2);
}
</style>
