export type SortKey = 'name' | 'size' | 'modified'

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

export type SortButtonsProps = {
  changeSort: (value: 'name' | 'size' | 'modified') => void
}

export type BackToPFProps = {
  parentPath: string
  basePath: string
}

export type ButtonOpenGetProps = {
  type: 'file' | 'folder'
  href: string
}

export type SectorFileProps = {
  type: 'file' | 'folder'
  name: string
}

export type SectorModifiedProps = {
  modifiedShort: string
  modifiedLong: string
}

export type SearchBarProps = {
  search: string
  setSearch: (value: string) => void
}

export type SearchSortProps = {
  search: string
  setSearch: (value: string) => void
  changeSort: (value: 'name' | 'size' | 'modified') => void
}

export type PanelCentralProps = {
  files: FileItem[]
  currentPath: string
  basePath: string
}

export type PanelCentralComponentProps = {
  search: string
  setSearch: (value: string) => void
  changeSort: (value: 'name' | 'size' | 'modified') => void
  setPage: (value: number | ((x: number) => number)) => void
  currentPath: string
  parentPath: string
  basePath: string
  pageFiles: FileItem[]
  page: number
  totalPages: number
}
