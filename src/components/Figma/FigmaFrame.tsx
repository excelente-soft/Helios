import S from './FigmaFrame.module.scss'

interface IFigmaProps {
  embedUrl: string
}

export const FigmaFrame: React.VFC<IFigmaProps> = ({ embedUrl }) => {
  return (
    <div className={S.figmaContainer}>
      <iframe className={S.figmaFrame} width="100%" height="450" src={embedUrl} allowFullScreen></iframe>
    </div>
  )
}
