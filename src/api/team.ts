import type { TeamData } from '@/types/team'
import {requestLocal} from '@/utils/request'

export const getTeamData = async (lang: string): Promise<TeamData> => {
  try {
    const { data } = await requestLocal.get(`/src/data/team.${lang}.json`)
    return data
  } catch (error) {
    console.error(`Failed to load team data for language ${lang}:`, error)
    // 如果加载失败，回退到中文数据
    const { data } = await requestLocal.get('/src/data/team.zh-CN.json')
    return data
  }
}
