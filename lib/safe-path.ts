import path from 'path'
import { FILES_DIR } from '@/lib/constants'

export default function safePath(relativePath: string) {
  const resolved = path.resolve(FILES_DIR, relativePath)

  const relative = path.relative(FILES_DIR, resolved)
  if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('Invalid path')

  return resolved
}
