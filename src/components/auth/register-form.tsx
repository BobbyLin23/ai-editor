'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { authClient } from '@/lib/auth-client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const formSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          setLoading(false)
          router.push('/documents')
          toast.success('Account created')
        },
        onError: (ctx) => {
          setLoading(false)
          toast.error(ctx.error.message)
        },
      },
    )
  })

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Please enter your name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Please enter your email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Please enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={loading}>
          Sign up
        </Button>
      </form>
    </Form>
  )
}
