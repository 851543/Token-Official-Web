import type { Message, UserInfo } from '@/types/message'
import request from '@/utils/request'


// 获取留言数据
export const getMessageData = async () => {
  const response = await request.get('/src/data/message.json')
  return response.data
}

// 获取用户信息
export const getUserInfo = async (platform: string, openid: string) => {
  const response = await request.get('/src/data/accounts.json')
  const accounts = response.data
  const user = accounts.users.find((u: UserInfo) => u.platform === platform && u.openid === openid)
  return user
}

// 添加新用户
export const addUser = async (userData: Partial<UserInfo>) => {
  const response = await request.get('/src/data/accounts.json')
  const accounts = response.data
  accounts.users.push({
    ...userData,
    messageId: null,
    lastMessageTime: null
  })
  await request.post('/src/data/accounts.json', accounts)
  return userData
}

// 更新用户信息
export const updateUser = async (platform: string, openid: string, updates: Partial<UserInfo>) => {
  const response = await request.get('/src/data/accounts.json')
  const accounts = response.data
  const userIndex = accounts.users.findIndex((u: UserInfo) => u.platform === platform && u.openid === openid)
  if (userIndex !== -1) {
    accounts.users[userIndex] = { ...accounts.users[userIndex], ...updates }
    await request.post('/src/data/accounts.json', accounts)
    return accounts.users[userIndex]
  }
  throw new Error('User not found')
}

// 添加留言
export const addMessage = async (message: Omit<Message, 'id'>, userId: string) => {
  // 先获取当前数据
  const response = await request.get('/src/data/message.json')
  const data = response.data

  // 检查用户是否已有留言
  const existingMessage = data.messages.find((m: Message) => m.userId === userId)
  if (existingMessage) {
    // 如果有，先删除旧留言
    await deleteMessage(existingMessage.id)
    // 重新获取更新后的数据
    const updatedResponse = await request.get('/src/data/message.json')
    data.messages = updatedResponse.data.messages
  }

  // 添加新留言
  const newMessage = {
    ...message,
    id: Date.now(),
    userId
  }
  data.messages.push(newMessage)

  // 更新标签计数
  if (message.tag) {
    const tagIndex = data.tags.findIndex((t: { name: string; count: number }) => t.name === message.tag)
    if (tagIndex !== -1) {
      data.tags[tagIndex].count++
    }
  }

  // 更新统计信息
  data.stats.total++
  data.stats.today++
  data.stats.week++
  // 保存更新后的数据
  await request.post('/src/data/message.json', data)
  return newMessage
}

// 删除留言
export const deleteMessage = async (messageId: number) => {
  try {
    const response = await request.get('/src/data/message.json')
    const data = response.data
    const index = data.messages.findIndex((m: Message) => m.id === messageId)
    
    if (index !== -1) {
      const message = data.messages[index]
      data.messages.splice(index, 1)
      
      // 更新标签计数
      if (message.tag) {
        const tagIndex = data.tags.findIndex((t: { name: string; count: number }) => t.name === message.tag)
        if (tagIndex !== -1 && data.tags[tagIndex].count > 0) {
          data.tags[tagIndex].count--
        }
      }
      
      // 更新统计信息
      data.stats.total--
      data.stats.today--
      data.stats.week--
      // 保存更新后的数据
      await request.post('/src/data/message.json', data)
      return true
    }
    return false
  } catch (error) {
    console.error('删除留言失败:', error)
    return false
  }
}

// 验证官方账号
export const verifyOfficialAccount = async (username: string, password: string) => {
  const response = await request.get('/src/data/accounts.json')
  const accounts = response.data
  const official = accounts.official
  
  if (official.username === username && official.password === password) {
    return {
      name: official.name,
      avatar: official.avatar,
      id: official.id,
      isOfficial: true
    }
  }
  throw new Error('Invalid credentials')
}

// 获取用户的留言
export const getUserMessage = async (userId: string) => {
  const response = await request.get('/src/data/message.json')
  const data = response.data
  return data.messages.find((m: Message) => m.userId === userId) || null
}

// 点赞留言
export const likeMessage = async (messageId: number) => {
  const response = await request.get('/src/data/message.json')
  const data = response.data
  const message = data.messages.find((m: Message) => m.id === messageId)
  
  if (message) {
    message.likes++
    await request.post('/src/data/message.json', data)
    return message
  }
  throw new Error('Message not found')
}

// 获取热门标签
export const getHotTags = async () => {
  const response = await request.get('/src/data/message.json')
  const data = response.data
  return data.tags
}

// 获取留言统计信息
export const getMessageStats = async () => {
  const response = await request.get('/src/data/message.json')
  const data = response.data
  return data.stats
} 