/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import ChangeCourse from '@components/ChangeCourse/ChangeCourse'
import LearningManage from '@components/LearningManage/LearningManage'
import { ICourse, IManageRaw } from '@interfaces/ICourse'
import { ITask } from '@interfaces/ITask'
import { IUser } from '@interfaces/IUser'
import { RequestUtility } from '@utils/request'

import CS from '@common.module.scss'

interface ICourseManage {
  user: IUser
}

const CourseManage: React.VFC<ICourseManage> = ({ user }) => {
  const router = useRouter()
  const [course, setCourse] = useState<ICourse | null>(null)
  const [isFetched, setIsFetched] = useState(false)
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
          const allTasks: ITask[] = responseFromServer.data.lectures
            .concat(responseFromServer.data.tests)
            .concat(responseFromServer.data.practices)
          const sortedTasks = allTasks.sort((a, b) => a.position - b.position)
          setTasks(sortedTasks)
        }
        setIsFetched(true)
      }
      fetchCourse()
    }
  }, [router.isReady])

  return (
    <div>
      <h2 className={CS.pageTitle}>Course management</h2>
      {isFetched && course && (
        <>
          <LearningManage tasks={tasks} token={user.token} courseId={course.id} setTasks={setTasks} />
          <ChangeCourse course={course} user={user} />
        </>
      )}
    </div>
  )
}

export default CourseManage
