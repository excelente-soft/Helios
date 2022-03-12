import Link from 'next/link'
import { SITE_NAME } from 'src/constants'

import S from './Logo.module.scss'

export const Logo = () => {
  return (
    <Link href="/">
      <a className={S.logoContainer}>
        <span className={S.logoImage}></span>
        <h1 className={S.siteName}>{SITE_NAME}</h1>
      </a>
    </Link>
  )
}
