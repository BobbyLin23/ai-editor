'use client'

import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { authClient } from '@/lib/auth-client'
import { Loader2 } from 'lucide-react'

export const UserButton = () => {
  const router = useRouter()

  const { useSession } = authClient

  const { data, isPending } = useSession()

  const handleLogOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/')
        },
      },
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {isPending ? (
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Avatar>
            <AvatarImage src={data?.user?.image || ''} alt="Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleLogOut}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
