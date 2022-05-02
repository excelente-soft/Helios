import CoursesManage from '@components/CoursesManage/CoursesManage'
import PrivateLayout from '@components/PrivateLayout/PrivateLayout'

import CS from '@common.module.scss'

const СoursesManagement = () => {
  return (
    <PrivateLayout title="Courses management">
      {(user) => (
        <div className={CS.pageContainer}>
          <h2 className={CS.pageTitle}>Course management</h2>
          <CoursesManage user={user} />
        </div>
      )}
    </PrivateLayout>
  )
}

export default СoursesManagement
