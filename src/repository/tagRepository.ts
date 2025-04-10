import { Tag } from '../service/tag/tag-contracts'
import { httpClient } from '../shared/api/http-client'

export const tagRepository = {
  getAll: async (): Promise<Tag[]> => {
    const { data } = await httpClient.get('/tags')
    return data
  },

  create: async ({ name }: { name: string }) => {
    const { data } = await httpClient.post('/tags', { name })
    return data
  },

  delete: async (id: string) => {
    await httpClient.delete(`/tags/${id}`)
  },
}
