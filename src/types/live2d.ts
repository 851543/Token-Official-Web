/**
 * 时间配置接口
 */
export interface TimeConfig {
  /** 时间范围，格式为 "小时-小时" */
  hour: string
  /** 显示的文本，可以是字符串或字符串数组 */
  text: string | string[]
}

/**
 * 提示配置接口
 */
export interface TipConfig {
  /** CSS选择器 */
  selector: string
  /** 显示的文本数组 */
  text: string[]
}

/**
 * Live2d提示配置接口
 */
export interface WaifuTips {
  /** 时间相关的提示配置 */
  time: TimeConfig[]
  /** 鼠标悬停时的提示配置 */
  mouseover: TipConfig[]
  /** 点击时的提示配置 */
  click: TipConfig[]
  /** 消息提示配置 */
  message: {
    /** 默认消息数组 */
    default: string[]
    /** 欢迎消息数组 */
    welcome: string[]
  }
}

/**
 * 全局Window接口扩展
 */
declare global {
  interface Window {
    /** 加载Live2d模型的函数 */
    loadlive2d: (id: string, modelPath: string) => void
  }
} 