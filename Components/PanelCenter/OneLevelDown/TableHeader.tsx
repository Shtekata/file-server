export default function TableHeader() {
  return (
    <div className='grid grid-cols-48 border-b border-zinc-200 py-3 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400 px-5'>
      <div className='col-span-22'>Name</div>
      <div className='col-span-5'>Size</div>
      <div className='col-span-6'>Modified</div>
      <div className='col-span-15 text-center'>Action</div>
    </div>
  )
}
