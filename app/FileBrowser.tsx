'use client'

import { useMemo, useState } from 'react'

export type FileItem = {
  name: string
  path: string
  href: string
  size: string
  sizeBytes: number
  modifiedLong: string
  modifiedShort: string
  modifiedTime: number
  type: 'folder' | 'file'
}

type SortKey = 'name' | 'size' | 'modified'

function fileIcon(file: FileItem) {
  if (file.type === 'folder') return '📁'

  const ext = file.name.split('.').pop()?.toLowerCase() || ''

  if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext)) return '🖼️'
  if (['.pdf'].includes(ext)) return '📕'
  if (['.zip', '.rar', '.7z', '.tar', '.gz'].includes(ext)) return '🗜️'
  if (['.xls', '.xlsx', '.csv'].includes(ext)) return '📊'
  if (['.txt'].includes(ext)) return '📝'
  if (['.doc', '.docx'].includes(ext)) return '📄'
  if (['.ppt', '.pptx'].includes(ext)) return '📽️'
  if (['.mp4', '.mkv', '.avi', '.mov'].includes(ext)) return '🎬'
  if (['.mp3', '.wav', '.flac'].includes(ext)) return '🎵'

  return '📦'
}

export default function FileBrowser({
  files,
  currentPath,
  parentPath,
}: {
  files: FileItem[]
  currentPath: string
  parentPath: string
}) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const s = search.toLowerCase()

  const currentFiles = useMemo(() => {
    const filtered = files.filter(file => file.name.toLowerCase().includes(s))

    return filtered.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'folder' ? -1 : 1

      let result = 0

      if (sortKey === 'name') {
        result = a.name.localeCompare(b.name, 'bg', { sensitivity: 'base', numeric: true })
      }

      if (sortKey === 'size') {
        result = a.sizeBytes - b.sizeBytes
      }

      if (sortKey === 'modified') {
        result = a.modifiedTime - b.modifiedTime
      }

      return sortDirection === 'asc' ? result : -result
    })
  }, [files, search, sortKey, sortDirection])

  function changeSort(nextKey: SortKey) {
    if (sortKey === nextKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
      return
    }
    setSortKey(nextKey)
    setSortDirection('asc')
  }

  return (
    <div className='overflow-hidden rounded-3xl border border-white/10 bg-white/5 ring-1 ring-white/5'>
      <div className='flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between'>
        <input
          id='search'
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder='Search files...'
          className='w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm outline-none ring-white/10 transition placeholder:text-zinc-500 focus:ring-4 sm:max-w-sm'
        />

        <div className='flex gap-2 text-sm sm:self-end'>
          <button
            onClick={() => changeSort('name')}
            className='rounded-xl border border-white/10 px-3 py-2 hover:bg-white/10'
          >
            Name
          </button>

          <button
            onClick={() => changeSort('size')}
            className='rounded-xl border border-white/10 px-3 py-2 hover:bg-white/10'
          >
            Size
          </button>

          <button
            onClick={() => changeSort('modified')}
            className='rounded-xl border border-white/10 px-3 py-2 hover:bg-white/10'
          >
            Date
          </button>
        </div>
      </div>

      {currentPath && (
        <a
          href={parentPath ? `/?path=${encodeURIComponent(parentPath)}` : '/'}
          className='block border-b border-white/5 px-5 py-4 text-sm text-zinc-300 transition hover:bg-white/10'
        >
          ← Back to parent folder
        </a>
      )}

      <div className='grid grid-cols-24 border-b border-white/10 px-5 py-3 text-sm text-zinc-400'>
        <div className='col-span-9 sm:col-span-15'>Name</div>
        <div className='col-span-5 sm:col-span-3'>Size</div>
        <div className='col-span-5 sm:col-span-4'>Modified</div>
        <div className='col-span-5 sm:col-span-2 text-center'>Action</div>
      </div>

      {currentFiles.length === 0 ? (
        <div className='px-5 py-10 text-center text-zinc-400'>No files found.</div>
      ) : (
        currentFiles.map(file => (
          <div
            key={file.path}
            className='grid grid-cols-24 items-center border-b border-white/5 px-5 py-4 transition hover:bg-white/10'
          >
            <div className='col-span-9 sm:col-span-15 flex items-center gap-3 font-medium'>
              <span className='text-2xl'>{fileIcon(file)}</span>
              <span className='truncate pr-3'>{file.name}</span>
            </div>

            <div className='col-span-5 sm:col-span-3 text-sm text-zinc-400'>{file.size}</div>

            <div className='col-span-5 sm:col-span-4 text-sm text-zinc-400'>
              <span className='sm:hidden'>{file.modifiedShort}</span>
              <span className='hidden sm:inline'>{file.modifiedLong}</span>
            </div>

            <div className='col-span-5 sm:col-span-2 text-center'>
              {file.type === 'file' ? (
                <a
                  href={file.href}
                  className='rounded-xl bg-zinc-100 px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-semibold text-zinc-950 transition hover:bg-white'
                >
                  Get
                </a>
              ) : (
                <a href={file.href} className='text-sm text-zinc-300 hover:text-zinc-100'>
                  Open
                </a>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
