import { memo } from 'react'

import Entry from '@components/Entry/Entry'
import Logo from '@components/Logo/Logo'
import MiniProfile from '@components/MiniProfile/MiniProfile'
import { MemoizedNavigation } from '@components/Navigation/Navigation'
import { useUser } from '@hooks/useUser'

import S from './Header.module.scss'
import CS from '@common.module.scss'

const Header = () => {
  const { user } = useUser()

  return (
    <header className={S.header}>
      <div className={`${S.container} ${CS.pageContainer}`}>
        <div className={S.leftContent}>
          <Logo />
          <MemoizedNavigation user={user} />
        </div>
        <div className={S.rightContent}>
          {user && <MiniProfile user={user} />}
          {!user && <Entry />}
        </div>
      </div>
    </header>
  )
}

export const MemoizedHeader = memo(Header)
