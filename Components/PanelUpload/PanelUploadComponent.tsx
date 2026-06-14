import { PanelUploadComponentProps } from '@/lib/types'

export default function PanelUploadComponent({ handleSubmit, inputRef, uploading, error }: PanelUploadComponentProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className='mt-3 flex flex-col gap-3 rounded-3xl border border-zinc-200 bg-white p-5 ring-1 ring-zinc-200 sm:flex-row sm:justify-between sm:items-center dark:border-white/10 dark:bg-white/5 dark:ring-white/5'
    >
      <input
        ref={inputRef}
        type='file'
        className='block cursor-pointer text-sm text-zinc-600 file:mr-4 file:cursor-pointer file:rounded-xl file:bg-zinc-900 file:px-4 file:py-2 file:font-semibold file:text-white sm:file:min-w-40 transition file:hover:bg-zinc-700  dark:text-zinc-300 dark:file:bg-zinc-100 dark:file:text-zinc-950 dark:file:hover:bg-white'
      />

      <button
        disabled={uploading}
        className='cursor-pointer rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white sm:min-w-40 transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white'
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {error && <p className='text-sm text-red-500'>{error}</p>}
    </form>
  )
}
