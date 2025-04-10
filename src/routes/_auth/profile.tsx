import { createFileRoute } from '@tanstack/react-router'
import LayoutContainer from '../../components/molecules/layout-container'
import { Card } from 'flowbite-react'
import { LogOut } from 'lucide-react'

export const Route = createFileRoute('/_auth/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = {
    name: 'João da Silva',
    email: 'joao@email.com',
    createdAt: '2024-10-12T10:30:00Z',
  }

  const handleLogout = () => {
    alert('Logout efetuado!')
  }

  const getInitial = (name: string) => name.charAt(0).toUpperCase()

  return (
    <LayoutContainer
      title="Perfil"
      description="Veja suas informações de conta."
    >
      <div className="flex justify-center">
        <Card className="w-full max-w-md p-6 rounded-2xl shadow-md border border-gray-200">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600">
              {getInitial(user.name)}
            </div>
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-xs text-gray-400">
                Membro desde{' '}
                {new Date(user.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              Sair da conta
            </button>
          </div>
        </Card>
      </div>
    </LayoutContainer>
  )
}
