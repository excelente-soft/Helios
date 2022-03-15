import S from './EntryControl.module.scss'

interface IEntryControlProps {
  title: string
}

export const EntryControl: React.FC<IEntryControlProps> = ({ children, title }) => {
  return (
    <div className={S.centered}>
      <div className={S.content}>
        <h2 className={S.entryTitle}>{title}</h2>
        {children}
      </div>
    </div>
  )
}
