import { motion, useTransform, useViewportScroll } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { IWithAuthorizationProps, withAuthorization } from '@HOC/withAuthorization'
import Block from '@components/Block/Block'
import { LECTURE_COMPLETE_DELAY } from '@constants'
import { ILecture } from '@interfaces/ILecture'
import { RequestUtility } from '@utils/request'

import CS from '@common.module.scss'
import S from '@styles/Lecture.module.scss'

const Lecture: React.VFC<IWithAuthorizationProps> = ({ user }) => {
  const router = useRouter()
  const { lectureId } = router.query
  const [currentPercent, setCurrentPercent] = useState(100)
  const { scrollYProgress } = useViewportScroll()
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100])
  const completeRef = useRef(false)
  const [lecture, setLecture] = useState<ILecture>()
  const completeTimeoutRef = useRef<number>(0)

  const lectureReadedSubmit = async () => {
    if (!completeRef.current) {
      completeRef.current = true
      await RequestUtility.requestToServer('POST', '/study/submit-lecture', { id: lectureId }, user.token)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      const fetchLecture = async () => {
        const responseFromServer = await RequestUtility.requestToServer<ILecture>(
          'GET',
          `/study/lecture/${lectureId}`,
          null,
          user.token
        )
        if (responseFromServer.data) {
          setLecture(responseFromServer.data)
        } else {
          router.push('/courses')
        }
      }
      fetchLecture().then(() => {
        completeTimeoutRef.current = +setTimeout(() => {
          if (currentPercent === 100) {
            lectureReadedSubmit()
          }
        }, LECTURE_COMPLETE_DELAY)
      })
    }
  }, [router.isReady])

  useEffect(() => {
    yRange.onChange((value) => {
      setCurrentPercent(Math.trunc(value))
      if (value === 100) {
        lectureReadedSubmit()
      }
    })
  }, [yRange])

  useEffect(() => {
    return () => clearTimeout(completeTimeoutRef.current)
  }, [])

  return (
    <div className={CS.pageContainer}>
      {lecture && (
        <>
          <motion.div className={S.progress} style={{ width: `${currentPercent}%` }}></motion.div>
          <h2 className={CS.pageTitle}>Lecture</h2>
          <Block noMargin>
            <h3 className={CS.subtitle}>{lecture.name}</h3>
            <div className={S.lectureText}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{lecture.text}</ReactMarkdown>
            </div>
          </Block>
        </>
      )}
    </div>
  )
}

export default withAuthorization(Lecture, 'Lecture')
