import Label from './Label'
import ThemeToggle from '../Theme/ThemeToggle'

type TopPanel = {
  user: string | null
  currentPath: string
}

export default function PanelTop({ user, currentPath }: TopPanel) {
  return (
    <div className='overflow-hidden rounded-3xl border border-zinc-200 bg-white mb-3 sm:mb-8 p-5 pb-3 sm:p-8 ring-1 ring-zinc-200 dark:border-white/10 dark:bg-white/5 dark:ring-white/5'>
      <div className='mb-3 flex items-start justify-between gap-4'>
        <Label user={user} />

        <ThemeToggle />
      </div>

      {currentPath && (
        <p className='mt-4 text-sm text-zinc-500'>
          Current folder: <span className='text-zinc-700 dark:text-zinc-300'>/{currentPath}</span>
        </p>
      )}
    </div>
  )
}
