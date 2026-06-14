import Link from 'next/link'
import { ButtonOpenGetProps } from '@/lib/types'
import clsx from 'clsx'

export default function ButtonOpenGet({ type, href, path, canManage, deleteFile }: ButtonOpenGetProps) {
  return (
    <div
      className={clsx(
        'text-center',
        canManage ? 'flex justify-between col-span-20 md:col-span-15' : 'col-span-7 md:col-span-5',
      )}
    >
      {type === 'file' ? (
        <a
          href={href}
          className='inline-block min-w-12 md:min-w-14 rounded-xl text-sm text-white bg-zinc-900 px-1.5 py-1.5 font-medium md:px-2.5 md:py-2.5 transition hover:bg-zinc-700 dark:font-semibold dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white'
        >
          Get
        </a>
      ) : (
        <Link
          href={href}
          className='inline-block min-w-12 md:min-w-14 rounded-xl text-sm text-zinc-700 px-1.5 py-1.5 md:px-2.5 md:py-2.5 border border-zinc-200 transition hover:text-zinc-950 dark:text-zinc-300 dark:border-white/10 dark:hover:text-zinc-100'
        >
          Open
        </Link>
      )}
      {canManage && (
        <>
          <button
            onClick={() => deleteFile(path)}
            className='min-w-19 cursor-pointer rounded-xl border border-zinc-200 px-1.5 py-1.5 md:px-2.5 md:py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200 hover:border-zinc-300 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/10'
          >
            Rename
          </button>
          <button
            onClick={() => deleteFile(path)}
            className='min-w-19 cursor-pointer rounded-xl border border-red-200 px-1.5 py-1.5 md:px-2.5 md:py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/10'
          >
            Delete
          </button>
        </>
      )}
    </div>
  )
}
