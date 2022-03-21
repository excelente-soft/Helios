import type { NextPage } from 'next'
import { SITE_NAME } from 'src/constants'

import { Layout } from '@components/Layout/Layout'

const Home: NextPage = () => {
  return <Layout title={SITE_NAME}></Layout>
}

export default Home
