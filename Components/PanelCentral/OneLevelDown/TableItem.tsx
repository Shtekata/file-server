import { FileItem } from '@/lib/types'
import SectorFile from '../TwoLevelsDown/SectorFile'
import SectorSize from '../TwoLevelsDown/SectorSize'
import SectorModified from '../TwoLevelsDown/SectorModified'
import ButtonOpenGet from '../TwoLevelsDown/ButtonOpenGet'

export default function TableItem({ file }: { file: FileItem }) {
  return (
    <div className='grid grid-cols-24 items-center border-b border-zinc-100 px-5 py-4 transition hover:bg-zinc-100 dark:border-white/5 dark:hover:bg-white/10'>
      <SectorFile type={file.type} name={file.name} />
      <SectorSize size={file.size} />
      <SectorModified modifiedShort={file.modifiedShort} modifiedLong={file.modifiedLong} />
      <ButtonOpenGet type={file.type} href={file.href} />
    </div>
  )
}
