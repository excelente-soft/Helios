import S from './Block.module.scss'

interface IBlockProps {
  noMargin?: boolean
}

const Block: React.FC<IBlockProps> = ({ children, noMargin }) => {
  return (
    <div className={`${S.outside} ${noMargin ? S.noMargin : ''}`}>
      <div className={S.block}>{children}</div>
      <div className={S.dottedLine}></div>
    </div>
  )
}

export default Block
