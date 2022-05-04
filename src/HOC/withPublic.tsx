/* eslint-disable react/display-name */
import { useRouter } from 'next/router'
import { VFC, useEffect } from 'react'

import Layout from '@components/Layout/Layout'
import { useAppSelector } from '@hooks/app'

export function withPublic<T>(Component: VFC<T>, title: string) {
  return (props: T) => {
    const user = useAppSelector((state) => state.user)
    const router = useRouter()

    useEffect(() => {
      if (user) {
        router.push('/')
      }
    }, [user])

    return (
      <>
        {!user && (
          <Layout title={title}>
            <Component {...props} />
          </Layout>
        )}
      </>
    )
  }
}
