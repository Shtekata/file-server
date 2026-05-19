import fs from 'fs/promises'
import path from 'path'
import { USER_FILES_DIR } from '@/lib/config'

export function getUserRoot(userId: string) {
  const userFilesDir = USER_FILES_DIR
  if (!userFilesDir) throw new Error('USER_FILES_DIR is not set')

  return path.resolve(userFilesDir, userId)
}

export async function ensureUserRoot(userId: string) {
  const userRoot = getUserRoot(userId)
  await fs.mkdir(userRoot, { recursive: true })
  return userRoot
}

export default async function safeUserPath(userId: string, relativePath: string) {
  const userRoot = await ensureUserRoot(userId)
  const resolved = path.resolve(userRoot, relativePath)

  const relative = path.relative(userRoot, resolved)
  if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Invalid path')

  return resolved
}
