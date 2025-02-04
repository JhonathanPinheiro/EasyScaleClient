import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoadingFullScreen } from '../shared/ui/loading-full-screen'
import { useAuthenticate } from '../hook/use-authenticate'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    } else {
      throw redirect({
        to: '/welcome',
      })
    }
  },
  component: VoidPage,
})

function VoidPage() {
  useAuthenticate()

  return <LoadingFullScreen />
}
