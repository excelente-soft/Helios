import Image from 'next/image'
import { memo } from 'react'

import { ICourse } from '@interfaces/ICourse'

import S from './CatalogHeader.module.scss'

interface ICatalogHeaderProps {
  courses: ICourse[]
}

const CatalogHeader: React.VFC<ICatalogHeaderProps> = ({ courses }) => {
  const coursesImages = () => {
    const coursesWithImages = courses.filter((course) => course.image)
    if (coursesWithImages.length === 0) return null
    const sevenRandomCoursesWithImages = new Array(7)
      .fill('')
      .map(() => coursesWithImages[Math.floor(Math.random() * coursesWithImages.length)])
    return sevenRandomCoursesWithImages
  }
  const sevenRandomCoursesWithImages = coursesImages()
  return (
    <div className={S.header}>
      <div className={S.images}>
        {sevenRandomCoursesWithImages &&
          sevenRandomCoursesWithImages.map((course, index) => (
            <div key={index} className={S.courseImageWrapper}>
              <Image
                className={S.courseImage}
                src={course.image}
                height={64}
                width={64}
                objectFit={'cover'}
                alt={course.name}
              />
            </div>
          ))}
      </div>
      <h1 className={S.title}>{courses.length !== 0 ? courses.length : ''} courses for you to learn something</h1>
      <p className={S.subtitle}>
        Become fluent in your chosen programming languages by completing these courses created by professionals
      </p>
    </div>
  )
}

export const MemoizedCatalogHeader = memo(CatalogHeader)
