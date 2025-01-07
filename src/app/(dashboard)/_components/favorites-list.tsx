import { MoreHorizontal } from 'lucide-react'

export const FavoritesList = () => {
  return (
    <div>
      <div className="group flex h-6 w-full items-center justify-between px-2 text-muted-foreground hover:bg-primary/5">
        <p className="text-xs">Favorites</p>
        <button className="hidden size-4 items-center justify-center rounded-sm hover:bg-primary/5 group-hover:flex">
          <MoreHorizontal className="size-3" />
        </button>
      </div>
    </div>
  )
}
