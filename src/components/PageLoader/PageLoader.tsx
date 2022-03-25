import S from './PageLoader.module.scss'

export const PageLoader = () => {
  return (
    <div className={S.loaderContainer}>
      <div className={S.pulsedLogo}></div>
    </div>
  )
}
