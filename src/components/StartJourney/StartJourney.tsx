import { useRouter } from 'next/router'

import { useModal } from '@hooks/useModal'
import { useUser } from '@hooks/useUser'
import { IModalRaw, ModalType } from '@interfaces/IModal'
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
    const responseFromServer = await RequestUtility.requestToServer<IModalRaw>(
      'POST',
      '/register-to-course',
      { name: courseName },
      user.token
    )
    if (responseFromServer.data) {
      showModal(responseFromServer.data.message, responseFromServer.data.type)
    } else {
      if (responseFromServer.message) {
        showModal(responseFromServer.message, ModalType.Error)
      }
    }
  }

  return (
    <section className={S.startJourneySection}>
      <h2 className={S.kickStart}>Ready to kick-start your learning journey?</h2>
      <button className={S.btnStartLearning} onClick={registerToCourseHandler}>
        Start learning for <span className={S.price}>{price === 0 ? ' FREE' : ` ${price}$`}</span>
      </button>
    </section>
  )
}

export default StartJourney
