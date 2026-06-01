export default function TableHeader({ canManage }: { canManage: boolean }) {
  return (
    <>
      {!canManage ? (
        <div className='grid grid-cols-48 border-b border-zinc-200 py-3 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400 px-5'>
          <div className='col-span-18 sm:col-span-30'>Name</div>
          <div className='col-span-10 sm:col-span-6'>Size</div>
          <div className='col-span-10 sm:col-span-8'>Modified</div>
          <div className='col-span-10 sm:col-span-4 text-center'>Action</div>
        </div>
      ) : (
        <div className='grid grid-cols-48 grid-rows-2 px-3 sm:px-5 border-b border-zinc-200 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400'>
          <div className='col-span-48 row-start-1 border-b border-dashed py-3 border-zinc-200 dark:border-white/10'>
            Name
          </div>
          <div className='col-span-7 col-start-5 sm:col-span-6 row-start-2 py-3'>Size</div>
          <div className='col-span-9 col-start-12 sm:col-span-8 row-start-2 py-3'>Modified</div>
          <div className='col-span-28 col-start-21 sm:col-span-11 row-start-2 py-3 text-center'>Action</div>
        </div>
      )}
    </>
  )
}
