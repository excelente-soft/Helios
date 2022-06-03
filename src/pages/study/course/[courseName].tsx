import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { IWithAuthorizationProps, withAuthorization } from '@HOC/withAuthorization'
import Block from '@components/Block/Block'
import ErrorRoute from '@components/ErrorRoute/ErrorRoute'
import GradesChart from '@components/GradesChart/GradesChart'
import Task from '@components/Task/Task'
import { ICourse, IManageWithGradesRaw } from '@interfaces/ICourse'
import { IGrade } from '@interfaces/IGrade'
import { ITaskWithGrade } from '@interfaces/ITask'
import { RequestUtility } from '@utils/request'

import CS from '@common.module.scss'
import S from '@styles/StudyCourse.module.scss'

const StudyCourse: React.VFC<IWithAuthorizationProps> = ({ user }) => {
  const router = useRouter()
  const [course, setCourse] = useState<ICourse>()
  const [allGrades, setAllGrades] = useState<IGrade[]>([])
  const [tasks, setTasks] = useState<ITaskWithGrade[]>()
  const [isFetched, setFetched] = useState(false)
  const { courseName } = router.query

  useEffect(() => {
    if (router.isReady) {
      const fetchCourse = async () => {
        const responseFromServer = await RequestUtility.requestToServer<IManageWithGradesRaw>(
          'GET',
          `/study/course/${encodeURIComponent(courseName?.toString() || '')}`,
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

          setAllGrades(responseFromServer.data.grades)
          const tasksWithGrade = allTasks.map((task) => {
            const grade = responseFromServer.data?.grades.find((grade) => grade.taskId === task.id && grade.rating >= 4)
            return { ...task, grade: grade ? grade.rating : 0 }
          })
          const sortedTasks = tasksWithGrade.sort((a, b) => a.position - b.position)
          setTasks(sortedTasks)
        }
        setFetched(true)
      }
      fetchCourse()
    }
  }, [router.isReady])

  return (
    <div className={CS.pageContainer}>
      {isFetched && !course && <ErrorRoute description="This course could not be found." />}
      {course && (
        <>
          <h2 className={CS.pageTitle}>{course.name}</h2>
          <h4 className={S.courseDescription}>{course.description}</h4>
          <div className={S.blockWrapper}>
            <Block noMargin>
              <div className={S.tasksContainer}>
                {tasks &&
                  tasks.map((task) => <Task key={task.id} task={task} completed={task.grade >= 4 ? true : false} />)}
              </div>
            </Block>
          </div>
          <GradesChart grades={allGrades} />
        </>
      )}
    </div>
  )
}

export default withAuthorization(StudyCourse, 'Study')
