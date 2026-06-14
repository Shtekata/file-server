export default function TableHeader({ canManage }: { canManage: boolean }) {
  return (
    <>
      {canManage ? (
        <div className='grid grid-cols-48 border-b border-zinc-200 py-3 px-2 md:px-3 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400'>
          <div className='col-span-14 md:col-span-21'>Name</div>
          <div className='col-span-7 md:col-span-5'>Size</div>
          <div className='col-span-7 md:col-span-7'>Modified</div>
          <div className='col-span-20 md:col-span-15 md:text-center pr-7'>Action</div>
        </div>
      ) : (
        <div className='grid grid-cols-48 border-b border-zinc-200 py-3 px-2 md:px-3 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400'>
          <div className='col-span-23 md:col-span-31'>Name</div>
          <div className='col-span-9 md:col-span-5'>Size</div>
          <div className='col-span-9 md:col-span-7'>Modified</div>
          <div className='col-span-7 md:col-span-5 text-center'>Action</div>
        </div>
      )}
    </>
  )
}
