import { SectorFileProps } from '@/lib/types'
import { fileIcon } from '@/utils/utils-browser'
import clsx from 'clsx'

export default function SectorFile({ type, name, canManage }: SectorFileProps) {
  return (
    <div className={clsx('col-span-9 sm:col-span-15 flex items-center font-medium', canManage ? 'gap-1' : 'gap-3')}>
      <span className='text-2xl'>{fileIcon({ type, name })}</span>
      <span className='truncate pr-3'>{name}</span>
    </div>
  )
}
