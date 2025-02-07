import { ServiceDate } from '../service/service-date/service-date-contracts'
import { httpClient } from '../shared/api/http-client'

export const serviceDateRepository = {
  getAll: async (): Promise<ServiceDate[]> => {
    const { data } = await httpClient.get('/service-dates')
    return data
  },

  create: async (serviceDate: Omit<ServiceDate, 'id'>) => {
    const { data } = await httpClient.post('/service-dates', serviceDate)
    return data
  },

  delete: async (id: string) => {
    await httpClient.delete(`/service-dates/${id}`)
  },
}
