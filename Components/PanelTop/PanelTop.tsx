import { PanelTopProps } from '@/lib/types'
import Label from './Label'
import ThemeToggle from '../Theme/ThemeToggle'
import ButtonLogin from './ButtonLogin'
import ButtonRegister from './ButtonRegister'
import ButtonLogout from './ButtonLogout'

export default function PanelTop({ user, currentPath }: PanelTopProps) {
  return (
    <div className='overflow-hidden rounded-3xl border border-zinc-200 bg-white mb-3 sm:mb-8 p-5 pb-3 sm:p-8 ring-1 ring-zinc-200 dark:border-white/10 dark:bg-white/5 dark:ring-white/5'>
      <div className='mb-3 flex justify-between gap-4 min-h-28'>
        <Label user={user} />
        <div className='flex flex-col sm:grid grid-cols-2 gap-2'>
          <ThemeToggle />
          <ButtonLogin />
          <ButtonRegister />
          <ButtonLogout />
        </div>
      </div>

      {currentPath && (
        <p className='mt-4 text-sm text-zinc-500'>
          Current folder: <span className='text-zinc-700 dark:text-zinc-300'>/{currentPath}</span>
        </p>
      )}
    </div>
  )
}
