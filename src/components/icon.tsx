import { cn } from '@/lib/utils'

interface IconProps {
  name: string
  className?: string
}

export const Icon = ({ name, className }: IconProps) => {
  return <span className={cn(name, className)}></span>
}
