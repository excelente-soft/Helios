import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import { useModal } from '@hooks/useModal'
import { useUser } from '@hooks/useUser'
import { RequestUtility } from '@utils/request'

import { IModalRaw } from '../../interfaces/IModal'
import S from './CoursePreviewHeader.module.scss'
import CS from '@common.module.scss'

const descriptionVariants = {
  visible: { opacity: 1, height: 32, x: 0, transition: { duration: 0.55 } },
  hidden: { opacity: 0, height: 0, x: 25 },
}

const nameVariants = {
  visible: { opacity: 1, height: 85, x: 0, transition: { duration: 0.55 } },
  hidden: { opacity: 0, height: 0, x: 45 },
}

interface ICoursePreviewHeaderProps {
  name: string
  shortDescription: string
  price: number
}

export const CoursePreviewHeader: React.VFC<ICoursePreviewHeaderProps> = ({ name, shortDescription, price }) => {
  const { user } = useUser()
  const router = useRouter()
  const { showModal } = useModal()
  const { courseName } = router.query

  const registerToCourseHandler = async () => {
    if (!user) {
      return router.push('/login')
    }
    const requestFromServer = await RequestUtility.requestToServer<IModalRaw, { name: string }>(
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
    <section className={S.header}>
      <div className={`${CS.pageContainer} ${S.headContainer}`}>
        <div className={S.nameContent}>
          <motion.h1 className={`${S.name} ${S.trail}`} initial="hidden" animate="visible" variants={nameVariants}>
            {name}
          </motion.h1>
        </div>
        <div className={S.shortDescriptionContent}>
          <motion.p
            className={`${S.shortDescription} ${S.trail}`}
            initial="hidden"
            animate="visible"
            variants={descriptionVariants}
          >
            {shortDescription}
          </motion.p>
        </div>
        <button className={S.btnStartLearning} onClick={registerToCourseHandler}>
          Start learning for <span className={S.price}>{price === 0 ? ' FREE' : ` ${price}$`}</span>
        </button>
      </div>
    </section>
  )
}
