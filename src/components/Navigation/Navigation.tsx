import Link from 'next/link'

import S from './Navigation.module.scss'

export const Navigation = () => {
  return (
    <nav>
      <ul className={S.routesList}>
        <li>
          <Link href="/404">
            <a className={S.routeLink}>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a className={S.routeLink}>Catalog</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
