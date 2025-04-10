import { useQuery } from '@tanstack/react-query'
import { baseQueryOptions } from '../../shared/api/query-client'
import { scheduleRepository } from '../../repository/schedule-repository'

export function useSchedulesQuery(filters?: {
  date?: string
  volunteer?: string
  tag?: string
}) {
  return useQuery({
    queryKey: ['schedules', filters],
    queryFn: () => scheduleRepository.getSchedules(filters),
    ...baseQueryOptions,
  })
}
