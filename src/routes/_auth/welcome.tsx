import { createFileRoute } from '@tanstack/react-router'
import { useLogoutMutation } from '../../service/auth/use-auth-mutation'

export const Route = createFileRoute('/_auth/welcome')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutateAsync: logout } = useLogoutMutation()

  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      Hello
      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}
