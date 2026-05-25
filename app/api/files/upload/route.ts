import { Readable } from 'stream'
import { pipeline } from 'stream/promises'
import { createWriteStream } from 'fs'
import fs from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/session'
import safeUserPath from '@/lib/safe-user-path'

function safeFilename(name: string) {
  return path.basename(name).replace(/[<>:"\\|?*\x00-\x1F]/g, '_')
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()

  const file = formData.get('file')
  if (!(file instanceof File)) return NextResponse.json({ error: 'File is required' }, { status: 400 })

  const fileName = safeFilename(file.name)
  if (!fileName) return NextResponse.json({ error: 'Invalid file name' }, { status: 400 })

  const currentPath = String(formData.get('path') ?? '')
  const directory = await safeUserPath(user.id, currentPath)
  const destination = await safeUserPath(user.id, path.posix.join(currentPath, fileName))

  await fs.mkdir(directory, { recursive: true })

  const nodeStream = Readable.fromWeb(file.stream() as any)
  await pipeline(nodeStream, createWriteStream(destination))

  return NextResponse.json({ ok: true })
}
