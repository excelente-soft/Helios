import S from './Table.module.scss'
import CS from '@common.module.scss'

interface ITableProps {
  noPadding?: boolean
}

const Table: React.FC<ITableProps> = ({ children, noPadding = false }) => {
  return <div className={`${CS.pageContainer} ${S.table} ${noPadding ? S.noPadding : ''}`}>{children}</div>
}

export default Table
