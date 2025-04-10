import { useQuery } from '@tanstack/react-query'
import { tagRepository } from '../../repository/tagRepository'
import { baseQueryOptions } from '../../shared/api/query-client'

export function useTagsQuery() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => tagRepository.getAll(),
    ...baseQueryOptions,
  })
}
