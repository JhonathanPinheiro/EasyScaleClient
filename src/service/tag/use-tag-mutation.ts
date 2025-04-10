import { useMutation } from '@tanstack/react-query'
import { tagRepository } from '../../repository/tagRepository'
import { baseQueryOptions, queryClient } from '../../shared/api/query-client'

export function useCreateTagMutation() {
  return useMutation({
    mutationKey: ['create-tag'],
    mutationFn: (name: { name: string }) => tagRepository.create(name),
    ...baseQueryOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    },
  })
}

export function useDeleteTagMutation() {
  return useMutation({
    mutationKey: ['delete-tag'],
    mutationFn: (id: string) => tagRepository.delete(id),
    ...baseQueryOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    },
  })
}
