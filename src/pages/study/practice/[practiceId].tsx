/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { IWithAuthorizationProps, withAuthorization } from '@HOC/withAuthorization'
import Feedbacks from '@components/Feedbacks/Feedbacks'
import PracticeSubmit from '@components/PracticeSubmit/PracticeSubmit'
import PracticeView from '@components/PracticeView/PracticeView'
import { IPractice } from '@interfaces/IPractice'
import { RequestUtility } from '@utils/request'

const Practice: React.VFC<IWithAuthorizationProps> = ({ user }) => {
  const router = useRouter()
  const { practiceId } = router.query
  const [practice, setPractice] = useState<IPractice>()

  useEffect(() => {
    if (router.isReady) {
      const fetchPractice = async () => {
        const responseFromServer = await RequestUtility.requestToServer<IPractice>(
          'GET',
          `/study/practice/${practiceId}`,
          null,
          user.token
        )
        if (responseFromServer.data) {
          setPractice(responseFromServer.data)
        } else {
          router.push('/courses')
        }
      }
      fetchPractice()
    }
  }, [router.isReady])

  return (
    <>
      {practice && (
        <PracticeView pageTitle="Practice" practice={practice}>
          <PracticeSubmit token={user.token} practiceId={practice.id} />
          {practice && (
            <Feedbacks practiceId={practiceId?.toString()} courseId={practice.courseId} token={user.token} />
          )}
        </PracticeView>
      )}
    </>
  )
}

export default withAuthorization(Practice, 'Lecture')
