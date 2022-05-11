import { useRouter } from 'next/router'

import { useModal } from '@hooks/useModal'
import { useUser } from '@hooks/useUser'
import { IModalRaw, ModalType } from '@interfaces/IModal'
import { RequestUtility } from '@utils/request'

import S from './CoursePreviewHeader.module.scss'
import CS from '@common.module.scss'

interface ICoursePreviewHeaderProps {
  name: string
  shortDescription: string
  price: number
}

const CoursePreviewHeader: React.VFC<ICoursePreviewHeaderProps> = ({ name, shortDescription, price }) => {
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
        showModal(requestFromServer.message, ModalType.Error)
      }
    }
  }

  return (
    <section className={S.header}>
      <div className={`${CS.pageContainer} ${S.headContainer}`}>
        <h1 className={S.name}>{name}</h1>
        <p className={S.shortDescription}>{shortDescription}</p>
        <button className={S.btnStartLearning} onClick={registerToCourseHandler}>
          Start learning for <span className={S.price}>{price === 0 ? ' FREE' : ` ${price}$`}</span>
        </button>
      </div>
    </section>
  )
}

export default CoursePreviewHeader
