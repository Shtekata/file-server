import { BackToPFProps } from '@/lib/types'
import Link from 'next/link'

export default function BackToPF({ parentPath, basePath }: BackToPFProps) {
  return (
    <Link
      href={parentPath ? `${basePath}?path=${encodeURIComponent(parentPath)}` : basePath}
      className='block border-b border-zinc-100 px-5 py-4 text-sm text-zinc-600 transition hover:bg-zinc-100 dark:border-white/5 dark:text-zinc-300 dark:hover:bg-white/10'
    >
      ← Back to parent folder
    </Link>
  )
}
