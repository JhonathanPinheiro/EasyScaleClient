import { Volunteer } from '../service/volunteer/volunteer-contracts'
import { httpClient } from '../shared/api/http-client'

export const volunteerRepository = {
  getAll: async (): Promise<Volunteer[]> => {
    const { data } = await httpClient.get('/volunteers')
    return data
  },

  create: async (volunteer: Omit<Volunteer, 'id'>) => {
    const { data } = await httpClient.post('/volunteers', volunteer)
    return data
  },

  delete: async (id: string) => {
    await httpClient.delete(`/volunteers/${id}`)
  },
}
