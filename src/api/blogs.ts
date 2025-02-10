import type { BlogsData } from '@/types/blogs'
import {requestLocal} from '@/utils/request'

export const getBlogsData = async (lang: string): Promise<BlogsData> => {
  try {
    const { data } = await requestLocal.get(`/src/data/blogs.${lang}.json`)
    return data
  } catch (error) {
    console.error(`Failed to load blog data for language ${lang}:`, error)
    // 如果加载失败，回退到中文文案
    const { data } = await requestLocal.get('/src/data/blogs.zh-CN.json')
    return data
  }
} 