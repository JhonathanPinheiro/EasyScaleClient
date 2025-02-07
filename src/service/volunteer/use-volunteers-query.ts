import { useQuery, useMutation } from '@tanstack/react-query'
import { volunteerRepository } from '../../repository/volunteerRepository'
import { baseQueryOptions } from '../../shared/api/query-client'
import { Volunteer } from './volunteer-contracts'

export function useVolunteersQuery() {
  return useQuery({
    queryKey: ['volunteers'],
    queryFn: () => volunteerRepository.getAll(),
    ...baseQueryOptions,
  })
}

export function useCreateVolunteerMutation() {
  return useMutation({
    mutationKey: ['create-volunteer'],
    mutationFn: (volunteer: Volunteer) => volunteerRepository.create(volunteer),
    ...baseQueryOptions,
  })
}

export function useDeleteVolunteerMutation() {
  return useMutation({
    mutationKey: ['delete-volunteer'],
    mutationFn: (id: string) => volunteerRepository.delete(id),
    ...baseQueryOptions,
  })
}
