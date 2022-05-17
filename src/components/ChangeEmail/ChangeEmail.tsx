import { Form, Formik } from 'formik'

import { IWithNotificationProps, withNotification } from '@HOC/withNotification'
import Block from '@components/Block/Block'
import RowField from '@components/RowField/RowField'
import { useClear } from '@hooks/useClear'
import { IUser } from '@interfaces/IUser'
import { RequestUtility } from '@utils/request'
import { YupSchemas } from '@utils/yupSchemas'

import CS from '@common.module.scss'

interface IChangeEmailProps extends IWithNotificationProps {
  user: IUser
}

const ChangeEmail: React.VFC<IChangeEmailProps> = ({ user, setAnswerFromServer, notification }) => {
  const { clearUser } = useClear()

  const initialValues = {
    email: user.email,
    hiddenEmail: user.email,
    passwordConfirm: '',
  }

  const emailSubmit = async ({ email, passwordConfirm }: typeof initialValues) => {
    const changeEmailResult = await RequestUtility.requestToServer(
      'PUT',
      '/change-email',
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
      <Formik initialValues={initialValues} validationSchema={YupSchemas.ChangeEmailSchema} onSubmit={emailSubmit}>
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
            {notification}
            <p className={CS.notification}>
              <span className={CS.warning}>Warning: Changing your email will result in a logout.</span> You can then log
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

export default withNotification(ChangeEmail)
