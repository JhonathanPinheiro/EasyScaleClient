import { type QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import NiceModal from '@ebay/nice-modal-react'
import type { User } from '../service/user/user-contracts'

export const Route = createRootRouteWithContext<{
  user: User
  queryClient: QueryClient
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  preview?: any
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
    <main className="m-auto flex w-full flex-wrap justify-center bg-[#f1f1f3] px-2 pt-8">
      <div className="relative mt-[116px] flex w-full flex-col gap-4 pt-[100px] text-center">
        <p className="z-10 text-[56px] font-bold text-primary-700">
          Oops! Página não encontrada
        </p>
        <p className="z-10 m-auto max-w-[685px] text-xl font-medium text-gray-700">
          Desculpe, mas não conseguimos encontrar a página que você estava
          procurando. Talvez estas opções possam ajudar:
        </p>

        <div className="z-10 flex w-full flex-col items-center justify-center gap-8 pt-28">
          <div
            onClick={() => window.location.reload()}
            className="flex cursor-pointer items-center justify-center gap-2"
          >
            <p className="text-sm font-semibold text-primary-800">
              Tentar novamente
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
