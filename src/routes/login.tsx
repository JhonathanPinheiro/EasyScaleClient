import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../components/molecules/input'
import { SelectCustom } from '../components/molecules/select'
import AuthSchema from '../schemas/auth'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

function RouteComponent() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AuthSchema.signIn),
    mode: 'all',
  })

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
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
        <SelectCustom
          name="select"
          control={control}
          options={options}
          label="Select"
          error={errors.root?.message}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
