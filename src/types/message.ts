export interface Message {
  id: number
  name: string
  content: string
  date: string
  avatar: string
  likes: number
  isOfficial?: boolean
  platform?: 'qq' | 'wechat'
  openid?: string
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