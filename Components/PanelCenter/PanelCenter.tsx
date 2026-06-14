'use client'

import { PAGE_SIZE } from '@/lib/constants'
import { SortKey, PanelCenterProps } from '@/lib/types'
import { useEffect, useMemo, useState } from 'react'
import PanelCenterComponent from './PanelCenterComponent'

export default function PanelCenter({ files, currentPath, basePath, canManage }: PanelCenterProps) {
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
    <PanelCenterComponent
      search={search}
      setSearch={setSearch}
      changeSort={changeSort}
      setPage={setPage}
      currentPath={currentPath}
      parentPath={parentPath}
      basePath={basePath}
      pageFiles={pageFiles}
      page={page}
      totalPages={totalPages}
      canManage={canManage}
    />
  )
}
