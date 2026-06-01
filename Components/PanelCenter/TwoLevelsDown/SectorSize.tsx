import clsx from 'clsx'
import { SectorSizeProps } from '@/lib/types'

export default function SectorSize({ size, canManage }: SectorSizeProps) {
  return (
    <div
      className={clsx(
        'text-sm text-zinc-500 sm:col-span-5 dark:text-zinc-400',
        canManage ? 'col-span-5' : 'col-span-10',
      )}
    >
      {size}
    </div>
  )
}
