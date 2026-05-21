export default function SectorModified({
  modifiedShort,
  modifiedLong,
}: {
  modifiedShort: string
  modifiedLong: string
}) {
  return (
    <div className='col-span-5 text-sm text-zinc-500 sm:col-span-4 dark:text-zinc-400'>
      <span className='sm:hidden'>{modifiedShort}</span>
      <span className='hidden sm:inline'>{modifiedLong}</span>
    </div>
  )
}
