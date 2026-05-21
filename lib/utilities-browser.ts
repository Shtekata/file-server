import { FileItem } from '@/Components/PanelCentral/PanelCentral'

export function fileIcon(file: FileItem) {
  if (file.type === 'folder') return '📁'

  const ext = file.name.split('.').pop()?.toLowerCase() || ''

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
