import { SortButtonsProps } from '@/lib/types'

export default function SortButtons({ changeSort }: SortButtonsProps) {
  return (
    <div className='flex gap-2 text-sm sm:self-end'>
      <button
        onClick={() => changeSort('name')}
        className='rounded-xl border border-zinc-200 px-3 py-2 hover:bg-zinc-100 dark:border-white/10 dark:hover:bg-white/10'
      >
        Name
      </button>

      <button
        onClick={() => changeSort('size')}
        className='rounded-xl border border-zinc-200 px-3 py-2 hover:bg-zinc-100 dark:border-white/10 dark:hover:bg-white/10'
      >
        Size
      </button>

      <button
        onClick={() => changeSort('modified')}
        className='rounded-xl border border-zinc-200 px-3 py-2 hover:bg-zinc-100 dark:border-white/10 dark:hover:bg-white/10'
      >
        Date
      </button>
    </div>
  )
}
