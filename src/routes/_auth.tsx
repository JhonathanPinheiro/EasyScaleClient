import {
  createFileRoute,
  Outlet,
  redirect,
  useRouterState,
} from '@tanstack/react-router'
import SideBar, {
  SideBarButtonProps,
} from '../components/organisms/auth/sidebar'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
  },
  component: LayoutDefault,
})

function LayoutDefault() {
  const currentPath = useRouterState({ select: (s) => s.location.pathname })

  const sidebarOptions: SideBarButtonProps[] = [
    { icon: <p>🏠</p>, label: 'Dashboard', link: '/dashboard' },
    { icon: <p>📅</p>, label: 'Escalas', link: '/scales' },
    { icon: <p>🏷️</p>, label: 'Tags', link: '/tags' },
    { icon: <p>🧑‍🤝‍🧑</p>, label: 'Voluntários', link: '/volunteers' },
    { icon: <p>👤</p>, label: 'Perfil', link: '/profile' },
  ].map((item) => ({
    ...item,
    isActive: currentPath.startsWith(item.link),
  }))

  return (
    <div className="w-full min-h-screen flex bg-background text-foreground max-w-[1920px] mx-auto">
      <SideBar options={sidebarOptions} />
      <main className="flex-1 overflow-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}
