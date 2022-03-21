import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Layout } from '@components/Layout/Layout'
import { useUser } from '@hooks/useUser'

interface IProtectedLayoutProps {
  title: string
}

export const ProtectedLayout: React.FC<IProtectedLayoutProps> = ({ children, title }) => {
  const router = useRouter()
  const { user, loading } = useUser()

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login')
    }
  }, [user])

  return <Layout title={title}>{children}</Layout>
}
