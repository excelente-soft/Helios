/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { Table } from '@components/Table/Table'
import { IUser } from '@interfaces/IUser'
import { RequestUtility } from '@utils/request'

import { ICourse, ICourseRaw } from '../../interfaces/ICourse'
import { CourseCard } from '../CourseCard/CourseCard'

interface IMyCoursesProps {
  user: IUser
}

export const MyCourses: React.VFC<IMyCoursesProps> = ({ user }) => {
  const [myCourses, setMyCourses] = useState<ICourse[]>([])

  useEffect(() => {
    const fetchMyCourses = async () => {
      const myCoursesResponse = await RequestUtility.requestToServer<Array<{ course: ICourseRaw }>, null>(
        'GET',
        '/my-courses',
        null,
        user.token
      )
      if (myCoursesResponse.data) {
        const rawCourses = myCoursesResponse.data.map((myCourse) => myCourse.course)
        const courses = rawCourses.map((course) => ({ ...course, creationDate: new Date(course.creationDate) }))
        setMyCourses(courses)
      } else {
        console.log(myCoursesResponse.message)
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
