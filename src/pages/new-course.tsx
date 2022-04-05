import type { NextPage } from 'next'

import { CreateCourse } from '@components/CreateCourse/CreateCourse'
import { PrivateLayout } from '@components/PrivateLayout/PrivateLayout'

import CS from '@common.module.scss'

const newCourse: NextPage = () => {
  return (
    <PrivateLayout title="Create course">
      {() => (
        <div className={CS.pageContainer}>
          <h2 className={CS.pageTitle}>Create course</h2>
          <CreateCourse />
        </div>
      )}
    </PrivateLayout>
  )
}

export default newCourse
