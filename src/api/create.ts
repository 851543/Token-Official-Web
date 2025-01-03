import type { CreateData } from '@/types/create'
import request from '@/utils/request'


export const getCreateData = async (): Promise<CreateData> => {
    const response = await request.get('/src/data/create.json')
    return response.data
}
