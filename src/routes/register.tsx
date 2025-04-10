import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'

import { useRegisterMutation } from '../service/auth/use-auth-mutation'
import AuthSchema from '../schemas/auth'
import { appToast } from '../shared/ui/toast'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: RegisterComponent,
})

function RegisterComponent() {
  const { mutateAsync: registerUser, isPending } = useRegisterMutation()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof AuthSchema.register>>({
    resolver: zodResolver(AuthSchema.register),
    mode: 'all',
  })

  const password = form.watch('password')
  const confirmPassword = form.watch('confirmPassword')

  const onSubmit = form.handleSubmit(async (payload) => {
    await registerUser(payload, {
      onSuccess: () => {
        appToast.success({
          title: 'Usuário registrado',
          description: 'Você foi registrado com sucesso!',
        })
        void navigate({ to: '/dashboard' })
      },
    })
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Criar Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                void onSubmit()
              }}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Seu nome" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="seu@email.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isPending || password !== confirmPassword}
              >
                {isPending ? 'Registrando...' : 'Registrar'}
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Já tem uma conta?{' '}
                <Link
                  to="/login"
                  className="text-primary font-medium hover:underline"
                >
                  Faça login
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
