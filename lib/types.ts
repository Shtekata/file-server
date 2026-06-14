import { SubmitEvent, RefObject } from 'react'

export type Theme = 'light' | 'dark'

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

export type ButtonThemeProps = {
  theme: 'light' | 'dark'
  onClick: () => void
}

export type ButtonFuncProps = {
  text: string
  type?: 'button' | 'submit'
  onClick?: () => void
}

export type ButtonLinkProps = {
  text: string
  href: string
}

export type ButtonOpenGetProps = {
  type: 'file' | 'folder'
  href: string
  path: string
  canManage: boolean
  deleteFile: (path: string) => void
}

export type SectorFileProps = {
  type: 'file' | 'folder'
  name: string
  canManage: boolean
}

export type SectorSizeProps = {
  size: string
  canManage: boolean
}

export type PanelTopProps = {
  username?: string | null
  currentPath: string
  canManage?: boolean
}

export type SectorModifiedProps = {
  modifiedShort: string
  modifiedLong: string
  canManage: boolean
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

export type PanelCenterProps = {
  files: FileItem[]
  currentPath: string
  basePath: string
  canManage: boolean
}

export type PaginationProps = {
  page: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
}

export type PanelWholeProps = {
  userId?: string | null
  username?: string | null
  files: any[]
  currentPath: string
  basePath: string
}

export type PanelUploadComponentProps = {
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => void
  inputRef: RefObject<HTMLInputElement | null>
  uploading: boolean
  error: string
}

export type PanelCenterComponentProps = {
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
  canManage: boolean
}
