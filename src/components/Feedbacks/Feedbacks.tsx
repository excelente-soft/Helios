/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import Block from '@components/Block/Block'
import { IFeedbackRaw } from '@interfaces/IFeedback'
import { RequestUtility } from '@utils/request'

import S from './Feedbacks.module.scss'
import CS from '@common.module.scss'

interface IFeedbacksProps {
  practiceId: string | undefined
  courseId: string
  token: string
}

const Feedbacks: React.VFC<IFeedbacksProps> = ({ practiceId, token, courseId }) => {
  const [feedbacks, setFeedbacks] = useState<IFeedbackRaw[]>([])
  useEffect(() => {
    const fetchMyFeedbacks = async () => {
      const myFeedbacksResponse = await RequestUtility.requestToServer<IFeedbackRaw[]>(
        'GET',
        `/feedbacks-practice/${courseId}/${practiceId}`,
        null,
        token
      )
      if (myFeedbacksResponse.data) {
        setFeedbacks(myFeedbacksResponse.data)
      }
    }
    fetchMyFeedbacks()
  }, [])

  return (
    <Block>
      <h3 className={CS.subtitle}>My feedbacks</h3>
      <div className={S.feedbacks}>
        {feedbacks.map((feedback) => (
          <div className={S.feedbackContainer} key={feedback.id}>
            <p className={S.review}>{feedback.review}</p>
            <p className={S.ratingWrapper}>
              Rating:{' '}
              <span
                className={`${S.rating} ${
                  feedback.rating < 4 ? S.notPassed : feedback.rating < 7 ? S.good : S.excellent
                }`}
              >
                {feedback.rating}
              </span>
            </p>
          </div>
        ))}
      </div>
    </Block>
  )
}
export default Feedbacks
