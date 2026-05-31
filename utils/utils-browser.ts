import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export function fileIcon({ type, name }: { type: 'folder' | 'file'; name: string }) {
  if (type === 'folder') return '📁'

  const ext = name.split('.').pop()?.toLowerCase() || ''

  if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext)) return '🖼️'
  if (['pdf'].includes(ext)) return '📕'
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return '🗜️'
  if (['xls', 'xlsx', 'csv'].includes(ext)) return '📊'
  if (['txt'].includes(ext)) return '📝'
  if (['doc', 'docx'].includes(ext)) return '📄'
  if (['ppt', 'pptx'].includes(ext)) return '📽️'
  if (['mp4', 'mkv', 'avi', 'mov'].includes(ext)) return '🎬'
  if (['mp3', 'wav', 'flac'].includes(ext)) return '🎵'

  return '📦'
}

export function encodePath(value: string) {
  return value
    .split('/')
    .filter(Boolean)
    .map(part => encodeURIComponent(part))
    .join('/')
}

export async function deleteFile(path: string, router: AppRouterInstance) {
  const confirmed = window.confirm('Delete this item?')
  if (!confirmed) return

  const response = await fetch('/api/files/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path }),
  })
  if (!response.ok) {
    alert('Failed to delete')
    return
  }

  router.refresh()
}
