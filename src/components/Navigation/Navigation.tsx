import Link from 'next/link'

import { IUser } from '@interfaces/IUser'

import { PROTECTED_ROUTES, PUBLIC_ROUTES } from '../../constants'
import S from './Navigation.module.scss'

interface INavigationProps {
  user: IUser | null
}

export const Navigation: React.VFC<INavigationProps> = ({ user }) => {
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
        {user &&
          PROTECTED_ROUTES.map(({ name, path }) => (
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
