import Link from 'next/link'
import { Layout } from 'src/components/Layout/Layout'

import S from '../styles/Custom404.module.scss'
import CS from '@/globalStyles/common.module.scss'

const Custom404 = () => {
  return (
    <Layout title="404 | This page could not be found.">
      <div className={S.errorContainer}>
        <h2 className={S.status}>404</h2>
        <p className={S.description}>This page could not be found.</p>
        <Link href="/">
          <a className={`${CS.btnSecondary} ${S.back}`}>Back to save place</a>
        </Link>
      </div>
    </Layout>
  )
}

export default Custom404
