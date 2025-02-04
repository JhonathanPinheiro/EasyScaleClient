import { useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useUserQuery } from '../service/user/use-user-query'

export function useAuthenticate() {
  const navigate = useNavigate()
  const search = useSearch({ strict: false })
  const { isSuccess } = useUserQuery()
  useEffect(() => {
    if (isSuccess) {
      void navigate({ to: search.redirect || '/-/welcome' })
    }
  }, [isSuccess, navigate, search])
}
