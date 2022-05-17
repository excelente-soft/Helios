/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'

import { IFeedbackRaw } from '@interfaces/IFeedback'
import { RequestUtility } from '@utils/request'

import S from './MentorHeader.module.scss'

interface IMentorHeaderProps {
  token: string
}

const MentorHeader: React.VFC<IMentorHeaderProps> = ({ token }) => {
  const [feedbacks, setFeedbacks] = useState<IFeedbackRaw[]>([])

  useEffect(() => {
    const fetchMyFeedbacks = async () => {
      const myFeedbacksResponse = await RequestUtility.requestToServer<IFeedbackRaw[]>(
        'GET',
        '/feedbacks-chart',
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
    <div className={`${S.header} ${feedbacks.length < 2 ? S.colored : ''}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={feedbacks} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="natural" dataKey="rating" stroke="#19066a" fill="#3a10e5" fillOpacity="1" />
          <Area type="natural" dataKey="review" stroke="#19066a" fill="#3a10e5" fillOpacity="1" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MentorHeader
