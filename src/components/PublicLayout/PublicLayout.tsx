import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Layout } from '@components/Layout/Layout'
import { useAppSelector } from '@hooks/app'
import { ILayoutProps } from '@interfaces/ILayout'

export const PublicLayout: React.FC<ILayoutProps> = ({ children, title }) => {
  const user = useAppSelector(({ user }) => user)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  return <>{!user && <Layout title={title}>{children}</Layout>}</>
}
