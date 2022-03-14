import Link from 'next/link'
import { useRouter } from 'next/router'

import S from './Entry.module.scss'
import CS from '@common.module.scss'

export const Entry = () => {
  const router = useRouter()
  const { pathname } = router
  const showSignUpControl = pathname !== '/signup'
  const showLoginControl = pathname !== '/login'
  return (
    <>
      {showSignUpControl && (
        <Link href="/signup">
          <a className={`${S.entryControl} ${CS.btnPrimary}`}>Sign up</a>
        </Link>
      )}
      {showLoginControl && (
        <Link href="/login">
          <a className={`${S.entryControl} ${CS.btnSecondary}`}>Log in</a>
        </Link>
      )}
    </>
  )
}
