import { Form, Formik } from 'formik'
import { useState } from 'react'

import { Block } from '@components/Block/Block'
import { Notification } from '@components/Notification/Notification'
import { RowField } from '@components/RowField/RowField'
import { useClear } from '@hooks/useClear'
import { INotification } from '@interfaces/INotification'
import { RequestUtility } from '@utils/request'
import { YupSchemas } from '@utils/yupSchemas'

import S from './ChangePassword.module.scss'
import CS from '@common.module.scss'

interface IChangePasswordProps {
  token: string
}

export const ChangePassword: React.VFC<IChangePasswordProps> = ({ token }) => {
  const [answerFromServer, setAnswerFromServer] = useState<INotification>({ message: '', isError: false })
  const { clearUser } = useClear()

  const initialValues = {
    currentPassword: '',
    password: '',
    newPasswordConfirm: '',
  }

  const changePasswordSubmit = async ({ currentPassword, password }: typeof initialValues) => {
    const changePasswordResult = await RequestUtility.requestToServer<
      { password: boolean },
      { currentPassword: string; newPassword: string }
    >('PUT', '/changePassword', { currentPassword, newPassword: password }, token)

    if (changePasswordResult.data) {
      clearUser()
    } else if (changePasswordResult.message) {
      setAnswerFromServer({ message: changePasswordResult.message, isError: true })
    }
  }

  return (
    <Block>
      <h3 className={CS.subtitle}>Change password</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={YupSchemas.ChangePasswordSchema}
        onSubmit={changePasswordSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <RowField
              id="field[currentPassword]"
              label="Current password"
              placeholder="Enter your current password"
              name="currentPassword"
              type="password"
              error={errors.currentPassword}
              touched={touched.currentPassword}
            />
            <RowField
              id="field[password]"
              label="New password"
              placeholder="Choose a new password (min 6 chars)"
              name="password"
              error={errors.password}
              touched={touched.password}
            />
            <RowField
              id="field[newPasswordConfirm]"
              label="Confirm new password"
              placeholder="Confirm your new password"
              name="newPasswordConfirm"
              error={errors.newPasswordConfirm}
              touched={touched.newPasswordConfirm}
            />
            {answerFromServer.message && <Notification answerFromServer={answerFromServer} />}
            <p className={S.notification}>
              <span className={S.warning}>Warning: Changing your password will sign you out.</span> You can then sign
              back in with your new password.
            </p>
            <button type="submit" className={`${CS.btnPrimary} ${CS.btnBasicSize}`}>
              Update password
            </button>
          </Form>
        )}
      </Formik>
    </Block>
  )
}
