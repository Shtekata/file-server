import { getFiles } from '@/lib/utilities'
import PanelWhole from '../Components/PanelWhole'

export const dynamic = 'force-dynamic'

export default async function Home({ searchParams }: { searchParams: Promise<{ path?: string }> }) {
  const params = await searchParams
  const currentPath = params.path ?? ''
  const files = await getFiles({ userId: null, currentPath })

  return <PanelWhole user={null} currentPath={currentPath} files={files} />
}
