<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import axios from 'axios'
// @ts-ignore
import tips from '@/assets/live2d/waifu-tips.json?raw'
import type { WaifuTips } from '@/types/live2d'


// 从环境变量获取API密钥
const API_KEY = import.meta.env.VITE_BAIDU_API_KEY
const SECRET_KEY = import.meta.env.VITE_BAIDU_SECRET_KEY

// 当前正在输出的文本
const currentText = ref('')
// 完整的响应文本
const fullText = ref('')
// 打字机效果的定时器
let typewriterTimer: number | null = null

/**
 * 实现打字机效果
 * @param text 要显示的完整文本
 */
function typewriterEffect(text: string) {
  // 清除之前的定时器
  if (typewriterTimer) {
    clearInterval(typewriterTimer)
  }
  
  // 重置当前文本
  currentText.value = ''
  fullText.value = text
  let index = 0
  
  // 设置打字机效果的定时器
  typewriterTimer = window.setInterval(() => {
    if (index < text.length) {
      currentText.value += text[index]
      // 更新显示
      showTips(currentText.value)
      index++
    } else {
      // 完成输出后清除定时器
      if (typewriterTimer) {
        clearInterval(typewriterTimer)
        typewriterTimer = null
      }
    }
  }, 50) // 每50ms输出一个字符
}

/**
 * 获取百度API访问令牌
 */
async function getAccessToken() {
  try {
    const options = {
      method: 'POST',
      url: `/oauth/2.0/token?grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET_KEY}`,
    }
    const response = await axios(options)
    if (response.data.access_token) {
      return response.data.access_token
    }
    throw new Error('Failed to get access token')
  } catch (error) {
    console.error('获取访问令牌失败:', error)
    throw error
  }
}

/**
 * 调用ERNIE对话API
 * @param message 用户输入的消息
 */
async function chatWithERNIE(message: string) {
  try {
    const accessToken = await getAccessToken()
    const url = `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-tiny-8k?access_token=${accessToken}`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.95,
        top_p: 0.7,
        penalty_score: 1,
        stream: true
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      if (errorData.error_code === 111 || errorData.error_code === 100) {
        await getAccessToken()
        return chatWithERNIE(message)
      }
      throw new Error(errorData.error_msg || '请求失败')
    }

    const reader = response.body?.getReader()
    if (!reader) throw new Error('无法获取响应流')
    
    let fullResponse = ''
    let currentIndex = 0
    let isTyping = false

    // 清除之前的定时器
    if (typewriterTimer) {
      clearInterval(typewriterTimer)
      typewriterTimer = null
    }

    // 打字机效果函数
    const typeNextChar = () => {
      if (currentIndex < fullResponse.length) {
        showTips(fullResponse.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        isTyping = false
      }
    }

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      // 解码二进制数据为文本
      const chunk = new TextDecoder().decode(value)
      const lines = chunk.split('\n')

      // 处理每一行数据
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6)
          if (jsonStr === '[DONE]') continue

          try {
            const data = JSON.parse(jsonStr)
            if (data.result) {
              fullResponse = data.result
              
              // 如果还没有开始打字效果，启动它
              if (!isTyping) {
                isTyping = true
                typewriterTimer = window.setInterval(typeNextChar, 50)
              }
            }
          } catch (e) {
            console.error('解析响应数据失败:', e)
          }
        }
      }
    }

    // 等待打字效果完成
    while (isTyping) {
      await new Promise(resolve => setTimeout(resolve, 50))
    }

    return fullResponse || '抱歉，我现在有点累，待会再聊吧~'
  } catch (error) {
    console.error('调用ERNIE API失败:', error)
    throw error
  }
}

// 工具菜单显示状态
const showToolMenu = ref(false)
// 聊天框显示状态
const showChatBox = ref(false)
// 聊天输入内容
const chatInput = ref('')
// 是否正在等待AI响应
const isWaitingResponse = ref(false)
// 解析提示配置文件
const waifuTips: WaifuTips = JSON.parse(tips)
// 提示框DOM引用
const tipsRef = ref<HTMLElement | null>(null)
// 提示框定时器
let tipsTimer: number | null = null
// 页面滚动进度
const scrollProgress = ref(0)

/**
 * 显示提示文本
 * @param text 要显示的文本
 */
function showTips(text: string) {
  if (!tipsRef.value) return
  tipsRef.value.innerHTML = text
  tipsRef.value.classList.add('waifu-tips-active')
  
  if (tipsTimer) clearTimeout(tipsTimer)
  tipsTimer = window.setTimeout(() => {
    if (tipsRef.value) {
      tipsRef.value.classList.remove('waifu-tips-active')
    }
  }, 3000)
}

/**
 * 从文本数组中随机获取一条文本
 * @param textArray 文本数组或单个文本
 * @returns 随机文本
 */
function getRandomText(textArray: string | string[]) {
  if (typeof textArray === 'string') return textArray
  return textArray[Math.floor(Math.random() * textArray.length)]
}

/**
 * 检查当前时间并显示对应的问候语
 */
function checkTimeGreetings() {
  const hour = new Date().getHours()
  const timeConfig = waifuTips.time.find(t => {
    const [start, end] = t.hour.split('-').map(Number)
    return hour >= start && hour < end
  })
  if (timeConfig) {
    showTips(getRandomText(timeConfig.text))
  }
}

/**
 * 处理说话按钮点击事件
 */
function handleMessage() {
  const text = getRandomText(waifuTips.message.default)
  showTips(text)
  showToolMenu.value = false
}

/**
 * 处理拍照按钮点击事件
 */
function handlePhoto() {
  showTips('茄子～📸')
  setTimeout(() => {
    const canvas = document.getElementById('live2d') as HTMLCanvasElement
    if (canvas) {
      const link = document.createElement('a')
      link.download = 'live2d.png'
      link.href = canvas.toDataURL()
      link.click()
    }
  }, 300)
  showToolMenu.value = false
}

/**
 * 处理聊天按钮点击事件
 */
function handleChat() {
  showChatBox.value = !showChatBox.value
  showToolMenu.value = false
  if (showChatBox.value) {
    showTips('来和我聊天吧！')
  }
}

/**
 * 发送聊天消息
 */
async function sendChatMessage() {
  if (!chatInput.value.trim() || isWaitingResponse.value) return
  
  const message = chatInput.value
  chatInput.value = ''
  isWaitingResponse.value = true
  showTips('让我想想...')
  
  try {
    const response = await chatWithERNIE(message)
    showTips(response)
  } catch (error) {
    console.error('聊天失败:', error)
    showTips('抱歉，我现在有点累，待会再聊吧~')
  } finally {
    isWaitingResponse.value = false
  }
}

/**
 * 处理聊天框回车事件
 */
function handleChatEnter(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendChatMessage()
  }
}

/**
 * 处理关闭按钮点击事件
 */
function handleClose() {
  const waifu = document.getElementById('waifu')
  if (waifu) {
    waifu.style.display = 'none'
  }
  showToolMenu.value = false
}

/**
 * 计算页面滚动进度
 */
function calculateScrollProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (scrollTop / scrollHeight) * 100 || 0
}

/**
 * 滚动到页面顶部
 */
function scrollToTop() {
  const duration = 1000; // 动画持续时间（毫秒）
  const start = window.pageYOffset;
  const startTime = performance.now();

  function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animate(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    window.scrollTo(0, start * (1 - easeInOutCubic(progress)));

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
  showTips('坐稳了，我们要起飞啦！🚀');
}

// 组件挂载后的初始化
onMounted(async () => {
  // 加载Live2D核心库
  await import('@/assets/live2d/dist/live2d.min.js')
  // 加载模型
  window.loadlive2d('live2d', 'src/assets/live2d/model1.json')
  
  // 获取提示框DOM引用
  tipsRef.value = document.getElementById('waifu-tips')
  
  // 显示时间问候语
  checkTimeGreetings()
  
  // 每隔30分钟更新问候语
  setInterval(checkTimeGreetings, 30 * 60 * 1000)
  
  // 监听模型的鼠标事件
  const live2d = document.getElementById('live2d')
  if (live2d) {
    // 鼠标悬停事件
    live2d.addEventListener('mouseover', () => {
      const config = waifuTips.mouseover.find(m => m.selector === '#live2d')
      if (config) {
        showTips(getRandomText(config.text))
      }
    })
    
    // 点击事件：切换工具菜单显示状态
    live2d.addEventListener('click', () => {
      showToolMenu.value = !showToolMenu.value
    })
  }

  // 点击其他地方关闭工具菜单和聊天框
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.tool-menu') && !target.closest('#live2d')) {
      showToolMenu.value = false
    }
    if (!target.closest('.chat-box') && !target.closest('.tool-item')) {
      showChatBox.value = false
    }
  })

  // 添加滚动监听
  window.addEventListener('scroll', calculateScrollProgress)
  // 初始计算滚动进度
  calculateScrollProgress()
})

// 组件卸载时清理定时器
onUnmounted(() => {
  if (typewriterTimer) {
    clearInterval(typewriterTimer)
    typewriterTimer = null
  }
})
</script>

<template>
  <div id="waifu">
    <div class="live2d-container">
      <div id="waifu-tips" ref="tipsRef" class=""></div>
      <canvas id="live2d" width="800" height="800"></canvas>
      <div class="platform-glow"></div>
      <!-- 聊天框 -->
      <div class="chat-box" v-if="showChatBox">
        <textarea
          v-model="chatInput"
          class="chat-input"
          placeholder="说点什么吧..."
          :disabled="isWaitingResponse"
          @keydown="handleChatEnter"
        ></textarea>
        <button 
          class="chat-send"
          :disabled="!chatInput.trim() || isWaitingResponse"
          @click="sendChatMessage"
        >
          发送
        </button>
      </div>
      <div class="tool-menu" :class="{ 'tool-menu-active': showToolMenu }">
        <div class="tool-item" @click="handleMessage">
          <i class="tool-icon">💭</i>
          <span>说话</span>
        </div>
        <div class="tool-item" @click="handlePhoto">
          <i class="tool-icon">📷</i>
          <span>照相</span>
        </div>
        <div class="tool-item" @click="handleChat">
          <i class="tool-icon">💬</i>
          <span>交流</span>
        </div>
        <div class="tool-item" @click="handleClose">
          <i class="tool-icon">❌</i>
          <span>关闭</span>
        </div>
      </div>
      <div class="scroll-indicator" @click="scrollToTop" :title="`当前进度 ${Math.round(scrollProgress)}%`">
        <div class="progress-circle" :style="{ '--progress': scrollProgress + '%' }">
          <span class="progress-number">{{ Math.round(scrollProgress) }}</span>
          <span class="rocket-icon">🚀</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#waifu {
  position: fixed;
  bottom: 0;
  right: 50px;
  width: 280px;
  z-index: 1;
  display: flex;
  align-items: center;
}

.live2d-container {
  position: relative;
  width: 280px;
  height: 280px;
}

#waifu-tips {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 250px;
  min-height: 40px;
  padding: 8px 12px;
  background-color: rgba(255, 253, 248, .9);
  border: 1px solid rgba(224, 186, 140, .62);
  border-radius: 12px;
  box-shadow: 0 3px 15px 2px rgba(191, 158, 118, .2);
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  opacity: 0;
  transition: opacity .3s;
  z-index: 3;
}

#waifu-tips::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 10px 8px 0;
  border-style: solid;
  border-color: rgba(224, 186, 140, .62) transparent transparent;
}

#waifu-tips.waifu-tips-active {
  opacity: 1;
}

#waifu-tips span {
  color: #d76c95;
  font-weight: 500;
}

#live2d {
  position: relative;
  width: 280px;
  height: 280px;
  cursor: grab;
  z-index: 2;
  animation: modelFloat 4s ease-in-out infinite;
}

#live2d:active {
  cursor: grabbing;
}

.platform-glow {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 260px;
  height: 100px;
  background: radial-gradient(ellipse at center,
    rgba(255, 223, 196, 0.5) 0%,
    rgba(255, 182, 193, 0.3) 35%,
    rgba(255, 192, 203, 0.15) 50%,
    rgba(255, 192, 203, 0) 70%
  );
  filter: blur(25px);
  pointer-events: none;
}

@keyframes modelFloat {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0);
  }
}

.tool-menu {
  position: absolute;
  right: -40px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 8px;
  display: none;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  z-index: 4;
}

.tool-menu-active {
  display: flex;
}

.tool-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
  white-space: nowrap;
  font-size: 14px;
  color: #666;
}

.tool-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #0099cc;
}

.tool-icon {
  font-style: normal;
  font-size: 16px;
}

.scroll-indicator {
  position: fixed;
  right: 50px;
  bottom: 50px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 999;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 253, 248, .9);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(224, 186, 140, .62);
}

.scroll-indicator:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.scroll-indicator:active {
  transform: translateY(-2px);
}

.rocket-icon {
  font-size: 20px;
  transform: rotate(-45deg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-indicator:hover .rocket-icon {
  transform: rotate(-45deg) translateY(-2px);
}

.scroll-indicator:active .rocket-icon {
  transform: rotate(-45deg) translateY(0);
}

.progress-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 253, 248, .9);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 15px 2px rgba(191, 158, 118, .2);
  border: 1px solid rgba(224, 186, 140, .62);
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;
}

.progress-circle::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  border-radius: 50%;
  border: 2px solid rgba(224, 186, 140, .2);
  border-top-color: #d76c95;
  transform: rotate(calc(3.6deg * var(--progress, 0)));
  transition: transform 0.3s;
}

.progress-number {
  font-size: 12px;
  color: #d76c95;
  font-weight: 500;
  transition: opacity 0.3s;
  z-index: 1;
}

.rocket-icon {
  position: absolute;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1;
  transform: rotate(-45deg);
}

.scroll-indicator:hover .progress-number {
  opacity: 0;
}

.scroll-indicator:hover .rocket-icon {
  opacity: 1;
}

.chat-box {
  position: absolute;
  top: 50%;
  right: calc(100% + 20px);
  transform: translateY(-50%);
  width: 250px;
  background-color: rgba(255, 253, 248, .95);
  border: 1px solid rgba(224, 186, 140, .62);
  border-radius: 12px;
  box-shadow: 0 3px 15px 2px rgba(191, 158, 118, .2);
  padding: 8px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-box::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%) rotate(-45deg);
  width: 12px;
  height: 12px;
  background-color: rgba(255, 253, 248, .95);
  border-right: 1px solid rgba(224, 186, 140, .62);
  border-top: 1px solid rgba(224, 186, 140, .62);
}

.chat-input {
  width: 100%;
  height: 36px;
  padding: 8px;
  border: 1px solid rgba(224, 186, 140, .4);
  border-radius: 8px;
  resize: none;
  font-size: 14px;
  line-height: 1.5;
  background-color: rgba(255, 255, 255, .8);
  color: #666;
  transition: all 0.3s ease;
}

.chat-input:focus {
  outline: none;
  border-color: rgba(224, 186, 140, .8);
  background-color: rgba(255, 255, 255, .95);
  box-shadow: 0 0 5px rgba(224, 186, 140, .2);
}

.chat-input:disabled {
  background-color: rgba(245, 245, 245, .9);
  cursor: not-allowed;
}

.chat-send {
  padding: 4px 12px;
  background-color: rgba(224, 186, 140, .5);
  border: 1px solid rgba(224, 186, 140, .4);
  border-radius: 6px;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-end;
}

.chat-send:hover:not(:disabled) {
  background-color: rgba(224, 186, 140, .7);
  border-color: rgba(224, 186, 140, .6);
  transform: translateY(-1px);
}

.chat-send:active:not(:disabled) {
  transform: translateY(0);
}

.chat-send:disabled {
  background-color: rgba(224, 186, 140, .3);
  border-color: rgba(224, 186, 140, .2);
  cursor: not-allowed;
  opacity: 0.7;
}
</style>