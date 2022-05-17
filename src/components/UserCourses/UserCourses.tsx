/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import Block from '@components/Block/Block'
import CourseCard from '@components/CourseCard/CourseCard'
import Table from '@components/Table/Table'
import { ICourse, ICourseRaw } from '@interfaces/ICourse'
import { RequestUtility } from '@utils/request'

import S from './UserCourses.module.scss'
import CS from '@common.module.scss'

interface IUserCoursesProps {
  userId: string
}
const UserCourses: React.VFC<IUserCoursesProps> = ({ userId }) => {
  const [userCourses, setUserCourses] = useState<ICourse[]>([])
  const [isFetched, setFetched] = useState(false)

  useEffect(() => {
    const fetchUserCourses = async () => {
      const responseFromServer = await RequestUtility.requestToServer<ICourseRaw[]>(
        'GET',
        `/profile/courses/${userId}`,
        null
      )
      if (responseFromServer.data) {
        const parsedCourses = responseFromServer.data.map((course: ICourseRaw) => ({
          ...course,
          creationDate: new Date(course.creationDate),
        }))
        setUserCourses(parsedCourses)
      }
      setFetched(true)
    }
    fetchUserCourses()
  }, [])

  return (
    <Block>
      <h2 className={CS.subtitle}>User courses</h2>
      {userCourses.length > 0 && isFetched && (
        <div className={S.userCoursesContainer}>
          <Table noPadding>
            {userCourses.map((course) => (
              <CourseCard key={course.name} course={course} />
            ))}
          </Table>
        </div>
      )}
      {userCourses.length === 0 && isFetched && <p>This user has no courses.</p>}
    </Block>
  )
}

export default UserCourses
