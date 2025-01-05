export interface Message {
  id: number
  userId: string
  name: string
  content: string
  date: string
  avatar: string
  likes: number
  platform: 'qq' | 'wechat' | null
  isOfficial?: boolean
  tag?: string
}

export interface Tag {
  name: string
  count: number
}

export interface Stats {
  total: number
  today: number
  week: number
}

export interface MessageData {
  messages: Message[]
  tags: Tag[]
  stats: Stats
}

export interface UserInfo {
  id: string
  name: string
  avatar: string
  platform: 'qq' | 'wechat' | null
  openid?: string
  isOfficial?: boolean
  messageId?: number | null
  lastMessageTime?: string | null
} 