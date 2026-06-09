import Link from 'next/link'
import { ButtonOpenGetProps } from '@/lib/types'
import clsx from 'clsx'

export default function ButtonOpenGet({ type, href, path, canManage, deleteFile }: ButtonOpenGetProps) {
  return (
    <div
      className={clsx(
        'text-center',
        canManage ? 'flex justify-between col-span-15 sm:col-span-15' : 'col-span-10 sm:col-span-4',
      )}
    >
      {type === 'file' ? (
        <a
          href={href}
          className='min-w-17 rounded-xl bg-zinc-900 px-1.5 py-1.5 text-sm font-medium text-white transition hover:bg-zinc-700 sm:px-2.5 sm:py-2.5 dark:font-semibold dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white'
        >
          Get
        </a>
      ) : (
        <Link
          href={href}
          className='min-w-17 rounded-xl text-sm text-zinc-700 px-1.5 py-1.5 sm:px-2.5 sm:py-2.5 border border-zinc-200 hover:text-zinc-950 dark:text-zinc-300 dark:border-white/10 dark:hover:text-zinc-100'
        >
          Open
        </Link>
      )}
      {canManage && (
        <>
          <button
            onClick={() => deleteFile(path)}
            className='min-w-17 rounded-xl border border-zinc-200 px-1.5 py-1.5 sm:px-2.5 sm:py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/10'
          >
            Rename
          </button>
          <button
            onClick={() => deleteFile(path)}
            className='min-w-17 rounded-xl border border-red-200 px-1.5 py-1.5 sm:px-2.5 sm:py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/10'
          >
            Delete
          </button>
        </>
      )}
    </div>
  )
}
