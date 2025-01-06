'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/spinner'
import { authClient } from '@/lib/auth-client'
import { SignInButton } from '@/components/auth/sign-in-button'

export const Heading = () => {
  const { useSession } = authClient

  const { isPending, data } = useSession()

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
        Your Ideas, Documents, & Plans. Unified. Welcome to{' '}
        <span className="underline">Jotion</span>
      </h1>
      <h3 className="text-base font-medium sm:text-xl md:text-2xl">
        Jotion is the connected workspace where <br />
        better, faster work happens.
      </h3>
      {isPending && (
        <div className="flex w-full items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {data && !isPending && (
        <Button asChild>
          <Link href="/documents">
            Enter Jotion
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
      {!data && !isPending && (
        <SignInButton mode="modal">
          <Button>
            Get Jotion free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </SignInButton>
      )}
    </div>
  )
}
