import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AuthSchema from '../schemas/auth'
import { useLoginMutation } from '../service/auth/use-auth-mutation'
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

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context, location }) => {
    if (context.user) {
      throw redirect({
        to: '/dashboard',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: LoginComponent,
})

function LoginComponent() {
  const { mutateAsync: login, isPending } = useLoginMutation()

  const form = useForm<{
    email: string
    password: string
  }>({
    resolver: zodResolver(AuthSchema.signIn),
    mode: 'all',
  })

  const onSubmit = form.handleSubmit(async (payload) => {
    await login(payload)
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="seuemail@exemplo.com"
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

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Entrando...' : 'Entrar'}
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Não tem uma conta?{' '}
                <Link to="/register" className="text-primary hover:underline">
                  Cadastre-se
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
