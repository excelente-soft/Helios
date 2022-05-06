/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { IWithAuthorizationProps, withAuthorization } from '@HOC/withAuthorization'
import CourseCard from '@components/CourseCard/CourseCard'
import Table from '@components/Table/Table'
import { ICourseWithProgress } from '@interfaces/ICourse'
import { RequestUtility } from '@utils/request'

import S from '../styles/Courses.module.scss'
import CS from '@common.module.scss'

const Courses: React.VFC<IWithAuthorizationProps> = ({ user }) => {
  const [myCourses, setMyCourses] = useState<ICourseWithProgress[]>([])

  useEffect(() => {
    const fetchMyCourses = async () => {
      const myCoursesResponse = await RequestUtility.requestToServer<ICourseWithProgress[]>(
        'GET',
        '/my-courses',
        null,
        user.token
      )
      if (myCoursesResponse.data) {
        const courses = myCoursesResponse.data.map((course) => ({
          ...course,
          creationDate: new Date(course.creationDate),
        }))
        setMyCourses(courses)
      }
    }
    fetchMyCourses()
  }, [])

  return (
    <div className={CS.pageContainer}>
      <h1 className={CS.pageTitle}>MyCourses</h1>
      <div className={S.tableWrapper}>
        <Table noPadding>
          {myCourses &&
            myCourses.map((course) => (
              <CourseCard
                key={course.name}
                course={course}
                url={`/study/course/${encodeURIComponent(course.name)}`}
                progress={course.progress}
              />
            ))}
        </Table>
      </div>
    </div>
  )
}

export default withAuthorization(Courses, 'My courses')
