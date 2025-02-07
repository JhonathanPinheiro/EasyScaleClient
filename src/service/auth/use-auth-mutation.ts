import { useMutation } from '@tanstack/react-query'
import { authRepository } from '../../repository/auth-repository'
import { baseQueryOptions } from '../../shared/api/query-client'

export function useLoginMutation() {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authRepository.login(email, password),
    ...baseQueryOptions,
  })
}

export function useRegisterMutation() {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: ({
      name,
      email,
      password,
      confirmPassword,
    }: {
      name: string
      email: string
      password: string
      confirmPassword: string
    }) => authRepository.register(name, email, password, confirmPassword),
    ...baseQueryOptions,
  })
}
