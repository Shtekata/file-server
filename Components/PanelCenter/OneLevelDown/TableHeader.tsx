import clsx from 'clsx'

export default function TableHeader({ canManage }: { canManage: boolean }) {
  return (
    <div className='grid grid-cols-24 border-b border-zinc-200 px-5 py-3 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400'>
      <div className='col-span-9 sm:col-span-15'>Name</div>
      <div className={clsx('sm:col-span-3', canManage ? 'col-span-4' : 'col-span-5')}>Size</div>
      <div className={clsx('sm:col-span-4', canManage ? 'col-span-4' : 'col-span-5')}>Modified</div>
      <div className={clsx('sm:col-span-2 text-center', canManage ? 'col-span-7' : 'col-span-5')}>Action</div>
    </div>
  )
}
