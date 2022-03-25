import { ProtectedLayout } from '@components/ProtectedLayout/ProtectedLayout'

const Settings = () => {
  return (
    <ProtectedLayout title="Settings">
      {(user) => (
        <div>
          <h1>{user.name}</h1>
          <h1>{user.name}</h1>
          <h1>{user.name}</h1>
          <h1>{user.name}</h1>
          <h1>{user.name}</h1>
          <h1>{user.name}</h1>
        </div>
      )}
    </ProtectedLayout>
  )
}

export default Settings
