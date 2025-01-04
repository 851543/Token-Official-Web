import type { BlogsData } from '@/types/blogs'
import request from '@/utils/request'

export const getBlogsData = async (lang: string): Promise<BlogsData> => {
  try {
    const { data } = await request.get(`/src/data/blogs.${lang}.json`)
    return data
  } catch (error) {
    console.error(`Failed to load blog data for language ${lang}:`, error)
    // 如果加载失败，回退到中文数据
    const { data } = await request.get('/src/data/blogs.zh-CN.json')
    return data
  }
} 