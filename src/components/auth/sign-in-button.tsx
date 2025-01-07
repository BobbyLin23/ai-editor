'use client'

import Link from 'next/link'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog'
import { AuthCard } from './auth-card'

interface Props {
  mode: 'modal'
  children: React.ReactNode
}

export const SignInButton = ({ mode, children }: Props) => {
  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="w-96 p-0">
          <DialogHeader>
            <DialogTitle className="hidden"></DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <AuthCard />
        </DialogContent>
      </Dialog>
    )
  }

  return <Link href="/sign-in">{children}</Link>
}
