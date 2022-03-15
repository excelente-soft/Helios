import Link from 'next/link'
import { EntryWelcome } from 'src/components/EntryWelcome/EntryWelcome'
import { Layout } from 'src/components/Layout/Layout'
import { EntryControl } from 'src/components/EntryControl/EntryControl'
import { Form, Formik } from 'formik'
import { LoginSchema } from '@/utils/YupSchemas'
import { RowField } from 'src/components/RowField/RowField'

import S from '../styles/Login.module.scss'
import CS from '@common.module.scss'

const Login = () => {
  const initialValues = {
    login: '',
    password: '',
  }

  const loginSubmit = (values: typeof initialValues) => {
    alert(JSON.stringify(values, null, 2))
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
                  label="Email or username"
                  placeholder="Enter your email or username"
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
