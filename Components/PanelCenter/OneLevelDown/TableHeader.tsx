export default function TableHeader() {
  return (
    <div className='grid grid-cols-48 border-b border-zinc-200 py-3 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400 pl-3 pr-2'>
      <div className='col-span-22 sm:col-span-32'>Name</div>
      <div className='col-span-9 sm:col-span-5'>Size</div>
      <div className='col-span-9 sm:col-span-7'>Modified</div>
      <div className='col-span-8 sm:col-span-4 text-center'>Action</div>
    </div>
  )
}
