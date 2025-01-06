'use client'

import { useState } from 'react'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Icon } from '../icon'
import { LoginForm } from './login-form'
import { RegisterForm } from './register-form'

export const AuthCard = () => {
  const [state, setState] = useState<'sign-in' | 'sign-up'>('sign-in')

  return (
    <Card className="border-0 p-0 shadow-none">
      <CardHeader className="flex w-full justify-center text-center">
        <CardTitle className="text-lg">Login to Jotion</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Button className="flex-1" variant="outline">
            <Icon name="i-mdi-github" className="mr-2 size-4" />
            Github
          </Button>
          <Button className="flex-1" variant="outline">
            <Icon name="i-mdi-google" className="mr-2 size-4" />
            Google
          </Button>
        </div>
        <Separator />
        {state === 'sign-in' && <LoginForm />}
        {state === 'sign-up' && <RegisterForm />}
      </CardContent>
      <CardFooter className="flex justify-center">
        <span className="text-sm">
          {state === 'sign-in'
            ? 'Don’t have an account?'
            : 'Already have an account?'}
        </span>
        <Button
          variant="link"
          onClick={() => setState(state === 'sign-in' ? 'sign-up' : 'sign-in')}
        >
          {state === 'sign-in' ? 'Sign up' : 'Sign in'}
        </Button>
      </CardFooter>
    </Card>
  )
}
