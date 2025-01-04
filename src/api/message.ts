import type { Message, MessageData } from '@/types/message'
import request from '@/utils/request'

// 获取留言板数据
export const getMessageData = async (): Promise<MessageData> => {
  const response = await request.get('/src/data/message.json')
  return response.data
}

// 添加新留言
export const addMessage = async (message: Message): Promise<Message> => {
  const data = await getMessageData()
  data.messages.unshift(message)
  data.stats.total++
  data.stats.today++
  data.stats.week++
  
  // 更新标签计数
  if (message.tag) {
    const tag = data.tags.find(t => t.name === message.tag)
    if (tag) {
      tag.count++
    }
  }
  
  // 保存更新后的数据
  await request.post('/src/data/message.json', data)
  return message
}

// 删除留言
export const deleteMessage = async (id: number): Promise<void> => {
  const data = await getMessageData()
  const index = data.messages.findIndex(m => m.id === id)
  
  if (index !== -1) {
    const message = data.messages[index]
    data.messages.splice(index, 1)
    data.stats.total--
    
    // 更新标签计数
    if (message.tag) {
      const tag = data.tags.find(t => t.name === message.tag)
      if (tag && tag.count > 0) {
        tag.count--
      }
    }
    
    // 保存更新后的数据
    await request.post('/src/data/message.json', data)
  }
} 