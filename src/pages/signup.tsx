import { EntryWelcome } from 'src/components/EntryWelcome/EntryWelcome'
import { Layout } from 'src/components/Layout/Layout'

import S from '../styles/Signup.module.scss'

const Signup = () => {
  return (
    <Layout title="Helios | Sign up">
      <div className={S.container}>
        <EntryWelcome title="Join to our community!" subtitle="Level up your programming skills with us" />
        <div>Sign up</div>
      </div>
    </Layout>
  )
}

export default Signup
