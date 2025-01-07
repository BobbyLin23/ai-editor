import { Navigation } from './_components/navigation'
import { SearchCommand } from './_components/search-command'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="h-full flex-1 overflow-y-auto">
        <SearchCommand />
        {children}
      </main>
    </div>
  )
}
