import { Logo } from '../Logo/Logo'
import { Navigation } from '../Navigation/Navigation'
import { Entry } from '../Entry/Entry'

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
