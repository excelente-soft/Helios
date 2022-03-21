import { Form, Formik } from 'formik'
import Link from 'next/link'
import { useState } from 'react'

import { EntryControl } from '@components/EntryControl/EntryControl'
import { EntryWelcome } from '@components/EntryWelcome/EntryWelcome'
import { Layout } from '@components/Layout/Layout'
import { RowField } from '@components/RowField/RowField'
import { useAppDispatch } from '@hooks/app'
import { useAuth } from '@hooks/useAuth'
import { useUser } from '@hooks/useUser'
import { IUserCredentials } from '@interfaces/IUser'
import { setUser } from '@store/user/userSlice'
import { LoginSchema } from '@utils/yupSchemas'

import S from '../styles/Login.module.scss'
import CS from '@common.module.scss'

const Login = () => {
  const dispatch = useAppDispatch()
  const { login } = useAuth()
  const { saveToStorage } = useUser()
  const [errorFromServer, setErrorFromServer] = useState('')

  const initialValues: IUserCredentials = {
    login: '',
    password: '',
  }

  const loginSubmit = async (formData: IUserCredentials) => {
    const requestResult = await login(formData)
    if (requestResult.data) {
      dispatch(setUser(requestResult.data))
      saveToStorage(requestResult.data)
    } else if (requestResult.message) {
      setErrorFromServer(requestResult.message)
    }
  }

  return (
    <Layout title="Helios | Login">
      <div className={S.container}>
        <EntryWelcome title="Welcome back!" subtitle="We were waiting for you❤️" />
        <EntryControl title="Log in to Helios">
          <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={loginSubmit}>
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
                {errorFromServer && <span className={S.serverError}>{errorFromServer}</span>}
                <div className={S.forgot}>
                  <Link href="/404">
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
    </Layout>
  )
}

export default Login
