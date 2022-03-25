/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { PageLoader } from '@components/PageLoader/PageLoader'
import { useUser } from '@hooks/useUser'

export const AppInit: React.FC = ({ children }) => {
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
    </>
  )
}
