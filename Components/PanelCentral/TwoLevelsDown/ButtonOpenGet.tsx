import Link from 'next/link'
import { ButtonOpenGetProps } from '@/lib/types'

export default function ButtonOpenGet({ type, href }: ButtonOpenGetProps) {
  return (
    <div className='col-span-5 sm:col-span-2 text-center'>
      {type === 'file' ? (
        <a
          href={href}
          className='rounded-xl bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-zinc-700 sm:px-4 sm:py-2 dark:font-semibold dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white'
        >
          Get
        </a>
      ) : (
        <Link
          href={href}
          className='text-sm text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-100'
        >
          Open
        </Link>
      )}
    </div>
  )
}
