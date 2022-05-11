/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { IWithAuthorizationProps, withAuthorization } from '@HOC/withAuthorization'
import Block from '@components/Block/Block'
import Codesandbox from '@components/Codesandbox/Codesandbox'
import FigmaFrame from '@components/FigmaFrame/FigmaFrame'
import PracticeSubmit from '@components/PracticeSubmit/PracticeSubmit'
import { IPractice } from '@interfaces/IPractice'
import { RequestUtility } from '@utils/request'

import CS from '@common.module.scss'
import S from '@styles/Lecture.module.scss'

const Practice: React.VFC<IWithAuthorizationProps> = ({ user }) => {
  const router = useRouter()
  const { practiceId } = router.query
  const [practice, setPractice] = useState<IPractice>()

  useEffect(() => {
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
  }, [router.isReady])

  return (
    <>
      {practice && (
        <>
          {practice.objectiveType === 'figma' && practice.link && <FigmaFrame embedUrl={practice.link} />}
          {practice.objectiveType === 'codesandbox' && practice.link && <Codesandbox embedUrl={practice.link} />}
          <div className={CS.pageContainer}>
            <h2 className={CS.pageTitle}>Practice</h2>
            <Block noMargin>
              <h3 className={CS.subtitle}>{practice.name}</h3>
              <div className={S.lectureText}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{practice.objective}</ReactMarkdown>
              </div>
            </Block>
            <PracticeSubmit token={user.token} practiceId={practice.id} />
          </div>
        </>
      )}
    </>
  )
}

export default withAuthorization(Practice, 'Lecture')
