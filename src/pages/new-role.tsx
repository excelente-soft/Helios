import { CreateRole } from '@components/CreateRole/CreateRole'
import { PrivateLayout } from '@components/PrivateLayout/PrivateLayout'

import CS from '@common.module.scss'

const newRole = () => {
  return (
    <PrivateLayout title="Create role">
      {(user) => (
        <div className={CS.pageContainer}>
          <h2 className={CS.pageTitle}>Create role</h2>
          <CreateRole user={user} />
        </div>
      )}
    </PrivateLayout>
  )
}

export default newRole
