import Image from 'next/image'
import { useEffect, useState } from 'react'

import Block from '@components/Block/Block'
import Dropdown from '@components/Dropdown/Dropdown'
import { IRole } from '@interfaces/IRole'
import { IAnotherUserProfile, UserType } from '@interfaces/IUser'
import { RequestUtility } from '@utils/request'

import S from './ProfileHeader.module.scss'

interface IProfileHeaderProps {
  userProfile: IAnotherUserProfile
  targetAccessLevel?: number
  token?: string
  changeUserRole: (role: IRole) => void
}

const ProfileHeader: React.VFC<IProfileHeaderProps> = ({
  userProfile,
  targetAccessLevel = 0,
  token,
  changeUserRole,
}) => {
  const [roles, setRoles] = useState<IRole[]>([])

  useEffect(() => {
    if (userProfile.role.accessLevel < targetAccessLevel) {
      const fetchRoles = async () => {
        const fetchedRoles = await RequestUtility.requestToServer<IRole[]>('GET', '/get-roles', null, token)
        if (fetchedRoles.data) {
          setRoles(fetchedRoles.data)
        }
      }
      fetchRoles()
    }
  }, [])

  const changeRoleHandler = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const role = roles.find((role) => e.target.value === role.roleName)
    if (role) {
      const responseFromServer = await RequestUtility.requestToServer(
        'PUT',
        `/change-role`,
        {
          roleName: role.roleName,
          userId: userProfile.id,
        },
        token
      )
      if (responseFromServer.data) {
        changeUserRole(role)
      }
    }
  }

  const canModifyRole = userProfile.role.accessLevel < targetAccessLevel && roles && targetAccessLevel !== 1
  const defaultRole = userProfile.role.accessLevel >= targetAccessLevel || targetAccessLevel == 1
  return (
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
          {defaultRole && (
            <h3 className={S.role} style={{ color: userProfile.role.color }}>
              {userProfile.role.roleName}
            </h3>
          )}
          {canModifyRole && <Dropdown value={userProfile.role.roleName} options={roles} onChange={changeRoleHandler} />}
        </div>
        {userProfile.type === UserType.Private && (
          <span className={S.hiddenProfile} title="This means that regular users do not see this profile."></span>
        )}
      </div>
    </Block>
  )
}

export default ProfileHeader
