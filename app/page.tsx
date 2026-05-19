import CentralPanel from './Components/CentralPanel'
import { getFiles } from '@/lib/utilities'
import TopPanel from './Components/TopPanel'
import { getCurrentUser } from '@/lib/session'

export const dynamic = 'force-dynamic'

export default async function Home({ searchParams }: { searchParams: Promise<{ path?: string }> }) {
  const user = await getCurrentUser()

  const params = await searchParams
  const currentPath = params.path ?? ''
  // const files = await getFiles({ userId: user?.id || '', currentPath })
  const files = await getFiles({ userId: '', currentPath })

  const parentPath = currentPath.split('/').slice(0, -1).join('/')

  return (
    <main className='min-h-screen bg-zinc-50 text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-zinc-100'>
      <section className='px-3 py-5 sm:px-6 sm:py-10'>
        <TopPanel user={user?.username || ''} currentPath={currentPath} />

        <CentralPanel files={files} currentPath={currentPath} parentPath={parentPath} />
      </section>
    </main>
  )
}
