import fs from 'fs/promises'
import { Readable } from 'stream'
import { NextResponse } from 'next/server'
import safePath from '@/lib/safe-path'
import { encodeDownloadPath } from '@/utils/utils-server'

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: pathParts } = await params
  const relativePath = pathParts.join('/')

  const filePath = safePath(relativePath)

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
      'X-Accel-Redirect': `/downloads/${encodeDownloadPath(relativePath)}`,
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(fileName)}`,
    },
  })
}
