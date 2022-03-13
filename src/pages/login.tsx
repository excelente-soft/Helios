import { EntryWelcome } from 'src/components/EntryWelcome/EntryWelcome'
import { Layout } from 'src/components/Layout/Layout'

import S from '../styles/Login.module.scss'

const Login = () => {
  return (
    <Layout title="Helios | Login">
      <div className={S.container}>
        <EntryWelcome title="Welcome back!" subtitle="We were waiting for you❤️" />
        <div>login</div>
      </div>
    </Layout>
  )
}

export default Login
