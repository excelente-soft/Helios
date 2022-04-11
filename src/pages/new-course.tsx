import { CreateCourse } from '@components/CreateCourse/CreateCourse'
import { PrivateLayout } from '@components/PrivateLayout/PrivateLayout'

import CS from '@common.module.scss'

const newCourse = () => {
  return (
    <PrivateLayout title="Create course">
      {(user) => (
        <div className={CS.pageContainer}>
          <h2 className={CS.pageTitle}>Create course</h2>
          <CreateCourse user={user} />
        </div>
      )}
    </PrivateLayout>
  )
}

export default newCourse
