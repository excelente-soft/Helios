import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import ErrorRoute from '@components/ErrorRoute/ErrorRoute'
import Layout from '@components/Layout/Layout'
import ProfileHeader from '@components/ProfileHeader/ProfileHeader'
import UserCourses from '@components/UserCourses/UserCourses'
import { useUser } from '@hooks/useUser'
import { IRole } from '@interfaces/IRole'
import { IAnotherUserProfile } from '@interfaces/IUser'
import { RequestUtility } from '@utils/request'

import CS from '@common.module.scss'

const Profile = () => {
  const router = useRouter()
  const { nickname } = router.query
  const [isFetched, setFetched] = useState(false)
  const [userProfile, setUserProfile] = useState<IAnotherUserProfile>()
  const { user } = useUser()

  useEffect(() => {
    if (router.isReady) {
      const fetchUserProfile = async () => {
        const isAdmin = user && user.role.accessLevel > 1
        const isSelf = user && user.nickname === nickname
        const encodedNickname = encodeURIComponent(nickname?.toString() || '')
        const url = `/profile/${
          isAdmin ? `full/${encodedNickname}` : isSelf ? `me/${encodedNickname}` : encodedNickname
        }`
        const responseFromServer = await RequestUtility.requestToServer<IAnotherUserProfile>(
          'GET',
          url,
          null,
          user?.token
        )
        if (responseFromServer.data) {
          setUserProfile(responseFromServer.data)
        }
        setFetched(true)
      }
      fetchUserProfile()
    }
  }, [router.isReady])

  const changeUserRoleHandler = (newRole: IRole) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, role: newRole })
    }
  }

  const hasUserProfile = isFetched && userProfile
  const isUserProfileNotFound = isFetched && !userProfile
  return (
    <Layout title={`${`${userProfile ? userProfile.nickname : 'Loading user profile'}`}`}>
      {isUserProfileNotFound && <ErrorRoute description="This user could not be found." />}
      {hasUserProfile && (
        <div className={CS.pageContainer}>
          <h2 className={CS.pageTitle}>User profile</h2>
          <ProfileHeader
            userProfile={userProfile}
            targetAccessLevel={user?.role.accessLevel}
            token={user?.token}
            changeUserRole={changeUserRoleHandler}
          />
          <UserCourses userId={userProfile.id} />
        </div>
      )}
    </Layout>
  )
}

export default Profile
