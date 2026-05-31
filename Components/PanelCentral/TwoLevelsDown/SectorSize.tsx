import clsx from 'clsx'
import { SectorSizeProps } from '@/lib/types'

export default function SectorSize({ size, canManage }: SectorSizeProps) {
  return (
    <div
      className={clsx(
        'text-sm text-zinc-500 sm:col-span-3 dark:text-zinc-400',
        canManage ? 'col-span-4' : 'col-span-5',
      )}
    >
      {size}
    </div>
  )
}
