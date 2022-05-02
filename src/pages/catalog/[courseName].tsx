/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import CoursePreviewHeader from '@components/CoursePreviewHeader/CoursePreviewHeader'
import CoursePreviewTodo from '@components/CoursePreviewTodo/CoursePreviewTodo'
import ErrorRoute from '@components/ErrorRoute/ErrorRoute'
import Layout from '@components/Layout/Layout'
import { ICourse } from '@interfaces/ICourse'
import { RequestUtility } from '@utils/request'

const CoursePreview = () => {
  const router = useRouter()
  const [course, setCourse] = useState<ICourse | null>(null)
  const [isFetched, setIsFetched] = useState(false)
  const { courseName } = router.query

  useEffect(() => {
    if (router.isReady) {
      const fetchCourse = async () => {
        const responseFromServer = await RequestUtility.requestToServer<ICourse>(
          'GET',
          `/get-courses/${courseName}`,
          null
        )
        if (responseFromServer.data) {
          setCourse(responseFromServer.data)
        }
        setIsFetched(true)
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
        </>
      )}
    </Layout>
  )
}

export default CoursePreview
