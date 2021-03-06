import { useEffect, useState } from 'react'

import { IWithAdminProps, withAdmin } from '@HOC/withAdmin'
import CourseCard from '@components/CourseCard/CourseCard'
import Table from '@components/Table/Table'
import { ICourse, ICourseRaw } from '@interfaces/ICourse'
import { RequestUtility } from '@utils/request'

import CS from '@common.module.scss'
import S from '@styles/Courses-management.module.scss'

const –°oursesManagement: React.VFC<IWithAdminProps> = ({ user }) => {
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

  return (
    <div className={CS.pageContainer}>
      <h2 className={CS.pageTitle}>Courses management</h2>
      <div className={S.tableWrapper}>
        <Table noPadding>
          {coursesToManage.map((course) => (
            <CourseCard
              key={course.name}
              course={course}
              url={`/courses-management/${encodeURIComponent(course.id)}`}
            />
          ))}
        </Table>
      </div>
    </div>
  )
}

export default withAdmin(–°oursesManagement, 'Courses management')
