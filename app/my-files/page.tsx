import FileBrowser from '../Components/CentralPanel'
import ThemeToggle from '../Components/ThemeToggle'
import { getFiles } from '@/lib/utilities'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function MyFilesPage({ searchParams }: { searchParams: Promise<{ path?: string }> }) {
  const user = await getCurrentUser()

  if (!user) redirect('/')
}
