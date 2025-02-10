import type { Message, UserInfo } from '@/types/message'
import {request} from '@/utils/request'


// 获取留言数据
export const getMessageData = async () => {
  const response = await request.get('/token_official_message')
  return response.data
}

// 获取用户信息
export const getUserInfo = async (data: Object) => {
  const response = await request.post('/token_get_user', data)
  return response.data
}

// 添加新用户
export const addUser = async (userData: Partial<UserInfo>) => {
  const response = await request.post('/add_user', userData)
  return response.data
}

// 更新用户信息
export const updateUser = async (platform: string, openid: string, updates: Partial<UserInfo>) => {
  const response = await request.put(`/update_user/${platform}/${openid}`, updates)
  return response.data
}

// 添加留言
export const addMessage = async (message: Omit<Message, 'id'>, userId: string) => {
  const response = await request.post('/add_message', { ...message }, { params: { user_id: userId } })
  return response.data
}

// 删除留言
export const deleteMessage = async (messageId: number) => {
  try {
    const response = await request.delete(`/delete_message/${messageId}`)
    return response.data.success
  } catch (error) {
    console.error('删除留言失败:', error)
    return false
  }
}

// 验证官方账号
export const verifyOfficialAccount = async (username: string, password: string) => {
  const response = await request.get('/token_get_official', {
    params: { username, password }
  })
  return response.data
}

// 获取用户的留言
export const getUserMessage = async (userId: string) => {
  const response = await request.get(`/user_message/${userId}`)
  return response.data
}

// 点赞留言
export const likeMessage = async (messageId: number) => {
  const response = await request.put(`/like_message/${messageId}`)
  return response.data
}

// 获取热门标签
export const getHotTags = async () => {
  const response = await request.get('/hot_tags')
  return response.data
}

// 获取留言统计信息
export const getMessageStats = async () => {
  const response = await request.get('/message_stats')
  return response.data
} 