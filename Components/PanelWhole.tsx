import PanelTop from './PanelTop'
import PanelCentral from './PanelCentral'

type PanelWhole = {
  user: string | null
  files: any[]
  currentPath: string
  basePath: string
}

export default async function PanelWhole({ user, files, currentPath, basePath }: PanelWhole) {
  const parentPath = currentPath.split('/').slice(0, -1).join('/')

  return (
    <main className='min-h-screen bg-zinc-50 text-zinc-950 transition-colors dark:bg-zinc-950 dark:text-zinc-100'>
      <section className='px-3 py-5 sm:px-6 sm:py-10'>
        <PanelTop user={user} currentPath={currentPath} />
        <PanelCentral files={files} currentPath={currentPath} basePath={basePath} />
      </section>
    </main>
  )
}
