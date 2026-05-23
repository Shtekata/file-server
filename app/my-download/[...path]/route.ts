import fs from 'fs'
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/session'
import safeUserPath from '@/lib/safe-user-path'

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { path } = await params
  const relativePath = path.join('/')

  const filePath = await safeUserPath(user.id, relativePath)

  const stat = await fs.promises.stat(filePath)
  if (!stat.isFile()) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const file = await fs.promises.readFile(filePath)
  const fileName = path.at(-1) || 'download'

  return new NextResponse(file, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
      'Content-Length': String(stat.size),
    },
  })
}
