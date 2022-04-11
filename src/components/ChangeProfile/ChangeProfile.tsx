import { Form, Formik } from 'formik'
import { useState } from 'react'

import { Block } from '@components/Block/Block'
import { Notification } from '@components/Notification/Notification'
import { RowField } from '@components/RowField/RowField'
import { STORAGE_USER } from '@constants'
import { useAppDispatch } from '@hooks/app'
import { INotification } from '@interfaces/INotification'
import { IUser, IUserProfile } from '@interfaces/IUser'
import { setProfile } from '@store/user/userSlice'
import { RequestUtility } from '@utils/request'
import { StorageUtility } from '@utils/storage'
import { YupSchemas } from '@utils/yupSchemas'

import S from './ChangeProfile.module.scss'
import CS from '@common.module.scss'

interface IChangeProfileProps {
  user: IUser
}

export const ChangeProfile: React.VFC<IChangeProfileProps> = ({ user }) => {
  const [answerFromServer, setAnswerFromServer] = useState<INotification>({ message: '', isError: false })
  const dispatch = useAppDispatch()

  const initialValues: IUserProfile = {
    name: user.name,
    secondName: user.secondName,
    nickname: user.nickname,
  }

  const profileSubmit = async (formData: IUserProfile) => {
    const changeProfileResult = await RequestUtility.requestToServer<IUserProfile, IUserProfile>(
      'PUT',
      '/changeProfile',
      formData,
      user.token
    )
    if (changeProfileResult.data) {
      StorageUtility.saveItemToStorage<IUser>(STORAGE_USER, { ...user, ...changeProfileResult.data })
      dispatch(setProfile(changeProfileResult.data))
      setAnswerFromServer({ message: 'Profile changed successfully', isError: false })
    } else if (changeProfileResult.message) {
      setAnswerFromServer({ message: changeProfileResult.message, isError: true })
    }
  }

  return (
    <Block noMargin>
      <h3 className={CS.subtitle}>Change profile</h3>
      <Formik initialValues={initialValues} validationSchema={YupSchemas.ChangeProfileSchema} onSubmit={profileSubmit}>
        {({ errors, touched }) => (
          <Form>
            <div className={S.fullname}>
              <RowField
                id="field[name]"
                label="Name"
                placeholder="Enter your name"
                name="name"
                error={errors.name}
                touched={touched.name}
              />
              <RowField
                id="field[secondName]"
                label="Second name"
                placeholder="Enter your second name"
                name="secondName"
                error={errors.secondName}
                touched={touched.secondName}
              />
            </div>
            <RowField
              id="field[nickname]"
              label="Nickname"
              placeholder="Enter your nickname"
              name="nickname"
              error={errors.nickname}
              touched={touched.nickname}
            />
            {answerFromServer.message && <Notification answerFromServer={answerFromServer} />}
            <button type="submit" className={`${CS.btnPrimary} ${CS.btnBasicSize}`}>
              Update profile
            </button>
          </Form>
        )}
      </Formik>
    </Block>
  )
}
