import { SectorFileProps } from '@/lib/types'
import { fileIcon } from '@/utils/utils-browser'
import clsx from 'clsx'

export default function SectorFile({ type, name, canManage }: SectorFileProps) {
  return (
    <div
      className={clsx(
        'flex items-center font-medium',
        canManage ? 'col-span-22 gap-1 py-3' : 'col-span-18 sm:col-span-30 gap-3',
      )}
    >
      <span className='text-2xl'>{fileIcon({ type, name })}</span>
      <span className='truncate pr-3'>{name}</span>
    </div>
  )
}
