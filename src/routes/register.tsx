import { createFileRoute, useNavigate } from '@tanstack/react-router'
import AuthSchema from '../schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '../components/molecules/input'
import { useRegisterMutation } from '../service/auth/use-auth-mutation'
import { z } from 'zod'
import { appToast } from '../shared/ui/toast'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutateAsync: registerUser, isPending } = useRegisterMutation()

  const navigate = useNavigate()

  const { register, watch, handleSubmit } = useForm<
    z.infer<typeof AuthSchema.register>
  >({
    resolver: zodResolver(AuthSchema.register),
    mode: 'all',
  })

  const onSubmit = handleSubmit(async (payload) => {
    await registerUser(payload, {
      onSuccess: (res) => {
        localStorage.setItem('token', res.token)
        appToast.success({
          title: 'User registrado',
          description: 'Usuario registrado com éxito',
        })

        void navigate({ to: '/welcome' })
      },
    })
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
        <Input {...register('name')} label="Name" placeholder="Name" />
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
        <Input
          {...register('confirmPassword')}
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
        />
        <button
          type="submit"
          disabled={isPending || watch().password !== watch().confirmPassword}
        >
          Submit
        </button>
      </form>
    </div>
  )
}
