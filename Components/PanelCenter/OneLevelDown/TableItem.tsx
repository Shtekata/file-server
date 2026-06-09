import { useRouter } from 'next/navigation'
import { FileItem } from '@/lib/types'
import { deleteFile } from '@/utils/utils-browser'
import SectorFile from '../TwoLevelsDown/SectorFile'
import SectorSize from '../TwoLevelsDown/SectorSize'
import SectorModified from '../TwoLevelsDown/SectorModified'
import ButtonOpenGet from '../TwoLevelsDown/ButtonOpenGet'

export default function TableItem({ file, canManage }: { file: FileItem; canManage: boolean }) {
  const router = useRouter()

  return (
    <>
      {!canManage ? (
        <div className='grid grid-cols-48 items-center border-b border-zinc-100 py-4 transition hover:bg-zinc-100 dark:border-white/5 dark:hover:bg-white/10 pl-3 pr-2'>
          <SectorFile type={file.type} name={file.name} canManage={canManage} />
          <SectorSize size={file.size} canManage={canManage} />
          <SectorModified modifiedShort={file.modifiedShort} modifiedLong={file.modifiedLong} canManage={canManage} />
          <ButtonOpenGet
            type={file.type}
            href={file.href}
            path={file.path}
            canManage={canManage}
            deleteFile={() => deleteFile(file.path, router)}
          />
        </div>
      ) : (
        <div className='grid grid-cols-48 items-center border-b border-zinc-100 transition hover:bg-zinc-100 dark:border-white/5 dark:hover:bg-white/10 px-2 sm:px-5'>
          <SectorFile type={file.type} name={file.name} canManage={canManage} />
          <SectorSize size={file.size} canManage={canManage} />
          <SectorModified modifiedShort={file.modifiedShort} modifiedLong={file.modifiedLong} canManage={canManage} />
          <ButtonOpenGet
            type={file.type}
            href={file.href}
            path={file.path}
            canManage={canManage}
            deleteFile={() => deleteFile(file.path, router)}
          />
        </div>
      )}
    </>
  )
}
