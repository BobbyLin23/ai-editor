'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { Icon } from '../icon'
import { LoginForm } from './login-form'
import { RegisterForm } from './register-form'
import { authClient } from '@/lib/auth-client'

export const AuthCard = () => {
  const [state, setState] = useState<'sign-in' | 'sign-up'>('sign-in')

  const [loading, setLoading] = useState(false)

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    await authClient.signIn.social(
      {
        provider,
        callbackURL: '/documents',
      },
      {
        onRequest: () => {
          setLoading(true)
        },
        onSuccess: () => {
          setLoading(false)
          toast.success('Logged in')
        },
        onError: (ctx) => {
          setLoading(false)
          toast.error(ctx.error.message)
        },
      },
    )
  }

  return (
    <div className="flex flex-col">
      <Card className="border-0 p-0 shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {state === 'sign-in' ? 'Welcome back' : 'Create an account'}
          </CardTitle>
          <CardDescription>
            Continue with your Github or Google account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4">
            <Button
              className="flex-1"
              variant="outline"
              disabled={loading}
              onClick={() => handleSocialLogin('github')}
            >
              <Icon name="i-mdi-github" className="mr-2 size-4" />
              Github
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              disabled={loading}
              onClick={() => handleSocialLogin('google')}
            >
              <Icon name="i-mdi-google" className="mr-2 size-4" />
              Google
            </Button>
          </div>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          {state === 'sign-in' && <LoginForm />}
          {state === 'sign-up' && <RegisterForm />}
        </CardContent>
        <CardFooter className="flex flex-col justify-center gap-2">
          <div>
            <span className="text-sm">
              {state === 'sign-in'
                ? 'Don’t have an account?'
                : 'Already have an account?'}
            </span>
            <button
              className="ml-1 text-sm text-muted-foreground hover:text-primary hover:underline"
              onClick={() =>
                setState(state === 'sign-in' ? 'sign-up' : 'sign-in')
              }
            >
              {state === 'sign-in' ? 'Sign up' : 'Sign in'}
            </button>
          </div>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
            By clicking continue, you agree to our{' '}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
