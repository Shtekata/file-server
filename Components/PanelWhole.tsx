import PanelTop from './PanelTop/PanelTop'
import PanelCenter from './PanelCenter/PanelCenter'
import PanelUpload from '@/Components/PanelUpload/PanelUpload'
import { PanelWholeProps } from '@/lib/types'

export default async function PanelWhole({
  userId = null,
  username = null,
  files,
  currentPath,
  basePath,
}: PanelWholeProps) {
  return (
    <main className='min-h-screen bg-zinc-50 text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-zinc-100'>
      <section className='px-3 py-5 sm:px-6 sm:py-10'>
        <PanelTop username={username} currentPath={currentPath} canManage={!!userId} />
        <PanelCenter files={files} currentPath={currentPath} basePath={basePath} canManage={!!userId} />
        {userId && <PanelUpload currentPath={currentPath} userId={userId} />}
      </section>
    </main>
  )
}
