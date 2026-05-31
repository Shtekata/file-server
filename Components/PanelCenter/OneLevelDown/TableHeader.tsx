import clsx from 'clsx'

export default function TableHeader({ canManage }: { canManage: boolean }) {
  return (
    <div
      className={clsx(
        'grid grid-cols-48 border-b border-zinc-200 py-3 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400',
        canManage ? 'px-3 sm:px-5' : 'px-5',
      )}
    >
      <div className={clsx('col-span-18', canManage ? ' sm:col-span-23' : ' sm:col-span-30')}>Name</div>
      <div className={clsx('sm:col-span-6', canManage ? 'col-span-7' : 'col-span-10')}>Size</div>
      <div className={clsx('sm:col-span-8', canManage ? 'col-span-9' : 'col-span-10')}>Modified</div>
      <div className={clsx('text-center', canManage ? 'col-span-14 sm:col-span-11' : 'col-span-10 sm:col-span-4')}>
        Action
      </div>
    </div>
  )
}
