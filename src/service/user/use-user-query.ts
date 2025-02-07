import { useQuery, useMutation } from '@tanstack/react-query'
import { userRepository } from '../../repository/user-repository'
import { baseQueryOptions } from '../../shared/api/query-client'

export function useUserQuery() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => userRepository.getProfile(),
    ...baseQueryOptions,
  })
}

export function useDeleteUserMutation() {
  return useMutation({
    mutationKey: ['delete-user'],
    mutationFn: (id: string) => userRepository.deleteUser(id),
    ...baseQueryOptions,
  })
}
