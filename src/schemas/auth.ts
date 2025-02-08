import { z } from 'zod'

const emailValidation = z
  .string()
  .min(1, { message: 'email' })
  .email({ message: 'emailValidation' })

const AuthSchema = {
  signIn: z.object({
    email: emailValidation,
    password: z.string().min(1, { message: 'password' }),
  }),
  register: z.object({
    name: z.string().min(1, { message: 'name' }),
    email: emailValidation,
    password: z.string().min(1, { message: 'password' }),
    confirmPassword: z.string().min(1, { message: 'confirmPassword' }),
  }),
}

export default AuthSchema
