import Image from 'next/image'
import Link from 'next/link'

import { ICourse } from '@interfaces/ICourse'

import ProgressBar from '../ProgressBar/ProgressBar'
import S from './CourseCard.module.scss'

interface ICourseCardProps {
  course: ICourse
  url?: string
  progress?: number
}

const CourseCard: React.VFC<ICourseCardProps> = ({ course, url, progress }) => {
  const isNew = course.creationDate.getTime() > Date.now() - 1000 * 60 * 60 * 24 * 7
  const isProgress = progress !== undefined
  return (
    <Link href={`${url ? url : `/catalog/${encodeURIComponent(course.name)}`}`}>
      <a className={S.card}>
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
  )
}

export default CourseCard
