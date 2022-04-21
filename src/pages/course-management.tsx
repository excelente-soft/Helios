import { CoursesToManage } from '@components/CoursesToManage/CourseManagementList'
import { PrivateLayout } from '@components/PrivateLayout/PrivateLayout'

import CS from '@common.module.scss'

const СourseManagement = () => {
  return (
    <PrivateLayout title="Create course">
      {(user) => (
        <div className={CS.pageContainer}>
          <h2 className={CS.pageTitle}>Course management</h2>
          <CoursesToManage user={user} />
        </div>
      )}
    </PrivateLayout>
  )
}

export default СourseManagement
