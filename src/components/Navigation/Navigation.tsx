import Link from 'next/link'
import { memo } from 'react'

import { MENTOR_ROUTES, PUBLIC_ROUTES } from '@constants'
import { IUser } from '@interfaces/IUser'

import S from './Navigation.module.scss'

interface INavigationProps {
  user: IUser | null
}

const Navigation: React.VFC<INavigationProps> = ({ user }) => {
  const isPrivilegedUser = user && user.role.accessLevel > 0
  return (
    <nav>
      <ul className={S.routesList}>
        {PUBLIC_ROUTES.map(({ name, path }) => (
          <li key={name}>
            <Link href={path}>
              <a className={S.routeLink}>{name}</a>
            </Link>
          </li>
        ))}
        {isPrivilegedUser &&
          MENTOR_ROUTES.map(({ name, path }) => (
            <li key={name}>
              <Link href={path}>
                <a className={S.routeLink}>{name}</a>
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  )
}

export const MemoizedNavigation = memo(Navigation)
