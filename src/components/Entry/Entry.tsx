import S from './Entry.module.scss'
import CS from '@/globalStyles/common.module.scss'

interface IEntryProps {
  type?: 'signup' | 'login'
}

export const Entry: React.VFC<IEntryProps> = ({ type }) => {
  const showSignUpControl = !type || type === 'signup'
  const showLoginControl = !type || type === 'login'
  return (
    <>
      {showSignUpControl && <button className={`${S.entryControl} ${CS.btnPrimary}`}>Sign up</button>}
      {showLoginControl && <button className={`${S.entryControl} ${CS.btnSecondary}`}>Log in</button>}
    </>
  )
}
