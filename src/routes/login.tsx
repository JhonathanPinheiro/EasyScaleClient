import { createFileRoute, redirect } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../components/molecules/input'
import AuthSchema from '../schemas/auth'
import { useLoginMutation } from '../service/auth/use-auth-mutation'

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context, location }) => {
    if (context.user) {
      throw redirect({
        to: '/welcome',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: LoginComponent,
})

function LoginComponent() {
  const { mutateAsync: login, isPending } = useLoginMutation()

  const { register, handleSubmit } = useForm<{
    email: string
    password: string
  }>({
    resolver: zodResolver(AuthSchema.signIn),
    mode: 'all',
  })

  const onSubmit = handleSubmit(async (payload) => {
    await login(payload)
  })

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          void onSubmit(e)
        }}
      >
        <Input
          {...register('email')}
          label="E-mail"
          type="email"
          placeholder="Email"
        />
        <Input
          {...register('password')}
          label="Password"
          type="password"
          placeholder="Password"
        />
        <button type="submit" disabled={isPending}>
          Submit
        </button>
      </form>
    </div>
  )
}
