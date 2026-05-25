import { getFiles } from '@/utils/utils-server'
import PanelWhole from '../Components/PanelWhole'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Home({ searchParams }: { searchParams: Promise<{ path?: string }> }) {
  const params = await searchParams
  const currentPath = params.path ?? ''
  try {
    const files = await getFiles({ userId: null, currentPath })
    return <PanelWhole user={null} currentPath={currentPath} basePath='/' files={files} />
  } catch (err: any) {
    if (err.message === 'Not found') return notFound()
    if (err.message === 'Not a directory')
      return (
        <div className='p-10 text-5xl text-center text-shadow-cyan-500 text-emerald-600'>
          The specified path is not a directory !!! :)
        </div>
      )
    throw err
  }
}
