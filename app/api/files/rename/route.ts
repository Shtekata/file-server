import fs from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/session'
import safeUserPath from '@/lib/safe-user-path'

function safeFilename(name: string) {
  return path
    .basename(name)
    .replace(/[<>:"\\|?*\x00-\x1F]/g, '_')
    .trim()
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { path: oldPath, name } = await request.json()
  if (!oldPath || !name) return NextResponse.json({ error: 'Path and name are required' }, { status: 400 })

  const newName = safeFilename(name)
  if (!newName) return NextResponse.json({ error: 'Invalid name' }, { status: 400 })

  const parentPath = path.posix.dirname(oldPath) === '.' ? '' : path.posix.dirname(oldPath)
}
