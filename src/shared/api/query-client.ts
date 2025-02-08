import { QueryClient } from '@tanstack/react-query'
import { appToast } from '../ui/toast'

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError(error: unknown) {
        appToast.error({
          title: 'Oops',
          description: (error as { response?: { data?: { msg?: string } } })
            .response?.data?.msg,
        })
      },
    },
  },
})

export const baseQueryOptions = {
  staleTime: 1000 * 60,
  refetchOnWindowFocus: false,
}

export const getQueryClient = () => queryClient
