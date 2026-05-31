import { PanelCentralComponentProps } from '@/lib/types'
import SearchSort from './OneLevelDown/SearchSort'
import BackToPF from './OneLevelDown/BackToPF'
import TableHeader from './OneLevelDown/TableHeader'
import TableItem from './OneLevelDown/TableItem'
import NoFilesFound from './OneLevelDown/NoFilesFound'
import Pagination from '../Pagination'

export default function PanelCentralComponent({
  search,
  setSearch,
  changeSort,
  setPage,
  currentPath,
  parentPath,
  basePath,
  pageFiles,
  page,
  totalPages,
  canManage,
}: PanelCentralComponentProps) {
  return (
    <div className='overflow-hidden rounded-3xl border border-zinc-200 bg-white ring-1 ring-zinc-200 dark:border-white/10 dark:bg-white/5 dark:ring-white/5'>
      <SearchSort search={search} setSearch={setSearch} changeSort={changeSort} />
      {currentPath && <BackToPF parentPath={parentPath} basePath={basePath} />}
      <TableHeader canManage={canManage} />
      {pageFiles.length === 0 ? (
        <NoFilesFound />
      ) : (
        pageFiles.map(file => <TableItem key={file.path} file={file} canManage={canManage} />)
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
