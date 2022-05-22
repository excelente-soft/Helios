import React from 'react'

import HomeHeader from '@components/HomeHeader/HomeHeader'
import Layout from '@components/Layout/Layout'
import LearningProcess from '@components/LearningProcess/LearningProcess'

const Home = () => {
  return (
    <Layout title="Home">
      <HomeHeader />
      <LearningProcess />
    </Layout>
  )
}

export default Home
