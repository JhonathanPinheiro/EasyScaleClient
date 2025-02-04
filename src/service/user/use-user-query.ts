import { useQuery } from '@tanstack/react-query'
import { userRepository } from '../../repository/user-repository'
import { baseQueryOptions } from '../../shared/api/query-client'

export function useUserQuery() {
  return useQuery({
    queryKey: ['get-profile'],
    queryFn: userRepository.getProfile,
    ...baseQueryOptions,
    retry: 0,
  })
}
