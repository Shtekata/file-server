import { SearchBarProps } from '@/lib/types'

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <input
      id='search'
      value={search}
      onChange={event => setSearch(event.target.value)}
      placeholder='Search files...'
      className='w-full rounded-2xl border border-zinc-200 bg-white  px-3 py-2 sm:px-4 sm:py-3 text-sm outline-none ring-zinc-200 transition placeholder:text-zinc-400 focus:ring-4 sm:max-w-sm dark:border-white/10 dark:bg-zinc-950 dark:ring-white/10 dark:placeholder:text-zinc-500'
    />
  )
}
