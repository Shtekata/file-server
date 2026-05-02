import fs from 'fs/promises'
import path from 'path'

export const dynamic = 'force-dynamic'

const FILES_DIR = process.env.FILES_DIR || '/srv/files'

type FileItem = {
  name: string
  href: string
  size: string
  modifiedLong: string
  modifiedShort: string
  type: 'folder' | 'file'
}

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

function fileIcon(name: string, type: 'folder' | 'file') {
  if (type === 'folder') return '📁'

  const ext = path.extname(name).toLowerCase()

  if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext)) return '🖼️'
  if (['.pdf'].includes(ext)) return '📕'
  if (['.zip', '.rar', '.7z', '.tar', '.gz'].includes(ext)) return '🗜️'
  if (['.xls', '.xlsx', '.csv'].includes(ext)) return '📊'
  if (['.doc', '.docx'].includes(ext)) return '📄'
  if (['.mp4', '.mkv', '.avi', '.mov'].includes(ext)) return '🎬'
  if (['.mp3', '.wav', '.flac'].includes(ext)) return '🎵'

  return '📦'
}

async function getFiles(): Promise<FileItem[]> {
  const entries = await fs.readdir(FILES_DIR, { withFileTypes: true })

  const items = await Promise.all(
    entries
      .filter(entry => !entry.name.startsWith('.'))
      .map(async entry => {
        const fullPath = path.join(FILES_DIR, entry.name)
        const stat = await fs.stat(fullPath)
        const type: 'folder' | 'file' = entry.isDirectory() ? 'folder' : 'file'

        return {
          name: entry.name,
          href: entry.isDirectory() ? '#' : `/download/${encodeURIComponent(entry.name)}`,
          size: entry.isDirectory() ? 'Folder' : formatBytes(stat.size),
          modifiedLong: stat.mtime.toLocaleDateString('bg-BG', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          }),

          modifiedShort: stat.mtime
            .toLocaleDateString('bg-BG', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
            })
            .replace(/\s?г\./, ''),
          type,
        }
      }),
  )

  return items.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1
    return a.name.localeCompare(b.name)
  })
}

export default async function Home() {
  const files = await getFiles()

  return (
    <main className='min-h-screen bg-zinc-950 text-zinc-100'>
      <section className='px-3 py-5 sm:px-6 sm:py-10'>
        <div className='overflow-hidden mb-8 rounded-3xl border border-white/10 bg-white/5 p-8 ring-1 ring-white/5'>
          <p className='mb-2 text-sm uppercase tracking-[0.3em] text-zinc-400'>myperfume.bg</p>
          <h1 className='text-4xl font-bold tracking-tight'>Downloads</h1>
          <p className='mt-3 text-zinc-400'>Download files directly from our public file area.</p>
        </div>

        <div className='overflow-hidden rounded-3xl border border-white/10 bg-white/5 ring-1 ring-white/5'>
          <div className='grid grid-cols-24 border-b border-white/10 px-5 py-3 text-sm text-zinc-400'>
            <div className='col-span-9 sm:col-span-15'>Name</div>
            <div className='col-span-5 sm:col-span-3'>Size</div>
            <div className='col-span-5 sm:col-span-4'>Modified</div>
            <div className='col-span-5 sm:col-span-2 text-right'>Action</div>
          </div>

          {files.length === 0 ? (
            <div className='px-5 py-10 text-center text-zinc-400'>No files found in /srv/files.</div>
          ) : (
            files.map(file => (
              <div
                key={file.name}
                className='grid grid-cols-24 items-center border-b border-white/5 px-5 py-4 transition hover:bg-white/10'
              >
                <div className='col-span-9 sm:col-span-15 flex items-center gap-3 font-medium'>
                  <span className='text-2xl'>{fileIcon(file.name, file.type)}</span>
                  <span className='truncate pr-3'>{file.name}</span>
                </div>

                <div className='col-span-5 sm:col-span-3 text-sm text-zinc-400'>{file.size}</div>

                <div className='col-span-5 sm:col-span-4 text-sm text-zinc-400'>
                  <span className='sm:hidden'>{file.modifiedShort}</span>
                  <span className='hidden sm:inline'>{file.modifiedLong}</span>
                </div>

                <div className='col-span-5 sm:col-span-2 text-right'>
                  {file.type === 'file' ? (
                    <a
                      href={file.href}
                      className='rounded-xl bg-zinc-100 px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-semibold text-zinc-950 transition hover:bg-white'
                    >
                      Get
                    </a>
                  ) : (
                    <span className='text-zinc-500'>—</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
