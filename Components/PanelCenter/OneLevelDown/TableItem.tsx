import { useRouter } from 'next/navigation'
import { FileItem } from '@/lib/types'
import { deleteFile } from '@/utils/utils-browser'
import SectorFile from '../TwoLevelsDown/SectorFile'
import SectorSize from '../TwoLevelsDown/SectorSize'
import SectorModified from '../TwoLevelsDown/SectorModified'
import SectorButtons from '../TwoLevelsDown/SectorButtons'

export default function TableItem({ file, canManage }: { file: FileItem; canManage: boolean }) {
  const router = useRouter()

  return (
    <div className='grid grid-cols-48 items-center border-b border-zinc-100 py-4 px-2 md:px-3 transition hover:bg-zinc-100 dark:border-white/5 dark:hover:bg-white/10'>
      <SectorFile type={file.type} name={file.name} canManage={canManage} />
      <SectorSize size={file.size} canManage={canManage} />
      <SectorModified modifiedShort={file.modifiedShort} modifiedLong={file.modifiedLong} canManage={canManage} />
      <SectorButtons
        type={file.type}
        href={file.href}
        path={file.path}
        canManage={canManage}
        deleteFile={() => deleteFile(file.path, router)}
      />
    </div>
  )
}
