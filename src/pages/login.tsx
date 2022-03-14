import Link from 'next/link'
import { EntryWelcome } from 'src/components/EntryWelcome/EntryWelcome'
import { Layout } from 'src/components/Layout/Layout'

import S from '../styles/Login.module.scss'
import CS from '@common.module.scss'

const Login = () => {
  return (
    <Layout title="Helios | Login">
      <div className={S.container}>
        <EntryWelcome title="Welcome back!" subtitle="We were waiting for you❤️" />
        <div className={S.centered}>
          <div className={S.content}>
            <h2 className={S.login}>Log in to Helios</h2>
            <form>
              <label htmlFor="field[email]" className={CS.label}>
                Email or username
              </label>
              <input
                id="field[email]"
                className={`${CS.field} ${S.formField}`}
                placeholder="Enter your email or username"
                minLength={3}
              />
              <label htmlFor="field[password]" className={CS.label}>
                Password
              </label>
              <input
                id="field[password]"
                className={`${CS.field} ${S.formField}`}
                placeholder="Enter your password"
                minLength={6}
              />
              <div className={S.formField}>
                <Link href="/404">
                  <a className={CS.link}>I forgot my password</a>
                </Link>
              </div>
              <button className={`${CS.btnPrimary} ${S.submit}`}>Log in</button>
              <p className={S.notMember}>
                Not a member yet?{' '}
                <Link href="/signup">
                  <a className={CS.link}>Sign up for free</a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login
