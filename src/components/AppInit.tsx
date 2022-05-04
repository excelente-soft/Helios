/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { MemoizedModal } from '@components/Modal/Modal'
import PageLoader from '@components/PageLoader/PageLoader'
import { useAppDispatch } from '@hooks/app'
import { useAuth } from '@hooks/useAuth'
import { setUser } from '@store/user/userSlice'

const AppInit: React.FC = ({ children }) => {
  const { restoreFromStorage } = useAuth()
  const [restored, setRestored] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const appInit = async () => {
      const restoredUser = await restoreFromStorage()
      if (restoredUser) {
        dispatch(setUser(restoredUser))
      }
      setRestored(true)
    }

    appInit()
  }, [])

  return (
    <>
      {restored && <>{children}</>}
      {!restored && <PageLoader />}
      <MemoizedModal />
    </>
  )
}

export default AppInit
