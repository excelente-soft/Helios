import { Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { IWithNotificationProps, withNotification } from '@HOC/withNotification'
import { withPublic } from '@HOC/withPublic'
import EntryControl from '@components/EntryControl/EntryControl'
import EntryWelcome from '@components/EntryWelcome/EntryWelcome'
import RowField from '@components/RowField/RowField'
import { SITE_NAME } from '@constants'
import { useAuth } from '@hooks/useAuth'
import { IUserCredentials } from '@interfaces/IUser'
import { YupSchemas } from '@utils/schemas'

import CS from '@common.module.scss'
import S from '@styles/Login.module.scss'

const Login: React.VFC<IWithNotificationProps> = ({ setAnswerFromServer, notification }) => {
  const { login } = useAuth()
  const router = useRouter()

  const initialValues: IUserCredentials = {
    login: '',
    password: '',
  }

  const loginSubmit = async (formData: IUserCredentials) => {
    const loginResult = await login(formData)
    if (!loginResult.message) {
      router.push('/')
    } else {
      setAnswerFromServer({ message: loginResult.message, isError: true })
    }
  }

  return (
    <div className={S.container}>
      <EntryWelcome title="Welcome back!" subtitle="We were waiting for you❤️" />
      <EntryControl title={`Log in to ${SITE_NAME}`}>
        <Formik initialValues={initialValues} validationSchema={YupSchemas.LoginSchema} onSubmit={loginSubmit}>
          {({ errors, touched }) => (
            <Form>
              <RowField
                id="field[login]"
                label="Email or nickname"
                placeholder="Enter your email or nickname"
                name="login"
                error={errors.login}
                touched={touched.login}
              />
              <RowField
                id="field[password]"
                label="Password"
                placeholder="Enter your password"
                name="password"
                error={errors.password}
                touched={touched.password}
                type="password"
              />
              {notification}
              <div className={S.forgot}>
                <Link href="/forgot">
                  <a className={CS.link}>I forgot my password</a>
                </Link>
              </div>
              <button type="submit" className={`${CS.btnPrimary} ${S.submit}`}>
                Log in
              </button>
              <p className={S.notMember}>
                Not a member yet?{' '}
                <Link href="/signup">
                  <a className={CS.link}>Sign up for free</a>
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </EntryControl>
    </div>
  )
}

export default withNotification(withPublic(Login, 'Login'))
