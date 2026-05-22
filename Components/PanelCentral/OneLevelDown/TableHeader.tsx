export default function TableHeader() {
  return (
    <div className='grid grid-cols-24 border-b border-zinc-200 px-5 py-3 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400'>
      <div className='col-span-9 sm:col-span-15'>Name</div>
      <div className='col-span-5 sm:col-span-3'>Size</div>
      <div className='col-span-5 sm:col-span-4'>Modified</div>
      <div className='col-span-5 sm:col-span-2 text-center'>Action</div>
    </div>
  )
}
