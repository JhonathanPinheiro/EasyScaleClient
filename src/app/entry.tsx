/* eslint-disable react-hooks/rules-of-hooks */
import './tailwind.css'
import 'dayjs/locale/en'
import 'dayjs/locale/pt'

import { ToastProvider, Viewport } from '@radix-ui/react-toast'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import '../store/modals/register-modals'
import '../store/drawers/register-drawers'
import { queryClient } from '../shared/api/query-client'
import { useUserQuery } from '../service/user/use-user-query'
import { routeTree } from './route-tree.gen'

const router = createRouter({
  routeTree,
  context: { user: undefined!, queryClient },
})

function $Entry() {
  const { data: user } = useUserQuery()

  return (
    <ToastProvider>
      <Toaster />
      <RouterProvider router={router} context={{ user }} />
      <Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[380px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
    </ToastProvider>
  )
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <$Entry />
      </QueryClientProvider>
    </StrictMode>
  )
}
