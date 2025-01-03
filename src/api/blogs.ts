import type { BlogsData } from '@/types/blogs'
import request from '@/utils/request'

export const getBlogsData = async (): Promise<BlogsData> => {
  const response = await request.get('/src/data/blogs.json')
  return response.data
} 