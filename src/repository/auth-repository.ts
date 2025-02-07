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
  data: any // Replace `any` with the actual type if known
}

export const authRepository = {
  login: async (email: string, password: string) => {
    try {
      const response = await httpClient.post<LoginResponse>('/users/login', {
        email,
        password,
      })
      localStorage.setItem('token', response.data.token)
      return response
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    }
  },

  register: async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<RegisterResponse> => {
    const { data } = await httpClient.post<RegisterResponse>(
      '/users/register',
      {
        name,
        email,
        password,
        confirmPassword,
      }
    )
    return data
  },
}
