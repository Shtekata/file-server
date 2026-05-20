import SortButtons from './SortButtons'
import SearchBar from './SearchBar'

type SearchSort = {
  search: string
  setSearch: (value: string) => void
  changeSort: (value: 'name' | 'size' | 'modified') => void
}

export default function SearchSort({ search, setSearch, changeSort }: SearchSort) {
  return (
    <div className='flex flex-col gap-4 border-b border-zinc-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10'>
      <SearchBar search={search} setSearch={setSearch} />
      <SortButtons changeSort={changeSort} />
    </div>
  )
}
