import request from '@/utils/request'
import type { TrendData } from '@/types/trend'

export const getTrendData = async (): Promise<TrendData> => {
  const response = await request.get('/src/data/trend.json')
  return response.data
} 