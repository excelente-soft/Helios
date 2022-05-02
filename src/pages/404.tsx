import ErrorRoute from '@components/ErrorRoute/ErrorRoute'
import Layout from '@components/Layout/Layout'

const Custom404 = () => {
  return (
    <Layout title="This page could not be found.">
      <ErrorRoute />
    </Layout>
  )
}

export default Custom404
