'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Pagination from './Pagination'

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
const PAGE_SIZE = 7

function fileIcon(file: FileItem) {
  if (file.type === 'folder') return '📁'

  const ext = file.name.split('.').pop()?.toLowerCase() || ''

  if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext)) return '🖼️'
  if (['pdf'].includes(ext)) return '📕'
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return '🗜️'
  if (['xls', 'xlsx', 'csv'].includes(ext)) return '📊'
  if (['txt'].includes(ext)) return '📝'
  if (['doc', 'docx'].includes(ext)) return '📄'
  if (['ppt', 'pptx'].includes(ext)) return '📽️'
  if (['mp4', 'mkv', 'avi', 'mov'].includes(ext)) return '🎬'
  if (['mp3', 'wav', 'flac'].includes(ext)) return '🎵'

  return '📦'
}

export default function PanelCentral({ files, currentPath }: { files: FileItem[]; currentPath: string }) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)

  const parentPath = currentPath.split('/').slice(0, -1).join('/')
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

  const totalPages = Math.max(1, Math.ceil(currentFiles.length / PAGE_SIZE))
  const pageFiles = currentFiles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [search, sortKey, sortDirection, currentPath])

  function changeSort(nextKey: SortKey) {
    if (sortKey === nextKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
      return
    }
    setSortKey(nextKey)
    setSortDirection('asc')
  }

  return (
    <div className='overflow-hidden rounded-3xl border border-zinc-200 bg-white ring-1 ring-zinc-200 dark:border-white/10 dark:bg-white/5 dark:ring-white/5'>
      <div className='flex flex-col gap-4 border-b border-zinc-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10'>
        <input
          id='search'
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder='Search files...'
          className='w-full rounded-2xl border border-zinc-200 bg-white  px-3 py-2 sm:px-4 sm:py-3 text-sm outline-none ring-zinc-200 transition placeholder:text-zinc-400 focus:ring-4 sm:max-w-sm dark:border-white/10 dark:bg-zinc-950 dark:ring-white/10 dark:placeholder:text-zinc-500'
        />

        <div className='flex gap-2 text-sm sm:self-end'>
          <button
            onClick={() => changeSort('name')}
            className='rounded-xl border border-zinc-200 px-3 py-2 hover:bg-zinc-100 dark:border-white/10 dark:hover:bg-white/10'
          >
            Name
          </button>

          <button
            onClick={() => changeSort('size')}
            className='rounded-xl border border-zinc-200 px-3 py-2 hover:bg-zinc-100 dark:border-white/10 dark:hover:bg-white/10'
          >
            Size
          </button>

          <button
            onClick={() => changeSort('modified')}
            className='rounded-xl border border-zinc-200 px-3 py-2 hover:bg-zinc-100 dark:border-white/10 dark:hover:bg-white/10'
          >
            Date
          </button>
        </div>
      </div>

      {currentPath && (
        <Link
          href={parentPath ? `/?path=${encodeURIComponent(parentPath)}` : '/'}
          className='block border-b border-zinc-100 px-5 py-4 text-sm text-zinc-600 transition hover:bg-zinc-100 dark:border-white/5 dark:text-zinc-300 dark:hover:bg-white/10'
        >
          ← Back to parent folder
        </Link>
      )}

      <div className='grid grid-cols-24 border-b border-zinc-200 px-5 py-3 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400'>
        <div className='col-span-9 sm:col-span-15'>Name</div>
        <div className='col-span-5 sm:col-span-3'>Size</div>
        <div className='col-span-5 sm:col-span-4'>Modified</div>
        <div className='col-span-5 sm:col-span-2 text-center'>Action</div>
      </div>

      {pageFiles.length === 0 ? (
        <div className='px-5 py-10 text-center text-zinc-500 dark:text-zinc-400'>No files found.</div>
      ) : (
        pageFiles.map(file => (
          <div
            key={file.path}
            className='grid grid-cols-24 items-center border-b border-zinc-100 px-5 py-4 transition hover:bg-zinc-100 dark:border-white/5 dark:hover:bg-white/10'
          >
            <div className='col-span-9 sm:col-span-15 flex items-center gap-3 font-medium'>
              <span className='text-2xl'>{fileIcon(file)}</span>
              <span className='truncate pr-3'>{file.name}</span>
            </div>

            <div className='col-span-5 text-sm text-zinc-500 sm:col-span-3 dark:text-zinc-400'>{file.size}</div>

            <div className='col-span-5 text-sm text-zinc-500 sm:col-span-4 dark:text-zinc-400'>
              <span className='sm:hidden'>{file.modifiedShort}</span>
              <span className='hidden sm:inline'>{file.modifiedLong}</span>
            </div>

            <div className='col-span-5 sm:col-span-2 text-center'>
              {file.type === 'file' ? (
                <a
                  href={file.href}
                  className='rounded-xl bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-zinc-700 sm:px-4 sm:py-2 dark:font-semibold dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white'
                >
                  Get
                </a>
              ) : (
                <Link
                  href={file.href}
                  className='text-sm text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-100'
                >
                  Open
                </Link>
              )}
            </div>
          </div>
        ))
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrevious={() => setPage(value => Math.max(1, value - 1))}
        onNext={() => setPage(value => Math.min(totalPages, value + 1))}
      />
    </div>
  )
}
