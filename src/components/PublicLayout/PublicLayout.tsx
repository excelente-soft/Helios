/* eslint-disable react-hooks/exhaustive-deps */
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
  }, [user])

  return <>{!user && <Layout title={title}>{children}</Layout>}</>
}
