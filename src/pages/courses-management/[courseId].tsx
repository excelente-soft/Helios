import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { IWithAdminProps, withAdmin } from '@HOC/withAdmin'
import ChangeCourse from '@components/ChangeCourse/ChangeCourse'
import LearningManage from '@components/LearningManage/LearningManage'
import { ICourse, IManageRaw } from '@interfaces/ICourse'
import { ITask } from '@interfaces/ITask'
import { RequestUtility } from '@utils/request'

import CS from '@common.module.scss'

const CoursesManagement: React.VFC<IWithAdminProps> = ({ user }) => {
  const router = useRouter()
  const [course, setCourse] = useState<ICourse | null>(null)
  const [isFetched, setFetched] = useState(false)
  const [tasks, setTasks] = useState<ITask[]>([])
  const { courseId } = router.query

  useEffect(() => {
    if (router.isReady) {
      const fetchCourse = async () => {
        const responseFromServer = await RequestUtility.requestToServer<IManageRaw>(
          'GET',
          `/course-management/${courseId}`,
          null,
          user.token
        )
        if (responseFromServer.data) {
          const parsedDate = new Date(responseFromServer.data.course.creationDate)
          setCourse({ ...responseFromServer.data.course, creationDate: parsedDate })
          const allTasks = [
            responseFromServer.data.lectures,
            responseFromServer.data.tests,
            responseFromServer.data.practices,
          ].flat(1)
          const sortedTasks = allTasks.sort((a, b) => a.position - b.position)
          setTasks(sortedTasks)
        }
        setFetched(true)
      }
      fetchCourse()
    }
  }, [router.isReady])

  const hasCourse = isFetched && course
  return (
    <div className={CS.pageContainer}>
      <h2 className={CS.pageTitle}>Course management</h2>
      {hasCourse && (
        <>
          <LearningManage tasks={tasks} token={user.token} courseId={course.id} setTasks={setTasks} />
          <ChangeCourse course={course} user={user} />
        </>
      )}
    </div>
  )
}

export default withAdmin(CoursesManagement, 'Course manage')
