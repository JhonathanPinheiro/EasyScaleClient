import { z } from 'zod'
const UserSchema = {
  profile: z.object({
    name: z.string().min(1, 'name'),
    email: z.string().min(1),
  }),
}

export default UserSchema
