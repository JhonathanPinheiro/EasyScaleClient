import { useQuery, useMutation } from '@tanstack/react-query'
import { tagRepository } from '../../repository/tagRepository'
import { baseQueryOptions } from '../../shared/api/query-client'
import { Tag } from './tag-contracts'

export function useTagsQuery() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => tagRepository.getAll(),
    ...baseQueryOptions,
  })
}

export function useCreateTagMutation() {
  return useMutation({
    mutationKey: ['create-tage'],
    mutationFn: (tag: Tag) => tagRepository.create(tag),
    ...baseQueryOptions,
  })
}

export function useDeleteTagMutation() {
  return useMutation({
    mutationKey: ['delete-tag'],
    mutationFn: (id: string) => tagRepository.delete(id),
    ...baseQueryOptions,
  })
}
