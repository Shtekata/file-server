import clsx from 'clsx'
import { SectorSizeProps } from '@/lib/types'

export default function SectorSize({ size, canManage }: SectorSizeProps) {
  return (
    <div
      className={clsx(
        'text-sm text-zinc-500 dark:text-zinc-400',
        canManage ? 'col-span-7 md:col-span-5' : 'col-span-9 md:col-span-5',
      )}
    >
      {size}
    </div>
  )
}
