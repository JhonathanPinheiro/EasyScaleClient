import { useQuery } from '@tanstack/react-query'
import { volunteerRepository } from '../../repository/volunteerRepository'
import { baseQueryOptions } from '../../shared/api/query-client'

export function useVolunteersQuery() {
  return useQuery({
    queryKey: ['volunteers'],
    queryFn: () => volunteerRepository.getAll(),
    ...baseQueryOptions,
  })
}
