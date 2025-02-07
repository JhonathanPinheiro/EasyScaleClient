import axios from 'axios'

export const httpClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: true,
})

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') // Pega o token salvo
  if (token) {
    config.headers.Authorization = `Bearer ${token}` // Adiciona o token ao header
  }

  return config
})
