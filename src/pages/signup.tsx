import { Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import EntryControl from '@components/EntryControl/EntryControl'
import EntryWelcome from '@components/EntryWelcome/EntryWelcome'
import Notification from '@components/Notification/Notification'
import PublicLayout from '@components/PublicLayout/PublicLayout'
import RowField from '@components/RowField/RowField'
import { useAuth } from '@hooks/useAuth'
import { IUserSignup } from '@interfaces/IUser'
import { YupSchemas } from '@utils/yupSchemas'

import S from '../styles/Signup.module.scss'
import CS from '@common.module.scss'

const Signup = () => {
  const { signup } = useAuth()
  const router = useRouter()
  const [answerFromServer, setAnswerFromServer] = useState({ message: '', isError: false })

  const initialValues = {
    name: '',
    secondName: '',
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }

  const signupSubmit = async (formData: IUserSignup) => {
    const signupResult = await signup(formData)
    if (!signupResult.message) {
      router.push('/')
    } else {
      setAnswerFromServer({ message: signupResult.message, isError: true })
    }
  }

  return (
    <PublicLayout title="Sign up">
      <div className={S.container}>
        <EntryWelcome title="Join to our community!" subtitle="Level up your programming skills with us" />
        <EntryControl title="Sign up for FREE!">
          <Formik initialValues={initialValues} validationSchema={YupSchemas.SigniupSchema} onSubmit={signupSubmit}>
            {({ errors, touched }) => (
              <Form>
                <div className={S.profile}>
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
                <RowField
                  id="field[email]"
                  label="Email"
                  placeholder="Enter your email"
                  name="email"
                  error={errors.email}
                  touched={touched.email}
                />
                <RowField
                  id="field[password]"
                  label="Password"
                  placeholder="Choose a password (min 6 chars)"
                  name="password"
                  error={errors.password}
                  touched={touched.password}
                />
                <RowField
                  id="field[passwordConfirm]"
                  label="Password confirmation"
                  placeholder="Confirm your password"
                  name="passwordConfirm"
                  error={errors.passwordConfirm}
                  touched={touched.passwordConfirm}
                />
                {answerFromServer.message && <Notification answerFromServer={answerFromServer} />}
                <button type="submit" className={`${CS.btnPrimary} ${S.submit}`}>
                  Sign up
                </button>
                <p className={S.member}>
                  Already got an account?{' '}
                  <Link href="/login">
                    <a className={CS.link}>Log in</a>
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </EntryControl>
      </div>
    </PublicLayout>
  )
}

export default Signup
