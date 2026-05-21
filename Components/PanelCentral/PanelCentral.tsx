'use client'

import { useEffect, useMemo, useState } from 'react'
import Pagination from '../Pagination'
import SearchSort from './SearchSort'
import BackToPF from './BackToPF'
import TableHeader from './TableHeader'
import ButtonOpenGet from './OneLevelDown/ButtonOpenGet'
import SectorModified from './OneLevelDown/SectorModified'
import SectorSize from './OneLevelDown/SectorSize'
import SectorFile from './OneLevelDown/SectorFile'
import TableItem from './TableItem'

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

export default function PanelCentral({
  files,
  currentPath,
  basePath,
}: {
  files: FileItem[]
  currentPath: string
  basePath: string
}) {
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

      if (sortKey === 'name') result = a.name.localeCompare(b.name, 'bg', { sensitivity: 'base', numeric: true })
      if (sortKey === 'size') result = a.sizeBytes - b.sizeBytes
      if (sortKey === 'modified') result = a.modifiedTime - b.modifiedTime
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
      <SearchSort search={search} setSearch={setSearch} changeSort={changeSort} />
      {currentPath && <BackToPF parentPath={parentPath} basePath={basePath} />}
      <TableHeader />
      {pageFiles.length === 0 ? (
        <div className='px-5 py-10 text-center text-zinc-500 dark:text-zinc-400'>No files found.</div>
      ) : (
        pageFiles.map(file => <TableItem file={file} />)
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
