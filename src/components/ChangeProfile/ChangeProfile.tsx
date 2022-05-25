import { Form, Formik } from 'formik'

import { IWithNotificationProps, withNotification } from '@HOC/withNotification'
import Block from '@components/Block/Block'
import RowField from '@components/RowField/RowField'
import { useAppDispatch } from '@hooks/app'
import { IUser, IUserProfile } from '@interfaces/IUser'
import { setProfile } from '@store/user/userSlice'
import { RequestUtility } from '@utils/request'
import { YupSchemas } from '@utils/schemas'
import { StorageUtility } from '@utils/storage'

import S from './ChangeProfile.module.scss'
import CS from '@common.module.scss'

interface IChangeProfileProps extends IWithNotificationProps {
  user: IUser
}

const ChangeProfile: React.VFC<IChangeProfileProps> = ({ user, setAnswerFromServer, notification }) => {
  const dispatch = useAppDispatch()

  const initialValues: IUserProfile = {
    name: user.name,
    secondName: user.secondName,
    nickname: user.nickname,
  }

  const profileSubmit = async (formData: IUserProfile) => {
    const changeProfileResult = await RequestUtility.requestToServer<IUserProfile>(
      'PUT',
      '/change-profile',
      formData,
      user.token
    )
    if (changeProfileResult.data) {
      StorageUtility.saveUserToStorage({ ...user, ...changeProfileResult.data })
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
            {notification}
            <button type="submit" className={`${CS.btnPrimary} ${CS.btnBasicSize}`}>
              Update profile
            </button>
          </Form>
        )}
      </Formik>
    </Block>
  )
}

export default withNotification(ChangeProfile)
