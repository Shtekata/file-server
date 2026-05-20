import { getFiles } from '@/lib/utilities'
import { getCurrentUser } from '@/lib/session'
import PanelWhole from '@/Components/PanelWhole'

export const dynamic = 'force-dynamic'

export default async function Home({ searchParams }: { searchParams: Promise<{ path?: string }> }) {
  const params = await searchParams
  const currentPath = params.path ?? ''

  const user = await getCurrentUser()
  const files = await getFiles({ userId: '', currentPath })
  // const files = await getFiles({ userId: user?.id || '', currentPath })

  return <PanelWhole user={user?.username || ''} currentPath={currentPath} files={files} />
}
