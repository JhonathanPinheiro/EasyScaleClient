import { User } from '../service/user/user-contracts'
import { httpClient } from '../shared/api/http-client'

export const userRepository = {
  getProfile: async (): Promise<User> => {
    const { data } = await httpClient.get('/users/me')
    return data
  },

  deleteUser: async (userId: string) => {
    await httpClient.delete(`/users/delete/${userId}`)
  },
}
