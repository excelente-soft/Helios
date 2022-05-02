/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { MemoizedModal } from '@components/Modal/Modal'
import PageLoader from '@components/PageLoader/PageLoader'
import { useUser } from '@hooks/useUser'

const AppInit: React.FC = ({ children }) => {
  const { restoreFromStorage } = useUser()
  const [restored, setRestored] = useState(false)

  useEffect(() => {
    const appInit = async () => {
      await restoreFromStorage()
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
