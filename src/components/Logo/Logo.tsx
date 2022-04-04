import Link from 'next/link'

import { SITE_NAME } from '@constants'

import S from './Logo.module.scss'

export const Logo = () => {
  return (
    <Link href="/">
      <a className={S.logoContainer}>
        <span className={S.logoImage}></span>
        <h1 className={S.siteName} translate="no">
          {SITE_NAME}
        </h1>
      </a>
    </Link>
  )
}
