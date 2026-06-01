import clsx from 'clsx'
import { SectorSizeProps } from '@/lib/types'

export default function SectorSize({ size, canManage }: SectorSizeProps) {
  return (
    <div
      className={clsx(
        'text-sm text-zinc-500 sm:col-span-6 dark:text-zinc-400',
        canManage ? 'col-span-7 col-start-5 row-start-2' : 'col-span-10',
      )}
    >
      {size}
    </div>
  )
}
