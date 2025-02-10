import type { CreateData } from '@/types/create'
import {requestLocal} from '@/utils/request'

export const getCreateData = async (lang: string): Promise<CreateData> => {
  try {
    const { data } = await requestLocal.get(`/src/data/create.${lang}.json`)
    return data
  } catch (error) {
    console.error(`Failed to load create data for language ${lang}:`, error)
    // 如果加载失败，回退到中文数据
    const { data } = await requestLocal.get('/src/data/create.zh-CN.json')
    return data
  }
}
