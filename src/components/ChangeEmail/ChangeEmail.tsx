import { Form, Formik } from 'formik'
import { useState } from 'react'

import { Block } from '@components/Block/Block'
import { Notification } from '@components/Notification/Notification'
import { RowField } from '@components/RowField/RowField'
import { useClear } from '@hooks/useClear'
import { INotification } from '@interfaces/INotification'
import { IUser } from '@interfaces/IUser'
import { HeliosAPI } from '@utils/api'
import { ChangeEmailSchema } from '@utils/yupSchemas'

import S from './ChangeEmail.module.scss'
import CS from '@common.module.scss'

interface IChangeEmailProps {
  user: IUser
}

export const ChangeEmail: React.VFC<IChangeEmailProps> = ({ user }) => {
  const [answerFromServer, setAnswerFromServer] = useState<INotification>({ message: '', isError: false })
  const { clearUser } = useClear()

  const initialValues = {
    email: user.email,
    hiddenEmail: user.email,
    passwordConfirm: '',
  }

  const emailSubmit = async ({ email, passwordConfirm }: typeof initialValues) => {
    const changeEmailResult = await HeliosAPI.putRequest<{ email: string }, { email: string; password: string }>(
      '/changeEmail',
      { email, password: passwordConfirm },
      user.token
    )
    if (changeEmailResult.data) {
      clearUser()
    } else if (changeEmailResult.message) {
      setAnswerFromServer({ message: changeEmailResult.message, isError: true })
    }
  }

  return (
    <Block>
      <h3 className={CS.subtitle}>Change email</h3>
      <Formik initialValues={initialValues} validationSchema={ChangeEmailSchema} onSubmit={emailSubmit}>
        {({ errors, touched }) => (
          <Form>
            <RowField
              id="field[email]"
              label="Email"
              placeholder="Enter your email"
              name="email"
              error={errors.email || errors.hiddenEmail}
              touched={touched.email}
            />
            <RowField
              id="field[passwordConfirm]"
              label="Confirm your password"
              placeholder="Confirm your password"
              name="passwordConfirm"
              error={errors.passwordConfirm}
              touched={touched.passwordConfirm}
            />
            {answerFromServer.message && <Notification answerFromServer={answerFromServer} />}
            <p className={S.notification}>
              <span className={S.warning}>Warning: Changing your email will result in a logout.</span> You can then log
              in again with a new mail.
            </p>
            <button type="submit" className={`${CS.btnPrimary} ${CS.btnBasicSize}`}>
              Update email
            </button>
          </Form>
        )}
      </Formik>
    </Block>
  )
}
