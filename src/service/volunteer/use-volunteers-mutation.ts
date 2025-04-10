import { useMutation } from '@tanstack/react-query'
import { volunteerRepository } from '../../repository/volunteerRepository'
import { baseQueryOptions, queryClient } from '../../shared/api/query-client'
import { Volunteer } from './volunteer-contracts'

export function useCreateVolunteerMutation() {
  return useMutation({
    mutationKey: ['create-volunteer'],
    mutationFn: (volunteer: Volunteer) => volunteerRepository.create(volunteer),
    ...baseQueryOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['volunteers'] })
    },
  })
}

export function useDeleteVolunteerMutation() {
  return useMutation({
    mutationKey: ['delete-volunteer'],
    mutationFn: (id: string) => volunteerRepository.delete(id),
    ...baseQueryOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['volunteers'] })
    },
  })
}
