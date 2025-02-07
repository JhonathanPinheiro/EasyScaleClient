export type User = {
  id: string
  name: string
  email: string
  role?: 'admin' | 'volunteer'
  tags: string[]
  availability: string[]
  createdAt: string
  updatedAt: string
}
