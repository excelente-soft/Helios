import S from './PageLoader.module.scss'

const PageLoader = () => {
  return (
    <div className={S.loaderContainer}>
      <div className={S.pulsedLogo}></div>
    </div>
  )
}

export default PageLoader
