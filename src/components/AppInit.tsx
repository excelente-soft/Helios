import { useEffect } from 'react'

import { useUser } from '@hooks/useUser'

export const AppInit: React.FC = ({ children }) => {
  const { restoreFromStorage } = useUser()

  useEffect(() => {
    restoreFromStorage()
  }, [])

  return <>{children}</>
}
