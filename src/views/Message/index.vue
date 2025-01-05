<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Message, Tag, Stats, UserInfo } from '@/types/message'
import { getMessageData, addMessage, deleteMessage, verifyOfficialAccount } from '@/api/message'
import { useUserStore } from '@/stores/user'

const { t: $t } = useI18n()

// QQ登录配置
const QQ_APP_ID = '102074048'
const QQ_REDIRECT_URI = encodeURIComponent(window.location.origin + '/message')

// 微信登录配置
const WECHAT_APP_ID = '你的微信应用ID' // 需要替换为实际的微信应用ID
const WECHAT_REDIRECT_URI = encodeURIComponent(window.location.origin + '/message')

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

// 初始化QQ登录SDK
const initQQLogin = () => {
  const script = document.createElement('script')
  script.src = 'https://connect.qq.com/qc_jssdk.js'
  script.dataset.appid = QQ_APP_ID
  script.dataset.redirecturi = decodeURIComponent(QQ_REDIRECT_URI)
  document.head.appendChild(script)
}

// 处理QQ登录
const handleQQLogin = () => {
  // 跳转到QQ登录页面
  const loginUrl = `https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=${QQ_APP_ID}&redirect_uri=${QQ_REDIRECT_URI}&scope=get_user_info`
  window.location.href = loginUrl
}

// 获取QQ用户信息
const getQQUserInfo = async (access_token: string, openid: string) => {
  try {
    const response = await fetch(`https://graph.qq.com/user/get_user_info?access_token=${access_token}&oauth_consumer_key=${QQ_APP_ID}&openid=${openid}`)
    const data = await response.json()
    
    if (data.ret === 0) {
      userStore.loginWithQQ({
        nickname: data.nickname,
        figureurl_qq_2: data.figureurl_qq_2 || data.figureurl_qq_1,
        openid: openid
      })
      showLoginModal.value = false
    } else {
      console.error('获取用户信息失败:', data)
    }
  } catch (error) {
    console.error('获取用户信息出错:', error)
  }
}

// 处理QQ登录回调
const handleQQCallback = () => {
  const hash = window.location.hash.substring(1)
  const params = new URLSearchParams(hash)
  const access_token = params.get('access_token')
  
  if (access_token) {
    // 获取openid
    fetch(`https://graph.qq.com/oauth2.0/me?access_token=${access_token}`)
      .then(res => res.text())
      .then(text => {
        // 返回的是 callback( {"client_id":"YOUR_APPID","openid":"YOUR_OPENID"} );
        const matches = text.match(/\{.*\}/)
        if (matches) {
          const data = JSON.parse(matches[0])
          getQQUserInfo(access_token, data.openid)
        }
      })
      .catch(error => console.error('获取openid失败:', error))
  }
}

// 初始化微信登录SDK
const initWechatLogin = () => {
  const script = document.createElement('script')
  script.src = 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
  document.head.appendChild(script)
}

// 处理微信登录
const handleWechatLogin = () => {
  // 跳转到微信登录页面
  const loginUrl = `https://open.weixin.qq.com/connect/qrconnect?appid=${WECHAT_APP_ID}&redirect_uri=${WECHAT_REDIRECT_URI}&response_type=code&scope=snsapi_login&state=${Date.now()}#wechat_redirect`
  window.location.href = loginUrl
}

// 获取微信用户信息
const getWechatUserInfo = async (code: string) => {
  try {
    // 这里需要后端配合，通过code换取access_token和用户信息
    const response = await fetch('/api/wechat/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    })
    const data = await response.json()
    
    if (data.success) {
      userStore.loginWithWechat({
        nickname: data.nickname,
        headimgurl: data.headimgurl,
        openid: data.openid
      })
      showLoginModal.value = false
    } else {
      console.error('获取微信用户信息失败:', data)
    }
  } catch (error) {
    console.error('获取微信用户信息出错:', error)
  }
}

// 处理微信登录回调
const handleWechatCallback = () => {
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  
  if (code) {
    getWechatUserInfo(code)
  }
}

// 检查本地存储的登录状态
const checkLoginStatus = () => {
  const savedUserInfo = localStorage.getItem('userInfo')
  if (savedUserInfo) {
    const parsedUserInfo = JSON.parse(savedUserInfo)
    userStore.setUserInfo(parsedUserInfo)
  }
}

// 退出登录
const handleLogout = () => {
  userStore.logout()
}

// 留言数据
const messages = ref<Message[]>([])
const hotTags = ref<Tag[]>([])
const messageStats = ref<Stats>({
  total: 0,
  today: 0,
  week: 0
})

// 加载数据
const loadData = async () => {
  try {
    const data = await getMessageData()
    messages.value = data.messages
    hotTags.value = data.tags
    messageStats.value = data.stats
  } catch (error) {
    console.error('加载数据失败:', error)
  }
}

// 修改提交留言函数
const submitMessage = async () => {
  if (!userInfo.value.isLoggedIn) {
    showLoginModal.value = true
    return
  }
  
  if (!newMessage.value.content) return
  
  const message: Omit<Message, 'id'> = {
    userId: userInfo.value.openid || '',
    name: userInfo.value.name,
    content: newMessage.value.content,
    date: new Date().toISOString().split('T')[0],
    avatar: userInfo.value.avatar,
    likes: 0,
    platform: userInfo.value.platform,
    isOfficial: userInfo.value.isOfficial,
    tag: newMessage.value.tag
  }
  
  try {
    await addMessage(message, userInfo.value.openid || '')
    // 重新加载数据以获取更新后的统计信息
    await loadData()
    // 重置表单
    newMessage.value.content = ''
    newMessage.value.tag = ''
  } catch (error) {
    console.error($t('message.error'), error)
  }
}

// 删除留言
const handleDeleteMessage = async (message: Message) => {
  // 检查是否是用户自己的留言或官方账号
  if (!userInfo.value.isLoggedIn || (message.userId !== userInfo.value.openid && !userInfo.value.isOfficial)) {
    console.error('无权删除此留言')
    return
  }

  try {
    const success = await deleteMessage(message.id)
    if (success) {
      // 重新加载数据
      await loadData()
    } else {
      console.error('删除留言失败')
    }
  } catch (error) {
    console.error('删除留言失败:', error)
  }
}

// 官方账号登录函数
const handleOfficialLogin = async (username: string, password: string) => {
  try {
    const result = await userStore.loginAsOfficial(username, password)
    if (result.success) {
      showLoginModal.value = false
    }
    return result
  } catch (error) {
    console.error('登录失败:', error)
    return {
      success: false,
      message: '登录失败，请检查账号密码'
    }
  }
}

// 将handleOfficialLogin添加到window对象上，使其全局可用
(window as any).handleOfficialLogin = handleOfficialLogin

onMounted(async () => {
  userStore.initUserState()
  initQQLogin()
  initWechatLogin()
  
  // 加载留言板数据
  await loadData()
  
  // 检查是否是QQ登录回调
  if (window.location.hash.includes('access_token')) {
    handleQQCallback()
  }
  // 检查是否是微信登录回调
  else if (window.location.search.includes('code=')) {
    handleWechatCallback()
  }
})

// 修改handleLogin函数
const handleLogin = (platform: 'qq' | 'wechat') => {
  if (platform === 'qq') {
    handleQQLogin()
  } else if (platform === 'wechat') {
    handleWechatLogin()
  }
}

// 登录模态框状态
const showLoginModal = ref(false)

// 新留言表单
const newMessage = ref({
  content: '',
  tag: ''
})

// 选中的标签
const selectedTag = ref('')

// 留言过滤
const filterType = ref('all')
const filterMessages = () => {
  let filtered = messages.value
  
  // 根据类型筛选
  if (filterType.value === 'official') {
    filtered = filtered.filter(m => m.isOfficial)
  }
  
  // 根据标签筛选
  if (selectedTag.value) {
    filtered = filtered.filter(m => m.tag === selectedTag.value)
  }
  
  return filtered
}

// 标签点击处理
const handleTagClick = (tagName: string) => {
  selectedTag.value = selectedTag.value === tagName ? '' : tagName
}

// 点赞功能
const likeMessage = (message: any) => {
  if (!userInfo.value.isLoggedIn) {
    showLoginModal.value = true
    return
  }
  message.likes++
}

</script>

<template>
  <div class="dark-mode-wrapper">
    <div class="message-board">
      <!-- 头部区域 -->
      <div class="header" data-aos="fade-up">
        <h1 class="barlow-extralight" :data-text="$t('message.title')">{{ $t('message.title') }}</h1>
        <p class="barlow-medium">{{ $t('message.description') }}</p>
      </div>

      <!-- 统计卡片 -->
      <div class="stats-section" data-aos="fade-up">
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-number">{{ messageStats.total }}</div>
            <div class="stat-label">{{ $t('message.stats.total') }}</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ messageStats.today }}</div>
            <div class="stat-label">{{ $t('message.stats.today') }}</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ messageStats.week }}</div>
            <div class="stat-label">{{ $t('message.stats.week') }}</div>
          </div>
        </div>
      </div>

      <div class="main-content">
        <!-- 左侧边栏 -->
        <div class="sidebar" data-aos="fade-right">
          <!-- 用户信息卡片 -->
          <div class="sidebar-section user-section">
            <template v-if="userInfo.isLoggedIn">
              <div class="user-card">
                <img :src="userInfo.avatar" alt="avatar" class="user-avatar" />
                <div class="user-info">
                  <h3>{{ userInfo.name }}</h3>
                  <span class="platform-badge" :class="userInfo.platform">
                    {{ userInfo.platform === 'qq' ? 'QQ' : $t('message.wechat') }}{{ $t('message.login') }}
                  </span>
                </div>
                <button class="logout-btn" @click="handleLogout">{{ $t('message.logout') }}</button>
              </div>
            </template>
            <template v-else>
              <div class="login-prompt">
                <img src="@/assets/images/avatar-placeholder.svg" alt="avatar" class="user-avatar" />
                <p>{{ $t('message.loginPrompt') }}</p>
                <div class="login-buttons">
                  <button class="login-btn qq" @click="handleLogin('qq')">
                    <svg class="platform-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.003 2c-2.265 0-6.29 1.364-6.29 7.325v1.195S3.55 14.96 3.55 17.474c0 .665.17 1.025.281 1.025.114 0 .902-.484 1.748-2.072 0 0-.18 2.197 1.904 3.967 0 0-1.77.495-1.77 1.182 0 .686 4.078.43 6.29.43 2.213 0 6.29.256 6.29-.43 0-.687-1.77-1.182-1.77-1.182 2.085-1.77 1.905-3.967 1.905-3.967.845 1.588 1.634 2.072 1.746 2.072.111 0 .283-.36.283-1.025 0-2.514-2.166-6.954-2.166-6.954V9.325C18.29 3.364 14.268 2 12.003 2z"/>
                    </svg>
                    {{ $t('message.qqLogin') }}
                  </button>
                  <button class="login-btn wechat" @click="handleLogin('wechat')">
                    <svg class="platform-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.49.49 0 0 1-.011-.259.508.508 0 0 1 .189-.295c1.524-1.125 2.517-2.847 2.517-4.769 0-3.355-3.087-6.064-6.877-5.974zm-2.755 3.536c.534 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.435-.982.97-.982zm4.844 0c.534 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.435-.982.969-.982z"/>
                    </svg>
                    {{ $t('message.wechatLogin') }}
                  </button>
                </div>
              </div>
            </template>
          </div>

          <div class="sidebar-section">
            <h3>{{ $t('message.hotTags') }}</h3>
            <div class="tags-cloud">
              <span 
                v-for="tag in hotTags" 
                :key="tag.name"
                class="tag"
                :class="{ active: selectedTag === tag.name }"
                @click="handleTagClick(tag.name)"
              >
                #{{ tag.name }}
                <small>{{ tag.count }}</small>
              </span>
            </div>
          </div>
          <div class="sidebar-section">
            <h3>{{ $t('message.filter') }}</h3>
            <div class="filter-buttons">
              <button 
                :class="['filter-btn', { active: filterType === 'all' }]"
                @click="filterType = 'all'"
              >
                {{ $t('message.filterAll') }}
              </button>
              <button 
                :class="['filter-btn', { active: filterType === 'official' }]"
                @click="filterType = 'official'"
              >
                {{ $t('message.filterOfficial') }}
              </button>
            </div>
          </div>
        </div>

        <!-- 主要内容区 -->
        <div class="content-main">
          <!-- 留言表单 -->
          <div class="message-form" data-aos="fade-up">
            <textarea
              v-model="newMessage.content"
              :placeholder="userInfo.isLoggedIn ? $t('message.placeholder') : $t('message.loginFirst')"
              class="textarea-field"
              :disabled="!userInfo.isLoggedIn"
            ></textarea>
            <div class="tag-selector" v-if="userInfo.isLoggedIn">
              <span class="tag-label">{{ $t('message.selectTag') }}：</span>
              <div class="tag-options">
                <button
                  v-for="tag in hotTags"
                  :key="tag.name"
                  :class="['tag-option', { active: newMessage.tag === tag.name }]"
                  @click="newMessage.tag = newMessage.tag === tag.name ? '' : tag.name"
                >
                  #{{ tag.name }}
                </button>
              </div>
            </div>
            <div class="form-footer">
              <div class="form-tips">
                <span class="tip">{{ $t('message.tips') }}</span>
              </div>
              <button 
                @click="submitMessage" 
                class="submit-button"
                :class="{ 'disabled': !userInfo.isLoggedIn }"
              >
                <i class="icon">✉️</i>
                {{ userInfo.isLoggedIn ? $t('message.submit') : $t('message.loginFirst') }}
              </button>
            </div>
          </div>

          <!-- 留言列表 -->
          <div class="messages-container">
            <div
              v-for="message in filterMessages()"
              :key="message.id"
              class="message-card"
              data-aos="fade-up"
            >
              <div class="message-header">
                <div class="user-info">
                  <img :src="message.avatar" alt="avatar" class="avatar" />
                  <div class="message-info">
                    <div class="name-badge">
                      <h3>{{ message.name }}</h3>
                      <span v-if="message.isOfficial" class="official-badge">{{ $t('message.official') }}</span>
                      <span 
                        v-else-if="message.platform" 
                        class="platform-badge"
                        :class="message.platform"
                      >
                        {{ message.platform === 'qq' ? 'QQ' : $t('message.wechat') }}{{ $t('message.user') }}
                      </span>
                    </div>
                    <span class="date">{{ message.date }}</span>
                  </div>
                </div>
                <div class="message-actions">
                  <button 
                    class="like-button"
                    @click="likeMessage(message)"
                  >
                    <i class="icon">❤️</i>
                    <span>{{ message.likes }}</span>
                  </button>
                </div>
              </div>
              <p class="message-content">{{ message.content }}</p>
              <div class="message-footer">
                <div class="message-tags" v-if="message.tag">
                  <span class="message-tag">#{{ message.tag }}</span>
                </div>
                <button 
                  v-if="userInfo.isLoggedIn && (message.userId === userInfo.openid || userInfo.isOfficial)"
                  class="delete-button"
                  @click="handleDeleteMessage(message)"
                >
                  {{ $t('message.delete') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 登录模态框 -->
      <div v-if="showLoginModal" class="login-modal">
        <div class="modal-content">
          <h2>{{ $t('message.loginTitle') }}</h2>
          <p>{{ $t('message.loginDesc') }}</p>
          <div class="login-options">
            <button class="login-btn qq" @click="handleLogin('qq')">
              <i class="icon">QQ</i>
              {{ $t('message.qqLogin') }}
            </button>
            <button class="login-btn wechat" @click="handleLogin('wechat')">
              <i class="icon">WeChat</i>
              {{ $t('message.wechatLogin') }}
            </button>
          </div>
          <button class="close-btn" @click="showLoginModal = false">{{ $t('common.cancel') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dark .dark-mode-wrapper {
  background-color: #141414;
}

.message-board {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 80px;
  min-height: calc(100vh - 60px);
}

/* 头部样式 */
.header {
  text-align: center;
  margin: 50px;
  padding: 40px 0;
  position: relative;
}

.header h1 {
  font-size: 3.2em;
  margin-bottom: 16px;
  font-weight: 300;
  background: linear-gradient(120deg, #4285f4, #34a853, #fbbc05, #ea4335);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient 6s ease infinite;
}

.header h1::after {
  content: attr(data-text);
  position: absolute;
  left: 50%;
  top: 40px;
  transform: translateX(-50%);
  width: 100%;
  background: linear-gradient(120deg, #4285f4, #34a853, #fbbc05, #ea4335);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.1;
  filter: blur(12px);
  animation: gradient 6s ease infinite;
}

.header p {
  font-size: 1.2em;
  background: linear-gradient(120deg, #4285f4, #34a853);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.8;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 统计区域 */
.stats-section {
  margin-bottom: 60px;
  position: relative;
}

.stats-section::before {
  content: '';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(66, 133, 244, 0.2), transparent);
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(66, 133, 244, 0.1);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(66, 133, 244, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: rgba(66, 133, 244, 0.2);
}

.stat-card:hover::before {
  transform: translateX(100%);
}

.stat-number {
  font-size: 36px;
  font-weight: 600;
  background: linear-gradient(120deg, #4285f4, #34a853);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  background: linear-gradient(120deg, #4285f4, #34a853);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.8;
}

/* 主要内容布局 */
.main-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 30px;
  align-items: start;
  margin-top: 30px;
}

/* 侧边栏样式 */
.sidebar {
  position: sticky;
  top: 20px;
}

.sidebar-section {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  border: 1px solid rgba(66, 133, 244, 0.1);
}

.sidebar-section h3 {
  margin: 0 0 16px;
  font-size: 18px;
  background: linear-gradient(120deg, #4285f4, #34a853);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 500;
}

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  background: rgba(66, 133, 244, 0.05);
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 13px;
  color: #4285f4;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(66, 133, 244, 0.1);
  white-space: nowrap;
}

.tag small {
  margin-left: 6px;
  opacity: 0.7;
  font-size: 12px;
  background: rgba(66, 133, 244, 0.1);
  padding: 2px 6px;
  border-radius: 10px;
}

.tag:hover {
  background: #4285f4;
  color: white;
  transform: translateY(-2px);
}

.tag:hover small {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.filter-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.filter-btn {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(66, 133, 244, 0.1);
  border-radius: 8px;
  background: rgba(66, 133, 244, 0.05);
  color: #4285f4;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  text-align: left;
  position: relative;
  overflow: hidden;
}

.filter-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(66, 133, 244, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.filter-btn:hover::before {
  transform: translateX(100%);
}

.filter-btn:hover,
.filter-btn.active {
  background: #4285f4;
  color: white;
  transform: translateY(-2px);
}

.filter-btn.active::after {
  content: '✓';
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
}

/* 留言表单样式 */
.message-form {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  border: 1px solid rgba(66, 133, 244, 0.1);
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 16px;
  border: 1px solid rgba(66, 133, 244, 0.1);
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
}

.input-field:focus,
.textarea-field:focus {
  border-color: #4285f4;
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
  background: white;
}

.textarea-field {
  min-height: 120px;
  resize: vertical;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.form-tips {
  color: #718096;
  font-size: 13px;
}

.submit-button {
  background: linear-gradient(120deg, #4285f4, #34a853);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.submit-button:hover {
  transform: translateY(-2px);
}

.submit-button:hover::before {
  transform: translateX(100%);
}

.icon {
  font-style: normal;
}

/* 留言卡片样式 */
.messages-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message-card {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(66, 133, 244, 0.1);
  position: relative;
  overflow: hidden;
}

.message-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(66, 133, 244, 0.05), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.message-card:hover {
  transform: translateY(-3px);
  border-color: rgba(66, 133, 244, 0.2);
}

.message-card:hover::before {
  transform: translateX(100%);
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.message-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-card .user-info {
  display: flex;
  flex-direction: column;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #e2e8f0;
}

.name-badge {
  display: flex;
  align-items: center;
  gap: 8px;
}

.message-info h3 {
  margin: 0;
  font-size: 16px;
  color: #2d3748;
  font-weight: 500;
}

.official-badge {
  background: linear-gradient(120deg, #34a853, #4285f4);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.date {
  font-size: 12px;
  color: #718096;
  display: block;
  margin-top: 4px;
}

.like-button {
  background: rgba(66, 133, 244, 0.05);
  border: 1px solid rgba(66, 133, 244, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  color: #4285f4;
}

.like-button:hover {
  background: #fff5f5;
  border-color: #feb2b2;
  color: #e53e3e;
  transform: translateY(-2px);
}

.message-content {
  margin: 0;
  line-height: 1.6;
  color: #4a5568;
  font-size: 14px;
}

/* 响应式布局 */
@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    position: static;
    margin-bottom: 30px;
  }
  
  .stats-cards {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 640px) {
  .message-board {
    padding: 20px 15px 40px;
  }
  
  .header {
    padding: 20px 0;
  }
  
  .header h1 {
    font-size: 2em;
  }
  
  .stats-cards {
    padding: 0;
    gap: 15px;
  }
  
  .message-form,
  .message-card,
  .sidebar-section {
    padding: 20px;
  }
  
  .message-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .like-button {
    align-self: flex-end;
  }
}

/* 用户信息卡片样式 */
.user-section {
  margin-bottom: 30px;
}

.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  position: relative;
}

.user-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid rgba(66, 133, 244, 0.2);
  margin-bottom: 12px;
}

.user-info {
  margin-bottom: 16px;
  width: 100%;
}

.user-info h3 {
  font-size: 18px;
  color: #2d3748;
  margin: 0 0 8px;
}

.platform-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.platform-badge.qq {
  background: linear-gradient(120deg, #12B7F5, #1677FF);
  color: white;
}

.platform-badge.wechat {
  background: linear-gradient(120deg, #07C160, #11C267);
  color: white;
}

.logout-btn {
  width: 100%;
  padding: 8px 16px;
  border: 1px solid rgba(66, 133, 244, 0.2);
  border-radius: 8px;
  background: transparent;
  color: #4285f4;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: rgba(66, 133, 244, 0.1);
}

.login-prompt {
  text-align: center;
  padding: 24px;
}

.login-prompt .user-avatar {
  margin-bottom: 16px;
}

.login-prompt p {
  margin: 0 0 16px;
  color: #718096;
  font-size: 14px;
}

.login-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.platform-icon {
  width: 20px;
  height: 20px;
}

.login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.login-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.login-btn:hover::before {
  transform: translateX(100%);
}

.login-btn.qq {
  background: linear-gradient(120deg, #12B7F5, #1677FF);
}

.login-btn.wechat {
  background: linear-gradient(120deg, #07C160, #11C267);
}

.login-btn:hover {
  transform: translateY(-2px);
}

/* 登录模态框样式 */
.login-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}

.modal-content h2 {
  margin: 0 0 8px;
  color: #2d3748;
}

.modal-content p {
  color: #718096;
  margin-bottom: 20px;
}

.login-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.close-btn {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: transparent;
  color: #718096;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f7fafc;
}

/* 禁用状态样式 */
.submit-button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #718096;
}

.textarea-field:disabled {
  background: #f7fafc;
  cursor: not-allowed;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .login-buttons {
    flex-direction: column;
  }
  
  .modal-content {
    margin: 20px;
    padding: 20px;
  }
}

.platform-icon {
  width: 20px;
  height: 20px;
}

.login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.login-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.login-btn:hover::before {
  transform: translateX(100%);
}

.login-btn.qq {
  background: linear-gradient(120deg, #12B7F5, #1677FF);
}

.login-btn.wechat {
  background: linear-gradient(120deg, #07C160, #11C267);
}

.login-btn:hover {
  transform: translateY(-2px);
}

.tag-selector {
  margin: 16px 0;
}

.tag-label {
  display: block;
  margin-bottom: 8px;
  color: #718096;
  font-size: 14px;
}

.tag-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-option {
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid rgba(66, 133, 244, 0.1);
  background: rgba(66, 133, 244, 0.05);
  color: #4285f4;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tag-option:hover,
.tag-option.active {
  background: #4285f4;
  color: white;
  transform: translateY(-2px);
}

.message-tags {
  margin-top: 8px;
}

.message-tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 16px;
  background: rgba(66, 133, 244, 0.05);
  color: #4285f4;
  font-size: 12px;
  margin-right: 8px;
}

.tag.active {
  background: #4285f4;
  color: white;
  border-color: #4285f4;
}

.tag.active small {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}
/* Dark mode styles */
.dark .message-board {
  color: #e2e8f0;
}

.dark .header h1 {
  opacity: 0.9;
}

.dark .header p {
  opacity: 0.7;
}

.dark .stat-card {
  background: rgba(26, 32, 44, 0.4);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .stat-number {
  opacity: 0.9;
}

.dark .stat-label {
  opacity: 0.7;
}

.dark .sidebar-section,
.dark .message-form,
.dark .message-card {
  background: rgba(26, 32, 44, 0.4);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .message-content {
  color: #e2e8f0;
}

.dark .message-info h3 {
  color: #e2e8f0;
}

.dark .date {
  color: #a0aec0;
}

.dark .input-field,
.dark .textarea-field {
  background: rgba(26, 32, 44, 0.4);
  border-color: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

.dark .input-field:focus,
.dark .textarea-field:focus {
  background: rgba(26, 32, 44, 0.6);
  border-color: #4285f4;
}

.dark .form-tips {
  color: #a0aec0;
}

.dark .tag {
  background: rgba(66, 133, 244, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .filter-btn {
  background: rgba(66, 133, 244, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .user-card {
  background: rgba(26, 32, 44, 0.4);
}

.dark .user-info h3 {
  color: #e2e8f0;
}

.dark .login-prompt p {
  color: #a0aec0;
}

.dark .tag-label {
  color: #a0aec0;
}

.dark .tag-option {
  background: rgba(66, 133, 244, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .message-tag {
  background: rgba(66, 133, 244, 0.1);
}

.dark .textarea-field:disabled {
  background: rgba(26, 32, 44, 0.2);
  color: #a0aec0;
}

.dark .like-button {
  background: rgba(66, 133, 244, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .modal-content {
  background: #1a202c;
  color: #e2e8f0;
}

.dark .modal-content h2 {
  color: #e2e8f0;
}

.dark .modal-content p {
  color: #a0aec0;
}

.dark .close-btn {
  border-color: rgba(255, 255, 255, 0.1);
  color: #a0aec0;
}

.dark .close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.dark-mode-wrapper {
  min-height: 100vh;
}

.dark .message-board {
  color: #e2e8f0;
}

.dark .header h1 {
  opacity: 0.9;
}

.dark .header p {
  opacity: 0.7;
}

.dark .stat-card {
  background: rgba(26, 32, 44, 0.4);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .stat-number {
  opacity: 0.9;
}

.dark .stat-label {
  opacity: 0.7;
}

.dark .sidebar-section,
.dark .message-form,
.dark .message-card {
  background: rgba(26, 32, 44, 0.4);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .message-content {
  color: #e2e8f0;
}

.dark .message-info h3 {
  color: #e2e8f0;
}

.dark .date {
  color: #a0aec0;
}

.dark .input-field,
.dark .textarea-field {
  background: rgba(26, 32, 44, 0.4);
  border-color: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

.dark .input-field:focus,
.dark .textarea-field:focus {
  background: rgba(26, 32, 44, 0.6);
  border-color: #4285f4;
}

.dark .form-tips {
  color: #a0aec0;
}

.dark .tag {
  background: rgba(66, 133, 244, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .filter-btn {
  background: rgba(66, 133, 244, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .user-card {
  background: rgba(26, 32, 44, 0.4);
}

.dark .user-info h3 {
  color: #e2e8f0;
}

.dark .login-prompt p {
  color: #a0aec0;
}

.dark .tag-label {
  color: #a0aec0;
}

.dark .tag-option {
  background: rgba(66, 133, 244, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .message-tag {
  background: rgba(66, 133, 244, 0.1);
}

.dark .textarea-field:disabled {
  background: rgba(26, 32, 44, 0.2);
  color: #a0aec0;
}

.dark .like-button {
  background: rgba(66, 133, 244, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .modal-content {
  background: #1a202c;
  color: #e2e8f0;
}

.dark .modal-content h2 {
  color: #e2e8f0;
}

.dark .modal-content p {
  color: #a0aec0;
}

.dark .close-btn {
  border-color: rgba(255, 255, 255, 0.1);
  color: #a0aec0;
}

.dark .close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.delete-button {
  padding: 4px 12px;
  border-radius: 4px;
  background: rgba(244, 67, 54, 0.1);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;
}

.delete-button:hover {
  background: rgba(244, 67, 54, 0.2);
  transform: translateY(-1px);
}

.dark .delete-button {
  background: rgba(244, 67, 54, 0.05);
  border-color: rgba(244, 67, 54, 0.1);
  color: #ff5252;
}

.dark .delete-button:hover {
  background: rgba(244, 67, 54, 0.1);
}

.message-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(66, 133, 244, 0.1);
}

.message-tags {
  display: flex;
  gap: 8px;
}

.delete-button {
  padding: 4px 12px;
  border-radius: 4px;
  background: rgba(244, 67, 54, 0.1);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;
}

.delete-button:hover {
  background: rgba(244, 67, 54, 0.2);
  transform: translateY(-1px);
}

.dark .message-footer {
  border-top-color: rgba(255, 255, 255, 0.1);
}

.dark .delete-button {
  background: rgba(244, 67, 54, 0.05);
  border-color: rgba(244, 67, 54, 0.1);
  color: #ff5252;
}

.dark .delete-button:hover {
  background: rgba(244, 67, 54, 0.1);
}
</style> 