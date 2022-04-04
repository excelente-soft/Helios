import { ChangeAvatar } from '@components/ChangeAvatar/ChangeAvatar'
import { ChangeEmail } from '@components/ChangeEmail/ChangeEmail'
import { ChangePassword } from '@components/ChangePassword/ChangePassword'
import { ChangeProfile } from '@components/ChangeProfile/ChangeProfile'
import { ChangeProfileType } from '@components/ChangeType/ChangeProfileType'
import { ProtectedLayout } from '@components/ProtectedLayout/ProtectedLayout'

import CS from '@common.module.scss'

const Settings = () => {
  return (
    <ProtectedLayout title="Settings">
      {(user) => (
        <div className={CS.pageContainer}>
          <h2 className={CS.pageTitle}>Account settings</h2>
          <ChangeProfile user={user} />
          <ChangeAvatar user={user} />
          <ChangeEmail user={user} />
          <ChangePassword token={user.token} />
          <ChangeProfileType user={user} />
        </div>
      )}
    </ProtectedLayout>
  )
}

export default Settings
