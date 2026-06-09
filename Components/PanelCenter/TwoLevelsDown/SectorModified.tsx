import { SectorModifiedProps } from '@/lib/types'
import clsx from 'clsx'

export default function SectorModified({ modifiedShort, modifiedLong, canManage }: SectorModifiedProps) {
  return (
    <div
      className={clsx(
        'text-sm text-zinc-500 dark:text-zinc-400',
        canManage ? 'col-span-7' : 'col-span-10  sm:col-span-7',
      )}
    >
      <span className='sm:hidden'>{modifiedShort}</span>
      <span className='hidden sm:inline'>{modifiedLong}</span>
    </div>
  )
}
