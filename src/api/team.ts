import request from '@/utils/request'

export const getTeamData = async () => {
  const response = await request.get('/src/data/team.json')
  return response.data
}
