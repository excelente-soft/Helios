import Link from 'next/link'

import S from './Logo.module.scss'

export const Logo = () => {
  return (
    <Link href="/">
      <a className={S.logoContainer}>
        <span className={S.logoImage}></span>
        <h1 className={S.siteName}>Helios</h1>
      </a>
    </Link>
  )
}
