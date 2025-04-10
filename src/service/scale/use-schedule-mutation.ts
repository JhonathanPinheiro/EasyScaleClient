import { useMutation } from '@tanstack/react-query'
import { baseQueryOptions, queryClient } from '../../shared/api/query-client'
import { scheduleRepository } from '../../repository/schedule-repository'
import { Volunteer } from '../volunteer/volunteer-contracts'

export function useGenerateScheduleMutation() {
  return useMutation({
    mutationKey: ['generate-schedule'],
    mutationFn: ({
      volunteers,
      tags,
      serviceDates,
    }: {
      volunteers: Volunteer[]
      tags: string[]
      serviceDates: string[]
    }) => scheduleRepository.generateSchedule(volunteers, tags, serviceDates),
    ...baseQueryOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] })
    },
  })
}

export function useDeleteScheduleMutation() {
  return useMutation({
    mutationKey: ['delete-schedule'],
    mutationFn: (id: string) => scheduleRepository.deleteSchedule(id),
    ...baseQueryOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] })
    },
  })
}
