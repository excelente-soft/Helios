import S from './Entry.module.scss'
import CS from '@/globalStyles/common.module.scss'
import Link from 'next/link'

interface IEntryProps {
  type?: 'signup' | 'login'
}

export const Entry: React.VFC<IEntryProps> = ({ type }) => {
  const showSignUpControl = !type || type === 'signup'
  const showLoginControl = !type || type === 'login'
  return (
    <>
      {showSignUpControl && (
        <Link href="/">
          <a className={`${S.entryControl} ${CS.btnPrimary}`}>Sign up</a>
        </Link>
      )}
      {showLoginControl && (
        <Link href="/">
          <a className={`${S.entryControl} ${CS.btnSecondary}`}>Log in</a>
        </Link>
      )}
    </>
  )
}
