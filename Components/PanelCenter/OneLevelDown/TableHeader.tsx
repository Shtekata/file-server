import clsx from 'clsx'

export default function TableHeader({ canManage }: { canManage: boolean }) {
  return (
    <div
      className={clsx(
        'grid grid-cols-24 border-b border-zinc-200 py-3 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400',
        canManage ? 'px-3 sm:px-5' : 'px-5',
      )}
    >
      <div className={clsx('col-span-9', canManage ? ' sm:col-span-12' : ' sm:col-span-15')}>Name</div>
      <div className={clsx('sm:col-span-3', canManage ? 'col-span-4' : 'col-span-5')}>Size</div>
      <div className={clsx('sm:col-span-4', canManage ? 'col-span-4' : 'col-span-5')}>Modified</div>
      <div className={clsx('text-center', canManage ? 'col-span-7 sm:col-span-5' : 'col-span-5 sm:col-span-2')}>
        Action
      </div>
    </div>
  )
}
