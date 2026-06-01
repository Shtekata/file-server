import { SectorFileProps } from '@/lib/types'
import { fileIcon } from '@/utils/utils-browser'
import clsx from 'clsx'

export default function SectorFile({ type, name, canManage }: SectorFileProps) {
  return (
    <div
      className={clsx(
        'flex items-center font-medium',
        canManage
          ? 'col-span-48 row-start-1 gap-1 border-b border-dashed py-3 border-zinc-200 dark:border-white/10'
          : 'col-span-18 sm:col-span-30 gap-3',
      )}
    >
      <span className='text-2xl'>{fileIcon({ type, name })}</span>
      <span className='truncate pr-3'>{name}</span>
    </div>
  )
}
