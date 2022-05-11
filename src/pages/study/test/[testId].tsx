/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { IWithAuthorizationProps, withAuthorization } from '@HOC/withAuthorization'
import Block from '@components/Block/Block'
import Question from '@components/Question/Question'
import TestInfo from '@components/TestInfo/TestInfo'
import { useModal } from '@hooks/useModal'
import { IAnswer, IUserAnswer } from '@interfaces/IAnswer'
import { IModalRaw, ModalType } from '@interfaces/IModal'
import { ITest } from '@interfaces/ITest'
import { RequestUtility } from '@utils/request'

import CS from '@common.module.scss'
import S from '@styles/Test.module.scss'

const Test: React.VFC<IWithAuthorizationProps> = ({ user }) => {
  const router = useRouter()
  const { testId } = router.query
  const [started, setStarted] = useState(false)
  const [test, setTest] = useState<ITest>()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [markedAnswers, setMarkedAnswers] = useState<IUserAnswer[]>([])
  const { showModal } = useModal()

  const startTest = () => {
    setStarted(true)
  }

  const shuffle = (answers: IAnswer[]) => {
    let randomIndex = 0
    const newAnswers: IAnswer[] = [...answers]
    let currentIndex = newAnswers.length
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[newAnswers[currentIndex], newAnswers[randomIndex]] = [newAnswers[randomIndex], newAnswers[currentIndex]]
    }

    return newAnswers
  }

  useEffect(() => {
    const fetchTest = async () => {
      const responseFromServer = await RequestUtility.requestToServer<ITest>(
        'GET',
        `/study/test/${testId}`,
        null,
        user.token
      )
      if (responseFromServer.data) {
        const shuffledQuests = responseFromServer.data.quests.map((test) => {
          return { ...test, answers: shuffle(test.answers) }
        })
        setTest({ ...responseFromServer.data, quests: shuffledQuests })
      } else {
        router.push('/courses')
      }
    }
    fetchTest()
  }, [router.isReady])

  const setAnswer = (questId: string, answersId: string[]) => {
    if (currentQuestionIndex + 1 === test?.quests.length) {
      submitTest([...markedAnswers, { questId, answersId }])
    }
    setMarkedAnswers([...markedAnswers, { questId, answersId }])
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  const submitTest = async (answers: IUserAnswer[]) => {
    setStarted(false)
    const responseFromServer = await RequestUtility.requestToServer<IModalRaw>(
      'POST',
      `/study/submit-test`,
      { id: test?.id, answers },
      user.token
    )
    if (responseFromServer.data) {
      showModal(responseFromServer.data.message, responseFromServer.data.type)
    } else if (responseFromServer.message) {
      showModal(responseFromServer.message, ModalType.Error)
    }
    setMarkedAnswers([])
    setCurrentQuestionIndex(0)
  }

  const isTestEnd = test && test.quests.length === currentQuestionIndex
  const isActiveTest = started && test && !isTestEnd
  const isTestPrepared = !started && test
  return (
    <div className={CS.pageContainer}>
      <h2 className={CS.pageTitle}>Knowledge Testing</h2>
      {isTestPrepared && (
        <Block noMargin>
          <TestInfo name={test.name} time={test.time} totalQuestions={test.quests.length} />
          <button className={`${CS.btnPrimary} ${S.btnStartTest}`} onClick={startTest}>
            Start test
          </button>
        </Block>
      )}
      {isActiveTest && (
        <Question
          question={test.quests[currentQuestionIndex]}
          totalQuestions={test.quests.length}
          currentQuestion={currentQuestionIndex}
          setAnswer={setAnswer}
          time={test.time / test.quests.length}
        />
      )}
    </div>
  )
}

export default withAuthorization(Test, 'Knowledge Testing')
