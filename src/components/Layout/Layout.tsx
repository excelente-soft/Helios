import Head from 'next/head'

import { MemoizedHeader } from '@components/Header/Header'
import { SITE_NAME } from '@constants'

import S from './Layout.module.scss'

interface ILayoutProps {
  title: string
}

const Layout: React.FC<ILayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{`${SITE_NAME} | ${title}`}</title>
      </Head>
      <MemoizedHeader />
      <div className={S.withoutMargin}>{children}</div>
    </>
  )
}

export default Layout
