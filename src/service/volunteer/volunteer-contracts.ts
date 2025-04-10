import { FilterItem } from '../../components/molecules/search-select'

export type Volunteer = {
  id: string
  name: string
  tags: FilterItem[]
  availability: Date[]
  createdAt: string
  updatedAt: string
}
