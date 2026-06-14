import { SectorFileProps } from '@/lib/types'
import { fileIcon } from '@/utils/utils-browser'
import clsx from 'clsx'

export default function SectorFile({ type, name, canManage }: SectorFileProps) {
  return (
    <div
      className={clsx(
        'flex items-center font-medium gap-3',
        canManage ? 'col-span-14 sm:col-span-21' : 'col-span-20 sm:col-span-30',
      )}
    >
      <span className='text-2xl'>{fileIcon({ type, name })}</span>
      <span className='truncate pr-3'>{name}</span>
    </div>
  )
}
