import React from 'react'

import { IWithNotificationProps, withNotification } from '@HOC/withNotification'
import Block from '@components/Block/Block'
import { STORAGE_USER } from '@constants'
import { useAppDispatch } from '@hooks/app'
import { IUser, UserTypeEnum } from '@interfaces/IUser'
import { setType } from '@store/user/userSlice'
import { RequestUtility } from '@utils/request'
import { StorageUtility } from '@utils/storage'

import S from './ChangeProfileType.module.scss'
import CS from '@common.module.scss'

interface IChangeProfileTypeProps extends IWithNotificationProps {
  user: IUser
}

const ChangeProfileType: React.VFC<IChangeProfileTypeProps> = ({ user, notification, setAnswerFromServer }) => {
  const dispatch = useAppDispatch()

  const changeProfileTypeHandler = async () => {
    const changeProfileTypeResult = await RequestUtility.requestToServer<{ type: UserTypeEnum }>(
      'PUT',
      '/change-type',
      { type: user.type === UserTypeEnum.public ? UserTypeEnum.private : UserTypeEnum.public },
      user.token
    )
    if (changeProfileTypeResult.data) {
      StorageUtility.saveItemToStorage<IUser>(STORAGE_USER, { ...user, ...changeProfileTypeResult.data })
      dispatch(setType(changeProfileTypeResult.data.type))
    } else if (changeProfileTypeResult.message) {
      setAnswerFromServer({ message: changeProfileTypeResult.message, isError: true })
    }
  }

  return (
    <Block>
      <h3 className={CS.subtitle}>Change profile type</h3>
      <div className={S.switchContainer}>
        <span className={S.label}>Private</span>
        <label className={S.switch}>
          <input
            className={S.switchBox}
            onChange={changeProfileTypeHandler}
            type="checkbox"
            checked={user.type === 'public' ? true : false}
          />
          <span className={S.slider}></span>
        </label>
        <span className={S.label}>Public</span>
      </div>
      {notification}
      <p className={S.notification}>
        <span className={S.warning}>
          Warning: With a private profile type, no one will be able to find your profile
        </span>
      </p>
    </Block>
  )
}

export default withNotification(ChangeProfileType)
