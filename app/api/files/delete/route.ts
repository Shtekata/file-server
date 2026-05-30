import fs from 'fs/promises'
import type { Stats } from 'fs'
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/session'
import safeUserPath from '@/lib/safe-user-path'

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { path: relativePath } = await request.json()
  if (!relativePath) return NextResponse.json({ error: 'Path is required' }, { status: 400 })

  const targetPath = await safeUserPath(user.id, relativePath)
  let stat: Stats
  try {
    stat = await fs.stat(targetPath)
  } catch (err) {
    return NextResponse.json({ error: 'Folder or file not found', err }, { status: 404 })
  }

  if (stat.isDirectory()) await fs.rm(targetPath, { recursive: true, force: true })
  else await fs.unlink(targetPath)

  return NextResponse.json({ ok: true })
}
