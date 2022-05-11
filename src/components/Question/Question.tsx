/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'

import Block from '@components/Block/Block'
import ProgressBar from '@components/ProgressBar/ProgressBar'
import { IQuest } from '@interfaces/IQuest'

import S from './Question.module.scss'
import CS from '@common.module.scss'

interface IQuestionProps {
  question: IQuest
  totalQuestions: number
  currentQuestion: number
  time: number
  setAnswer: (questId: string, answersId: string[]) => void
}

const Question: React.VFC<IQuestionProps> = ({ question, totalQuestions, currentQuestion, setAnswer, time }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([])
  const timer = useRef<number>()

  const nextQuestionHandler = () => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    setAnswer(question.id, selectedAnswer)
    setSelectedAnswer([])
  }

  useEffect(() => {
    timer.current = +setTimeout(nextQuestionHandler, time * 1000)
    return () => clearTimeout(timer.current)
  }, [question])

  const toggleAnswer = (answerId: string) => {
    if (selectedAnswer.includes(answerId)) {
      setSelectedAnswer(selectedAnswer.filter((id) => id !== answerId))
    } else {
      setSelectedAnswer([...selectedAnswer, answerId])
    }
  }

  return (
    <Block>
      <h3 className={`${CS.subtitle} ${S.currentQuestion}`}>
        {currentQuestion + 1} / {totalQuestions} questions
      </h3>
      <div className={S.timerBar}>
        <ProgressBar key={currentQuestion} percent={100} duration={time} />
      </div>
      <h2 className={S.question}>{question.question}</h2>
      <div className={S.questionContainer}>
        {question.answers.map((answer) => (
          <button
            key={answer.id}
            type="button"
            className={`${CS.btnSecondary} ${S.answer} ${selectedAnswer.includes(answer.id) ? S.activeAnswer : ''}`}
            onClick={() => toggleAnswer(answer.id)}
          >
            {answer.answer}
          </button>
        ))}
      </div>
      <div className={S.nextContainer}>
        <button className={`${CS.btnPrimary} ${CS.btnBasicSize}`} onClick={nextQuestionHandler}>
          Next
        </button>
      </div>
    </Block>
  )
}

export default Question
