import Head from 'next/head'

import { Header } from '@components/Header/Header'

interface ILayoutProps {
  title: string
}

export const Layout: React.FC<ILayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {children}
    </>
  )
}
