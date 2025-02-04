import { QueryClient } from '@tanstack/react-query'
import { appToast } from '../ui/toast'

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError() {
        appToast.error({
          title: 'Oops',
          description: 'Something went wrong',
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
