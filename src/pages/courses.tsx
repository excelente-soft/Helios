/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { IWithAuthorizationProps, withAuthorization } from '@HOC/withAuthorization'
import CourseCard from '@components/CourseCard/CourseCard'
import Table from '@components/Table/Table'
import { ICourse, ICourseRaw } from '@interfaces/ICourse'
import { RequestUtility } from '@utils/request'

import CS from '@common.module.scss'

const Courses: React.VFC<IWithAuthorizationProps> = ({ user }) => {
  const [myCourses, setMyCourses] = useState<ICourse[]>([])

  useEffect(() => {
    const fetchMyCourses = async () => {
      const myCoursesResponse = await RequestUtility.requestToServer<{ course: ICourseRaw }[]>(
        'GET',
        '/my-courses',
        null,
        user.token
      )
      if (myCoursesResponse.data) {
        const rawCourses = myCoursesResponse.data.map((myCourse) => myCourse.course)
        const courses = rawCourses.map((course) => ({ ...course, creationDate: new Date(course.creationDate) }))
        setMyCourses(courses)
      }
    }
    fetchMyCourses()
  }, [])

  return (
    <div className={CS.pageContainer}>
      <h1 className={CS.pageTitle}>MyCourses</h1>
      <Table noPadding>
        {myCourses &&
          myCourses.map((course) => (
            <CourseCard key={course.name} course={course} url={`/study/course/${encodeURIComponent(course.name)}`} />
          ))}
      </Table>
    </div>
  )
}

export default withAuthorization(Courses, 'My courses')
