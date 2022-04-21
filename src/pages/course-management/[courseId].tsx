/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { PrivateLayout } from '@components/PrivateLayout/PrivateLayout'
import { ICourse } from '@interfaces/ICourse'
import { RequestUtility } from '@utils/request'

const CourseManage = () => {
  const router = useRouter()
  const { courseId } = router.query

  useEffect(() => {
    if (router.isReady) {
      const fetchCourse = async () => {
        const responseFromServer = await RequestUtility.requestToServer<ICourse, null>(
          'GET',
          `/course-management/${courseId}`,
          null
        )
        if (responseFromServer.data) {
          console.log(responseFromServer.data)
        }
      }
      fetchCourse()
    }
  }, [router.isReady])

  return (
    <PrivateLayout title={'Course manage'}>
      {() => {
        return <div>course</div>
      }}
    </PrivateLayout>
  )
}

export default CourseManage
