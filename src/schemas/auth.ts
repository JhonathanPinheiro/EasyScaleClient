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

  password: z
    .object({
      oldPassword: z.string().min(1, { message: 'oldPassword' }),
      newPassword: z
        .string()
        .regex(/^.{8,32}$/, 'characterLimit')
        .regex(/[A-Z]/, 'capitalLetters')
        .regex(/[a-z]/, 'smallLetters')
        .regex(/\d/, 'oneNumber')
        .regex(/[-#$.%&*@!~]/, 'oneSpecialCharacter'),
    })
    .superRefine(({ oldPassword, newPassword }, ctx) => {
      if (newPassword !== oldPassword) {
        ctx.addIssue({
          code: 'custom',
          message: 'identicalPassword',
          path: ['oldPasswordError'],
        })
      }
      if (!oldPassword) {
        ctx.addIssue({
          code: 'custom',
          message: 'password',
          path: ['passwordError'],
        })
      }
    }),
}

export default AuthSchema
