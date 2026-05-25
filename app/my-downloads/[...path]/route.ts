import fs from 'fs/promises'
import { Readable } from 'stream'
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/session'
import safeUserPath from '@/lib/safe-user-path'
import { encodeDownloadPath } from '@/utils/utils-server'

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { path: pathParts } = await params
  const relativePath = pathParts.join('/')

  const filePath = await safeUserPath(user.id, relativePath)

  try {
    const stat = await fs.stat(filePath)
    if (!stat.isFile()) return NextResponse.json({ error: 'The specified path is a directory !!! :)' }, { status: 404 })
  } catch (err: any) {
    if (err.code === 'ENOENT' || err.code === 'ENOTDIR')
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    throw err
  }

  const fileName = pathParts.at(-1) || 'download'

  if (process.env.NODE_ENV === 'development') {
    const fileHandle = await fs.open(filePath).then(nodeStream => nodeStream.createReadStream())
    const webStream = Readable.toWeb(fileHandle) as ReadableStream
    return new NextResponse(webStream, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`,
      },
    })
  }

  return new NextResponse(null, {
    headers: {
      'X-Accel-Redirect': `/protected-downloads/${encodeURIComponent(user.id)}/${encodeDownloadPath(relativePath)}`,
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`,
    },
  })
}
