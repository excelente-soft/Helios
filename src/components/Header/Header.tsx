import { Entry } from '@components/Entry/Entry'
import { Logo } from '@components/Logo/Logo'
import { Navigation } from '@components/Navigation/Navigation'

import S from './Header.module.scss'
import CS from '@common.module.scss'

export const Header = () => {
  return (
    <header className={S.header}>
      <div className={`${S.container} ${CS.pageContainer}`}>
        <div className={S.leftContent}>
          <Logo />
          <Navigation />
        </div>
        <div className={S.rightContent}>
          <Entry />
        </div>
      </div>
    </header>
  )
}
