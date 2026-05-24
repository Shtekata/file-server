export default function Label({ user, currentPath }: { user: string | null; currentPath: string }) {
  const home = !user
  return (
    <div className='min-w-0'>
      <p className='mb-2 text-sm uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400'>
        {home ? 'myperfume.bg' : 'My Files'}
      </p>

      <h1 className='text-4xl font-bold tracking-tight'>{home ? 'Home Cloud' : user}</h1>

      <p className='mt-3 text-zinc-600 dark:text-zinc-400'>
        {home
          ? 'Download files directly from our public file area.'
          : 'Upload, download and manage your private files.'}
      </p>
      <p className='mt-4 text-sm text-zinc-500'>
        Current folder: <span className='break-all text-zinc-700 dark:text-zinc-300'>/{currentPath}</span>
      </p>
    </div>
  )
}
