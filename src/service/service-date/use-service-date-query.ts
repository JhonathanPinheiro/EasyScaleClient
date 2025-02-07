import { useQuery, useMutation } from '@tanstack/react-query'
import { serviceDateRepository } from '../../repository/serviceDateRepository'
import { baseQueryOptions } from '../../shared/api/query-client'
import { ServiceDate } from './service-date-contracts'

export function useServiceDatesQuery() {
  return useQuery({
    queryKey: ['service-dates'],
    queryFn: () => serviceDateRepository.getAll(),
    ...baseQueryOptions,
  })
}

export function useCreateServiceMutation() {
  return useMutation({
    mutationKey: ['create-servicee'],
    mutationFn: (serviceDate: ServiceDate) =>
      serviceDateRepository.create(serviceDate),
    ...baseQueryOptions,
  })
}

export function useDeleteServiceMutation() {
  return useMutation({
    mutationKey: ['delete-service'],
    mutationFn: (id: string) => serviceDateRepository.delete(id),
    ...baseQueryOptions,
  })
}
