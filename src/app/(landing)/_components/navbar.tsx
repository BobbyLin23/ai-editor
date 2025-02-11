'use client'

import Link from 'next/link'

// import { useScrollTop } from '@/hooks/use-scroll-top'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/spinner'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { SignInButton } from '@/components/auth/sign-in-button'
import { authClient } from '@/lib/auth-client'
import { UserButton } from '@/components/user-button'

export const Navbar = () => {
  // const scrolled = useScrollTop()
  const { useSession } = authClient

  const { isPending, data } = useSession()
  const scrolled = false

  return (
    <div
      className={cn(
        'fixed top-0 z-50 flex w-full items-center bg-background p-6 dark:bg-[#1F1F1F]',
        scrolled && 'border-b shadow-sm',
      )}
    >
      <Logo />
      <div className="flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
        {isPending && <Spinner />}
        {!data && !isPending && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Get Jotion free</Button>
            </SignInButton>
          </>
        )}
        {data && !isPending && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Jotion</Link>
            </Button>
            <UserButton />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  )
}
