/* eslint-disable @typescript-eslint/no-unused-vars */
import { Access, User } from '../service/user/user-contracts'
import { platformHttpClient } from '../shared/api/http-client'

export const userRepository = {
  getProfile: async () => {
    const { data } = await platformHttpClient.get<{
      user: User
      access: Access
    }>('/users/me')
    return { ...data.user, access: data.access }
  },

  login: async (payload: {
    email: string
    password: string
    remember?: boolean
  }) => {
    const { data } = await platformHttpClient.post<{
      user: User
      access: Access
    }>('/session', payload)
    return { ...data.user, access: data.access }
  },

  logout: async () => {
    try {
      const response = await platformHttpClient.delete('/session')

      return response
    } catch (error) {
      throw {
        error: true,
        code: 'INTERNAL_ERROR',
        field: '',
      }
    }
  },
}
