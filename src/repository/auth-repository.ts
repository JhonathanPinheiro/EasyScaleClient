import { httpClient } from '../shared/api/http-client'

export const authRepository = {
  login: async (email: string, password: string) => {
    const { data } = await httpClient.post('/users/login', { email, password })
    return data
  },

  register: async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const { data } = await httpClient.post('/users/register', {
      name,
      email,
      password,
      confirmPassword,
    })
    return data
  },
}
