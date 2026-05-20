import { redirect } from 'next/navigation'
import { getFiles } from '@/lib/utilities'
import { getCurrentUser } from '@/lib/session'
import PanelWhole from '@/Components/PanelWhole'

export const dynamic = 'force-dynamic'

export default async function MyFiles({ searchParams }: { searchParams: Promise<{ path?: string }> }) {
  const user = await getCurrentUser()
  if (!user) redirect('/login')

  const params = await searchParams
  const currentPath = params.path ?? ''
  const files = await getFiles({ userId: user?.id || null, currentPath })

  return <PanelWhole user={user?.username || null} currentPath={currentPath} basePath='/my-files' files={files} />
}
