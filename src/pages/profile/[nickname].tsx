/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Block from '@components/Block/Block'
import ErrorRoute from '@components/ErrorRoute/ErrorRoute'
import Layout from '@components/Layout/Layout'
import { useUser } from '@hooks/useUser'
import { IAnotherUserProfile } from '@interfaces/IUser'
import { RequestUtility } from '@utils/request'

import CS from '@common.module.scss'
import S from '@styles/Profile.module.scss'

const Profile = () => {
  const router = useRouter()
  const { nickname } = router.query
  const [isFetched, setFetched] = useState(false)
  const [userProfile, setUserProfile] = useState<IAnotherUserProfile>()
  const { user } = useUser()

  useEffect(() => {
    const fetchTest = async () => {
      const responseFromServer = await RequestUtility.requestToServer<IAnotherUserProfile>(
        'GET',
        `/profile/${nickname}`,
        null,
        user ? user.token : undefined
      )
      if (responseFromServer.data) {
        setUserProfile(responseFromServer.data)
      }
      setFetched(true)
    }
    fetchTest()
  }, [router.isReady])

  return (
    <Layout title={`${`${userProfile ? userProfile.name : '404'}` || 'Loading user profile'}`}>
      {isFetched && !userProfile && <ErrorRoute description="This user could not be found." />}
      {isFetched && userProfile && (
        <div className={CS.pageContainer}>
          <h2 className={CS.pageTitle}>User profile</h2>
          <Block noMargin>
            <div className={S.profileInfo}>
              <Image
                src={userProfile.avatar}
                alt={`${userProfile.nickname}'s big avatar`}
                className={S.bigAvatar}
                layout="fixed"
                height={248}
                width={248}
                objectFit="cover"
              />
              <div className={S.basicInfo}>
                <h2 className={S.nickname}>{userProfile.nickname}</h2>
                <div className={S.fullName}>
                  <h3 className={S.name}>{userProfile.name}</h3>
                  <h3 className={S.name}>{userProfile.secondName}</h3>
                </div>
                <h3 className={S.email}>{userProfile.email}</h3>
                <h3 className={S.role} style={{ color: userProfile.role.color }}>
                  {userProfile.role.roleName}
                </h3>
              </div>
            </div>
          </Block>
        </div>
      )}
    </Layout>
  )
}

export default Profile
