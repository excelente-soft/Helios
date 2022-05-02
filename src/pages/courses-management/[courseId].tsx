import CourseManage from '@components/CourseManage/CourseManage'
import PrivateLayout from '@components/PrivateLayout/PrivateLayout'

import CS from '@common.module.scss'

const CoursesManagement = () => {
  return (
    <PrivateLayout title={'Course manage'}>
      {(user) => (
        <div className={CS.pageContainer}>
          <CourseManage user={user} />
        </div>
      )}
    </PrivateLayout>
  )
}

export default CoursesManagement
