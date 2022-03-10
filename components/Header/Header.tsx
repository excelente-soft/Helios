import { Logo } from 'components/Logo/Logo'

import S from './Header.module.scss'
import CS from '@/globalStyles/common.module.scss'

export const Header = () => {
  return (
    <header className={S.header}>
      <div className={CS.pageContainer}>
        <Logo />
      </div>
    </header>
  )
}
