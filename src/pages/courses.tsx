import { ProtectedLayout } from '@components/ProtectedLayout/ProtectedLayout'

import { MyCourses } from '../components/MyCourses/MyCourses'
import CS from '@common.module.scss'

const Courses = () => {
  return (
    <ProtectedLayout title="My courses">
      {(user) => (
        <div className={CS.pageContainer}>
          <h1 className={CS.pageTitle}>MyCourses</h1>
          <MyCourses user={user} />
        </div>
      )}
    </ProtectedLayout>
  )
}

export default Courses
