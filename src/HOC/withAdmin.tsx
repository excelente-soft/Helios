/* eslint-disable react/display-name */
import { useRouter } from 'next/router'
import { VFC, useEffect } from 'react'

import Layout from '@components/Layout/Layout'
import PageLoader from '@components/PageLoader/PageLoader'
import { useUser } from '@hooks/useUser'
import { IUser } from '@interfaces/IUser'

export interface IWithAdminProps {
  user: IUser
}

export function withAdmin<T>(Component: VFC<T>, title: string, accessLevel = 2) {
  return (props: T & IWithAdminProps) => {
    const router = useRouter()
    const { validate, user } = useUser()

    useEffect(() => {
      const validateUser = async () => {
        const validUser = await validate(user)
        if (!validUser) {
          router.push('/login')
        } else if (validUser.role.accessLevel < accessLevel) {
          router.push('/')
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
        {user && (
          <Layout title={title}>
            <Component {...props} user={user} />
          </Layout>
        )}
        {!user && <PageLoader />}
      </>
    )
  }
}
