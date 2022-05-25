import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import CoursePreviewHeader from '@components/CoursePreviewHeader/CoursePreviewHeader'
import CoursePreviewTodo from '@components/CoursePreviewTodo/CoursePreviewTodo'
import ErrorRoute from '@components/ErrorRoute/ErrorRoute'
import Layout from '@components/Layout/Layout'
import LearningProcess from '@components/LearningProcess/LearningProcess'
import PossibleQuestions from '@components/PossibleQuestions/PossibleQuestions'
import StartJourney from '@components/StartJourney/StartJourney'
import SyllabusPreview from '@components/SyllabusPreview/SyllabusPreview'
import { ICourse, IManageRaw } from '@interfaces/ICourse'
import { ITask } from '@interfaces/ITask'
import { RequestUtility } from '@utils/request'

const CoursePreview = () => {
  const router = useRouter()
  const [course, setCourse] = useState<ICourse | null>(null)
  const [syllabus, setSyllabus] = useState<ITask[]>([])
  const [isFetched, setFetched] = useState(false)
  const { courseName } = router.query

  useEffect(() => {
    if (router.isReady) {
      const fetchCourse = async () => {
        const responseFromServer = await RequestUtility.requestToServer<IManageRaw>('GET', `/get-courses/${courseName}`)
        if (responseFromServer.data) {
          const parsedDate = new Date(responseFromServer.data.course.creationDate)
          setCourse({ ...responseFromServer.data.course, creationDate: parsedDate })
          const allTasks = [
            responseFromServer.data.lectures,
            responseFromServer.data.tests,
            responseFromServer.data.practices,
          ].flat(1)
          const sortedTasks = allTasks.sort((a, b) => a.position - b.position)
          setSyllabus(sortedTasks)
        }
        setFetched(true)
      }
      fetchCourse()
    }
  }, [router.isReady])

  const hasCourse = isFetched && course
  return (
    <Layout title={`${courseName || 'Loading course preview'}`}>
      {isFetched && !course && <ErrorRoute description="This course could not be found." />}
      {hasCourse && (
        <>
          <CoursePreviewHeader name={course.name} shortDescription={course.shortDescription} price={course.price} />
          <CoursePreviewTodo description={course.description} />
          <SyllabusPreview syllabus={syllabus} />
          <LearningProcess />
          <StartJourney price={course.price} />
          <PossibleQuestions />
        </>
      )}
    </Layout>
  )
}

export default CoursePreview
