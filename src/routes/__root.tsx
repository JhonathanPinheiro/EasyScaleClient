import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import NiceModal from '@ebay/nice-modal-react'
import type { QueryClient } from '@tanstack/react-query'
import type { User } from '../service/user/user-contracts'

export const Route = createRootRouteWithContext<{
  user: User
  queryClient: QueryClient
  preview?: unknown
}>()({
  component: RootPage,
  notFoundComponent: NotFoundPage,
})

function RootPage() {
  return (
    <NiceModal.Provider>
      <Outlet />
    </NiceModal.Provider>
  )
}

function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-primary">
          Oops! Página não encontrada
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Desculpe, não conseguimos encontrar a página que você estava
          procurando. Talvez essas opções ajudem:
        </p>

        <div className="pt-8">
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg border border-primary bg-primary px-4 py-2 text-white transition hover:bg-primary/90"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    </main>
  )
}
