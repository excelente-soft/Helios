import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import ProgressBar from '@components/ProgressBar/ProgressBar'
import { WEEK } from '@constants'
import { useModal } from '@hooks/useModal'
import { ICourse } from '@interfaces/ICourse'
import { IModalRaw, ModalType } from '@interfaces/IModal'
import { RequestUtility } from '@utils/request'

import S from './CourseCard.module.scss'
import CS from '@common.module.scss'

interface ICourseCardProps {
  course: ICourse
  url?: string
  progress?: number
  hasCertificate?: boolean
  token?: string
}

const CourseCard: React.VFC<ICourseCardProps> = ({ course, url, progress, hasCertificate, token }) => {
  const { showModal } = useModal()
  const [gotCertificate, setGotCertificate] = useState(hasCertificate)

  const getCertificateHandler = async () => {
    const certificateResult = await RequestUtility.requestToServer<IModalRaw>(
      'POST',
      '/get-certificate',
      { courseId: course.id },
      token
    )
    if (certificateResult.data) {
      showModal(certificateResult.data.message, certificateResult.data.type)
      setGotCertificate(true)
    } else {
      showModal(
        "You can't get certificate now. If you think this is a mistake, please contact us support-me@helios.education.",
        ModalType.Error
      )
    }
  }

  const isNew = course.creationDate.getTime() > Date.now() - WEEK
  const isProgress = progress !== undefined
  const isGotCertificate = progress === 100 && !gotCertificate
  return (
    <div className={S.card}>
      <Link href={`${url ? url : `/catalog/${encodeURIComponent(course.name)}`}`}>
        <a>
          <div className={S.image}>
            {course.image && <Image src={course.image} layout="fill" objectFit="cover" alt={`${course.name} course`} />}
          </div>
          <div className={S.content}>
            <h1 className={S.title}>{course.name}</h1>
            <p className={S.subtitle}>{course.shortDescription}</p>
            {!isProgress && <h6 className={S.price}>{course.price <= 0 ? 'FREE' : `${course.price}$`}</h6>}
            {isProgress && (
              <div className={S.progress}>
                <span className={S.progressPercentage}>{progress}%</span>
                <ProgressBar percent={progress} duration={0} />
              </div>
            )}
          </div>
          {isNew && <div className={S.new}>NEW</div>}
        </a>
      </Link>
      {isGotCertificate && (
        <button onClick={getCertificateHandler} className={`${S.btnCertificate} ${CS.btnSecondary} ${CS.btnBasicSize}`}>
          Get certificate
        </button>
      )}
    </div>
  )
}

export default CourseCard
