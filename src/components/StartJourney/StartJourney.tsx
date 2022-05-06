import { useRouter } from 'next/router'

import { useModal } from '@hooks/useModal'
import { useUser } from '@hooks/useUser'
import { IModalRaw } from '@interfaces/IModal'
import { RequestUtility } from '@utils/request'

import S from './StartJourney.module.scss'

interface IStartJourneyProps {
  price: number
}

const StartJourney: React.VFC<IStartJourneyProps> = ({ price }) => {
  const { user } = useUser()
  const router = useRouter()
  const { showModal } = useModal()
  const { courseName } = router.query

  const registerToCourseHandler = async () => {
    if (!user) {
      return router.push('/login')
    }
    const requestFromServer = await RequestUtility.requestToServer<IModalRaw>(
      'POST',
      '/register-to-course',
      { name: courseName as string },
      user.token
    )
    if (requestFromServer.data) {
      showModal(requestFromServer.data.message, requestFromServer.data.type)
    } else {
      if (requestFromServer.message) {
        showModal(requestFromServer.message, 'Error')
      }
    }
  }

  return (
    <section className={S.startJourneySection}>
      <h2 className={S.start}>Ready to kick-start your learning journey?</h2>
      <button className={S.btnStartLearning} onClick={registerToCourseHandler}>
        Start learning for <span className={S.price}>{price === 0 ? ' FREE' : ` ${price}$`}</span>
      </button>
    </section>
  )
}

export default StartJourney
