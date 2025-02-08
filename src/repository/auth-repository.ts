import { httpClient } from '../shared/api/http-client'

interface LoginResponse {
  data: {
    msg: string
  }
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

interface RegisterResponse {
  msg: string
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export const authRepository = {
  login: async (email: string, password: string) => {
    const response = await httpClient.post<LoginResponse>('/users/login', {
      email,
      password,
    })
    return response
  },

  logout: async () => {
    await httpClient.post('/users/logout')
    window.location.href = '/login'
  },

  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<RegisterResponse> => {
    const { data } = await httpClient.post<RegisterResponse>(
      '/users/register',
      {
        name,
        email,
        password,
      }
    )
    return data
  },
}
