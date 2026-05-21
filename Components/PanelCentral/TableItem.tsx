import { FileItem } from './PanelCentral'
import SectorFile from './OneLevelDown/SectorFile'
import SectorSize from './OneLevelDown/SectorSize'
import SectorModified from './OneLevelDown/SectorModified'
import ButtonOpenGet from './OneLevelDown/ButtonOpenGet'

export default function TableItem({ file }: { file: FileItem }) {
  return (
    <div
      key={file.path}
      className='grid grid-cols-24 items-center border-b border-zinc-100 px-5 py-4 transition hover:bg-zinc-100 dark:border-white/5 dark:hover:bg-white/10'
    >
      <SectorFile type={file.type} name={file.name} />
      <SectorSize size={file.size} />
      <SectorModified modifiedShort={file.modifiedShort} modifiedLong={file.modifiedLong} />
      <ButtonOpenGet type={file.type} href={file.href} />
    </div>
  )
}
