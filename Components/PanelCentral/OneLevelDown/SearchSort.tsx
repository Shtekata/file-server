import SortButtons from '../TwoLevelsDown/SortButtons'
import SearchBar from '../TwoLevelsDown/SearchBar'
import { SearchSortProps } from '@/lib/types'

export default function SearchSort({ search, setSearch, changeSort }: SearchSortProps) {
  return (
    <div className='flex flex-col gap-4 border-b border-zinc-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10'>
      <SearchBar search={search} setSearch={setSearch} />
      <SortButtons changeSort={changeSort} />
    </div>
  )
}
