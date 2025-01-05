import { defineStore } from 'pinia'
import { ref } from 'vue'
import { verifyOfficialAccount } from '@/api/message'

interface UserInfo {
  isLoggedIn: boolean
  name: string
  avatar: string
  platform: 'qq' | 'wechat' | null
  openid?: string
  isOfficial?: boolean
}

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>({
    isLoggedIn: false,
    name: '',
    avatar: '',
    platform: null,
    openid: '',
  })

  // 初始化用户状态
  const initUserState = () => {
    const savedUserInfo = localStorage.getItem('userInfo')
    if (savedUserInfo) {
      userInfo.value = JSON.parse(savedUserInfo)
    }
  }

  // 设置用户信息
  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info
    localStorage.setItem('userInfo', JSON.stringify(info))
  }

  // QQ登录
  const loginWithQQ = (qqInfo: { nickname: string; figureurl_qq_2: string; openid: string }) => {
    setUserInfo({
      isLoggedIn: true,
      name: qqInfo.nickname,
      avatar: qqInfo.figureurl_qq_2,
      platform: 'qq',
      openid: qqInfo.openid
    })
  }

  // 微信登录
  const loginWithWechat = (wechatInfo: { nickname: string; headimgurl: string; openid: string }) => {
    setUserInfo({
      isLoggedIn: true,
      name: wechatInfo.nickname,
      avatar: wechatInfo.headimgurl,
      platform: 'wechat',
      openid: wechatInfo.openid
    })
  }

  // 官方登录
  const loginAsOfficial = async (username: string, password: string) => {
    try {
      const officialInfo = await verifyOfficialAccount(username, password)
      setUserInfo({
        isLoggedIn: true,
        name: officialInfo.name,
        avatar: officialInfo.avatar,
        platform: null,
        openid: officialInfo.id,
        isOfficial: true
      })
      return { success: true, message: '登录成功' }
    } catch (error) {
      return { success: false, message: '账号或密码错误' }
    }
  }

  // 退出登录
  const logout = () => {
    userInfo.value = {
      isLoggedIn: false,
      name: '',
      avatar: '',
      platform: null,
      openid: ''
    }
    localStorage.removeItem('userInfo')
  }

  return {
    userInfo,
    initUserState,
    setUserInfo,
    loginWithQQ,
    loginWithWechat,
    loginAsOfficial,
    logout
  }
}) 