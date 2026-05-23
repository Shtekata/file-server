import fs from 'fs/promises'
import path from 'path'
import { FileItem } from '@/lib/types'
import safePath from '@/lib/files-common'
import safeUserPath from '@/lib/files-users'

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

function encodeDownloadPath(relativePath: string) {
  return relativePath
    .split('/')
    .map(part => encodeURIComponent(part))
    .join('/')
}

export async function getFiles({
  userId,
  currentPath,
}: {
  userId: string | null
  currentPath: string
}): Promise<FileItem[]> {
  const home = !userId
  const directory = home ? safePath(currentPath) : await safeUserPath(userId, currentPath)
  const entries = await fs.readdir(directory, { withFileTypes: true })

  const items = await Promise.all(
    entries
      .filter(entry => !entry.name.startsWith('.'))
      .map(async entry => {
        const relativePath = path.posix.join(currentPath, entry.name)
        const fullPath = home ? safePath(relativePath) : await safeUserPath(userId, relativePath)
        const stat = await fs.stat(fullPath)

        const type: 'folder' | 'file' = entry.isDirectory() ? 'folder' : 'file'

        const d = stat.mtime
        const modifiedShort = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getFullYear()).slice(-2)}`

        return {
          name: entry.name,
          path: relativePath,
          href:
            type === 'folder'
              ? `/?path=${encodeURIComponent(relativePath)}`
              : `/download/${encodeDownloadPath(relativePath)}`,
          size: type === 'folder' ? 'Folder' : formatBytes(stat.size),
          sizeBytes: type === 'folder' ? 0 : stat.size,
          modifiedLong: d.toLocaleDateString('bg-BG', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          }),
          modifiedShort,
          modifiedTime: d.getTime(),
          type,
        }
      }),
  )

  return items
}
