/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Layout } from '@components/Layout/Layout'
import { PageLoader } from '@components/PageLoader/PageLoader'
import { useAppSelector } from '@hooks/app'
import { useUser } from '@hooks/useUser'
import { ILayoutProps } from '@interfaces/ILayout'
import { IUser } from '@interfaces/IUser'

interface IProtectedLayoutProps extends ILayoutProps {
  children: (user: IUser) => React.ReactNode
}

export const ProtectedLayout: React.FC<IProtectedLayoutProps> = ({ children, title }) => {
  const user = useAppSelector(({ user }) => user)
  const router = useRouter()
  const { validate } = useUser()

  useEffect(() => {
    const validateUser = async () => {
      const validUser = await validate(user)
      if (!validUser) {
        router.push('/login')
      }
    }

    validateUser()
  }, [])

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user])

  return (
    <>
      {user && <Layout title={title}>{children(user)}</Layout>}
      {!user && <PageLoader />}
    </>
  )
}
