import { httpClient } from '../shared/api/http-client'

export interface Volunteer {
  name: string
  tags: string[]
  availability: string[]
}

interface ScheduleEntry {
  date: string
  schedule: Record<string, string>
}

interface ScheduleData {
  _id: string
  schedule: ScheduleEntry[]
  createdAt: string
}

interface GenerateScheduleResponse {
  msg: string
  scheduleId: string
  schedule: ScheduleEntry[]
}

export const scheduleRepository = {
  generateSchedule: async (
    volunteers: Volunteer[],
    tags: string[],
    serviceDates: string[]
  ): Promise<GenerateScheduleResponse> => {
    const { data } = await httpClient.post<GenerateScheduleResponse>(
      '/schedule',
      { volunteers, tags, serviceDates }
    )
    return data
  },

  getSchedules: async (filters?: {
    date?: string
    volunteer?: string
    tag?: string
  }): Promise<ScheduleData[]> => {
    const { data } = await httpClient.get<ScheduleData[]>('/schedule', {
      params: filters,
    })
    return data
  },

  deleteSchedule: async (id: string): Promise<{ msg: string }> => {
    const { data } = await httpClient.delete<{ msg: string }>(`/schedule/${id}`)
    return data
  },
}
