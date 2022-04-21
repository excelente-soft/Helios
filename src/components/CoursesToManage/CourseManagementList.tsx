/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { CourseCard } from '@components/CourseCard/CourseCard'
import { Table } from '@components/Table/Table'
import { ICourse, ICourseRaw } from '@interfaces/ICourse'
import { IUser } from '@interfaces/IUser'
import { RequestUtility } from '@utils/request'

interface ICoursesToManage {
  user: IUser
}

export const CoursesToManage: React.VFC<ICoursesToManage> = ({ user }) => {
  const [coursesCanManage, setCoursesCanManage] = useState<ICourse[]>([])

  useEffect(() => {
    const fetchCoursesCanManage = async () => {
      const coursesCanManageResponse = await RequestUtility.requestToServer<ICourseRaw[], null>(
        'GET',
        '/courses-can-manage',
        null,
        user.token
      )
      if (coursesCanManageResponse.data) {
        const courses = coursesCanManageResponse.data.map((course) => ({
          ...course,
          creationDate: new Date(course.creationDate),
        }))
        setCoursesCanManage(courses)
      } else {
        console.log(coursesCanManageResponse.message)
      }
    }
    fetchCoursesCanManage()
  }, [])

  const hasCoursesCanManage = coursesCanManage.length > 0
  return (
    <Table noPadding>
      {hasCoursesCanManage &&
        coursesCanManage.map((course) => (
          <CourseCard key={course.name} course={course} url={`/course-management/${encodeURIComponent(course.id)}`} />
        ))}
    </Table>
  )
}
