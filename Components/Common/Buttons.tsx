import { ButtonThemeProps, ButtonFuncProps, ButtonLinkProps } from '@/lib/types'
import Link from 'next/link'

export function ButtonTheme({ theme, onClick }: ButtonThemeProps) {
  return (
    <button
      onClick={onClick}
      className='cursor-pointer rounded-xl border border-zinc-200 bg-white px-2 py-2 sm:px-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-white/10 w-full sm:h-12'
    >
      {theme === 'light' ? 'Dark' : 'Light'}{' '}
    </button>
  )
}

export function ButtonFunc({ text, type, onClick }: ButtonFuncProps) {
  return (
    <button
      onClick={onClick}
      type={type || 'button'}
      className='cursor-pointer rounded-xl border border-zinc-200 bg-white px-2 py-2 sm:px-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-white/10 w-full sm:h-12'
    >
      {text}
    </button>
  )
}

export function ButtonLink({ text, href }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className='flex items-center justify-center cursor-pointer rounded-xl border border-zinc-200 bg-white px-2 py-2 sm:px-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-white/10 w-full sm:h-12 '
    >
      {text}
    </Link>
  )
}
