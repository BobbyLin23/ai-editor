'use client'

import {
  ChevronsLeft,
  Edit,
  MenuIcon,
  // Plus,
  // PlusCircle,
  Search,
  // Settings,
  Component,
  // Trash,
  Inbox,
  Home,
} from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import { ComponentRef, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
// import { useMutation } from 'convex/react'
// import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { UserItem } from './user-item'
import { Item } from './item'
import { FavoritesList } from './favorites-list'
// import { api } from '@/convex/_generated/api'
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from '@/components/ui/popover'
// import { useSearch } from '@/hooks/use-search'
// import { useSettings } from '@/hooks/use-settings'

// import { UserItem } from './user-item'
// import { Item } from './item'
// import { DocumentList } from './document-list'
// import { TrashBox } from './trash-box'
// import { Navbar } from './navbar'

export const Navigation = () => {
  // const router = useRouter()
  // const settings = useSettings()
  // const search = useSearch()
  const params = useParams()
  const pathname = usePathname()
  const isMobile = useMediaQuery('(max-width: 768px)')
  // const create = useMutation(api.documents.create)

  const isResizingRef = useRef(false)
  const sidebarRef = useRef<ComponentRef<'aside'>>(null)
  const navbarRef = useRef<ComponentRef<'div'>>(null)
  const [isResetting, setIsResetting] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(isMobile)

  useEffect(() => {
    if (isMobile) {
      collapse()
    } else {
      resetWidth()
    }
  }, [isMobile])

  useEffect(() => {
    if (isMobile) {
      collapse()
    }
  }, [pathname, isMobile])

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault()
    event.stopPropagation()

    isResizingRef.current = true
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return
    let newWidth = event.clientX

    if (newWidth < 240) newWidth = 240
    if (newWidth > 480) newWidth = 480

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty('left', `${newWidth}px`)
      navbarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`)
    }
  }

  const handleMouseUp = () => {
    isResizingRef.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false)
      setIsResetting(true)

      sidebarRef.current.style.width = isMobile ? '100%' : '240px'
      navbarRef.current.style.setProperty(
        'width',
        isMobile ? '0' : 'calc(100% - 240px)',
      )
      navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px')
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true)
      setIsResetting(true)

      sidebarRef.current.style.width = '0'
      navbarRef.current.style.setProperty('width', '100%')
      navbarRef.current.style.setProperty('left', '0')
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  // const handleCreate = () => {
  // const promise = create({ title: 'Untitled' }).then((documentId) =>
  //   router.push(`/documents/${documentId}`),
  // )
  // toast.promise(promise, {
  //   loading: 'Creating a new note...',
  //   success: 'New note created!',
  //   error: 'Failed to create a new note.',
  // })
  // }

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'group/sidebar relative flex h-full w-60 flex-col overflow-y-auto bg-secondary',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'w-0',
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            'absolute right-10 top-3 size-5 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600',
            isMobile && 'opacity-100',
          )}
        >
          <ChevronsLeft className="size-5" />
        </div>
        <div
          onClick={collapse}
          role="button"
          className={cn(
            'absolute right-3 top-3 flex size-5 items-center justify-center rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600',
            isMobile && 'opacity-100',
          )}
        >
          <Edit className="size-4" />
        </div>
        <div>
          <UserItem />
          <Item label="Search" icon={Search} isSearch onClick={() => {}} />
          <Item label="Jotion AI" icon={Component} onClick={() => {}} />
          <Item label="Home" icon={Home} onClick={() => {}} />
          <Item label="Inbox" icon={Inbox} onClick={() => {}} />
        </div>
        <div className="mt-4">
          <FavoritesList />
        </div>
        <div className="mt-4">
          {/* <DocumentList />
          <Item onClick={handleCreate} icon={Plus} label="Add a page" />
          <Popover>
            <PopoverTrigger className="mt-4 w-full">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="w-72 p-0"
              side={isMobile ? 'bottom' : 'right'}
            >
              <TrashBox />
            </PopoverContent>
          </Popover> */}
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          'absolute left-60 top-0 z-[99999] w-[calc(100%-240px)]',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'left-0 w-full',
        )}
      >
        {!!params.documentId ? (
          // <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
          <div>Navbar</div>
        ) : (
          <nav className="w-full bg-transparent px-3 py-2">
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  )
}
