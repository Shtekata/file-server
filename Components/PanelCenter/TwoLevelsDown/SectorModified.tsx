import { SectorModifiedProps } from '@/lib/types'
import clsx from 'clsx'

export default function SectorModified({ modifiedShort, modifiedLong, canManage }: SectorModifiedProps) {
  return (
    <div
      className={clsx(
        'text-sm text-zinc-500 dark:text-zinc-400',
        canManage ? 'col-span-7 md:col-span-7' : 'col-span-9  md:col-span-7',
      )}
    >
      <span className='md:hidden'>{modifiedShort}</span>
      <span className='hidden md:inline'>{modifiedLong}</span>
    </div>
  )
}
