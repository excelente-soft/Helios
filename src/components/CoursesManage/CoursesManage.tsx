/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import CourseCard from '@components/CourseCard/CourseCard'
import Table from '@components/Table/Table'
import { ICourse, ICourseRaw } from '@interfaces/ICourse'
import { IUser } from '@interfaces/IUser'
import { RequestUtility } from '@utils/request'

import S from './CoursesManage.module.scss'

interface ICoursesManage {
  user: IUser
}

const CoursesManage: React.VFC<ICoursesManage> = ({ user }) => {
  const [coursesToManage, setCoursesToManage] = useState<ICourse[]>([])

  useEffect(() => {
    const fetchCoursesToManage = async () => {
      const coursesToManageResponse = await RequestUtility.requestToServer<ICourseRaw[]>(
        'GET',
        '/courses-to-manage',
        null,
        user.token
      )
      if (coursesToManageResponse.data) {
        const courses = coursesToManageResponse.data.map((course) => ({
          ...course,
          creationDate: new Date(course.creationDate),
        }))
        setCoursesToManage(courses)
      }
    }
    fetchCoursesToManage()
  }, [])

  const hasCoursesToManage = coursesToManage.length > 0
  return (
    <div className={S.tableWrapper}>
      <Table noPadding>
        {hasCoursesToManage &&
          coursesToManage.map((course) => (
            <CourseCard
              key={course.name}
              course={course}
              url={`/courses-management/${encodeURIComponent(course.id)}`}
            />
          ))}
      </Table>
    </div>
  )
}

export default CoursesManage
