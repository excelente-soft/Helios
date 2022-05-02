/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import CourseCard from '@components/CourseCard/CourseCard'
import Table from '@components/Table/Table'
import { ICourse, ICourseRaw } from '@interfaces/ICourse'
import { IUser } from '@interfaces/IUser'
import { RequestUtility } from '@utils/request'

interface IMyCoursesProps {
  user: IUser
}

const MyCourses: React.VFC<IMyCoursesProps> = ({ user }) => {
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
    <Table noPadding>
      {myCourses &&
        myCourses.map((course) => (
          <CourseCard key={course.name} course={course} url={`/study/course/${encodeURIComponent(course.name)}`} />
        ))}
    </Table>
  )
}

export default MyCourses
