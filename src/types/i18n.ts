export type Language = 'zh-CN' | 'en-US'

export interface I18nSchema {
  nav: {
    home: string
    team: string
    create: string
    message: string
    moreLinks: string
  }
  common: {
    loading: string
    noData: string
    confirm: string
    cancel: string
  }
  home: {
    title: string
    description: string
  }
  team: {
    title: string
    joinUs: string
  }
  message: {
    placeholder: string
    submit: string
  }
}

// 用于类型检查的辅助函数
export function defineMessages<T extends I18nSchema>(messages: T): T {
  return messages
} 