import { SectorFileProps } from '@/lib/types'
import { fileIcon } from '@/utils/utils-browser'

export default function SectorFile({ type, name }: SectorFileProps) {
  return (
    <div className='col-span-9 sm:col-span-15 flex items-center gap-3 font-medium'>
      <span className='text-2xl'>{fileIcon({ type, name })}</span>
      <span className='truncate pr-3'>{name}</span>
    </div>
  )
}
