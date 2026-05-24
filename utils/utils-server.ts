import fs from 'fs/promises'
import path from 'path'
import { FileItem } from '@/lib/types'
import safePath from '@/lib/safe-path'
import safeUserPath from '@/lib/safe-user-path'
import { notFound } from 'next/dist/client/components/navigation'
import { Dirent } from 'fs'

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
  let entries: Dirent[]
  const home = !userId
  const directory = home ? safePath(currentPath) : await safeUserPath(userId, currentPath)

  try {
    const stat = await fs.stat(directory)
    if (!stat.isDirectory()) notFound()
    entries = await fs.readdir(directory, { withFileTypes: true })
  } catch (err: any) {
    if (err.code === 'ENOENT' || err.code === 'ENOTDIR') notFound()
    throw err
  }

  const items = await Promise.all(
    entries
      .filter(entry => !entry.name.startsWith('.'))
      .map(async entry => {
        const partPathRoute = home ? '' : 'my-files'
        const partPathDownload = home ? 'FILES_DIR' : `USER_FILES_DIR/${userId}`
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
              ? `/${partPathRoute}?path=${encodeURIComponent(relativePath)}`
              : `/download/${partPathDownload}/${encodeDownloadPath(relativePath)}`,
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
