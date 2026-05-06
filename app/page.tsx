import fs from 'fs/promises'
import path from 'path'
import { FILES_DIR } from '@/lib/config'
import FileBrowser, { FileItem } from './FileBrowser'

export const dynamic = 'force-dynamic'

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

function safePath(relativePath: string) {
  const resolved = path.resolve(FILES_DIR, relativePath)

  if (!resolved.startsWith(FILES_DIR)) {
    throw new Error('Invalid path')
  }

  return resolved
}

function encodeDownloadPath(relativePath: string) {
  return relativePath
    .split('/')
    .map(part => encodeURIComponent(part))
    .join('/')
}

async function getFiles(currentPath: string): Promise<FileItem[]> {
  const directory = safePath(currentPath)
  const entries = await fs.readdir(directory, { withFileTypes: true })

  const items = await Promise.all(
    entries
      .filter(entry => !entry.name.startsWith('.'))
      .map(async entry => {
        const relativePath = path.posix.join(currentPath, entry.name)
        const fullPath = safePath(relativePath)
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

export default async function Home({ searchParams }: { searchParams: Promise<{ path?: string }> }) {
  const params = await searchParams
  const currentPath = params.path ?? ''
  const files = await getFiles(currentPath)

  const parentPath = currentPath.split('/').slice(0, -1).join('/')

  return (
    <main className='min-h-screen bg-zinc-950 text-zinc-100'>
      <section className='px-3 py-5 sm:px-6 sm:py-10'>
        <div className='overflow-hidden mb-4 sm:mb-8 rounded-3xl border border-white/10 bg-white/5 p-8 ring-1 ring-white/5'>
          <p className='mb-2 text-sm uppercase tracking-[0.3em] text-zinc-400'>myperfume.bg</p>

          <h1 className='text-4xl font-bold tracking-tight'>Downloads</h1>

          <p className='mt-3 text-zinc-400'>Download files directly from our public file area.</p>

          {currentPath && (
            <p className='mt-4 text-sm text-zinc-500'>
              Current folder: <span className='text-zinc-300'>/{currentPath}</span>
            </p>
          )}
        </div>

        <FileBrowser files={files} currentPath={currentPath} parentPath={parentPath} />
      </section>
    </main>
  )
}
