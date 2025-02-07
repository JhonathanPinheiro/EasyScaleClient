import { Tag } from '../service/tag/tag-contracts'
import { httpClient } from '../shared/api/http-client'

export const tagRepository = {
  getAll: async (): Promise<Tag[]> => {
    const { data } = await httpClient.get('/tags')
    return data
  },

  create: async (tag: Omit<Tag, 'id'>) => {
    const { data } = await httpClient.post('/tags', tag)
    return data
  },

  delete: async (id: string) => {
    await httpClient.delete(`/tags/${id}`)
  },
}
