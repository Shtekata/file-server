type PaginationProps = {
  page: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
}

export default function Pagination({ page, totalPages, onPrevious, onNext }: PaginationProps) {
  return (
    <div className='flex items-center justify-between gap-3 border-t border-zinc-200 px-3 py-2 sm:px-5 sm:py-4 text-sm text-zinc-600 dark:border-white/10 dark:text-zinc-400'>
      <span>
        Page {page} of {totalPages}
      </span>

      <div className='flex gap-2'>
        <button
          onClick={onPrevious}
          disabled={page === 1}
          className='cursor-pointer rounded-xl border border-zinc-200 px-3 py-2 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/10'
        >
          Prev
        </button>

        <button
          onClick={onNext}
          disabled={page === totalPages}
          className='cursor-pointer rounded-xl border border-zinc-200 px-3 py-2 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/10'
        >
          Next
        </button>
      </div>
    </div>
  )
}
