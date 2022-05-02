import CreateCourse from '@components/CreateCourse/CreateCourse'
import CreateRole from '@components/CreateRole/CreateRole'
import PrivateLayout from '@components/PrivateLayout/PrivateLayout'

import CS from '@common.module.scss'

const Other = () => {
  return (
    <PrivateLayout title="Other features">
      {(user) => (
        <div className={CS.pageContainer}>
          <h2 className={CS.pageTitle}>Other features</h2>
          <CreateCourse user={user} />
          <CreateRole user={user} />
        </div>
      )}
    </PrivateLayout>
  )
}
export default Other
