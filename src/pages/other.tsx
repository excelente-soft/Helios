import { IWithAdminProps, withAdmin } from '@HOC/withAdmin'
import CreateCourse from '@components/CreateCourse/CreateCourse'
import CreateRole from '@components/CreateRole/CreateRole'

import CS from '@common.module.scss'

const Other: React.VFC<IWithAdminProps> = ({ user }) => {
  return (
    <div className={CS.pageContainer}>
      <h2 className={CS.pageTitle}>Other features</h2>
      <CreateCourse user={user} />
      <CreateRole user={user} />
    </div>
  )
}
export default withAdmin(Other, 'Other features')
