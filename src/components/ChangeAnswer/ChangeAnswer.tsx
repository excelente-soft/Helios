import React, { useState } from 'react'

import { IAnswer } from '@interfaces/IAnswer'
import { INotification } from '@interfaces/INotification'
import { RequestUtility } from '@utils/request'

import S from './ChangeAnswer.module.scss'
import CS from '@common.module.scss'

interface IChangeAnswerProps {
  answer: IAnswer
  token: string
  changeAnswer: (answerId: string, answer: string, isCorrect: boolean) => void
  deleteAnswer: (answerId: string) => void
  setAnswerFromServer: (answerFromServer: INotification) => void
}

const ChangeAnswer: React.VFC<IChangeAnswerProps> = ({
  answer,
  token,
  changeAnswer,
  deleteAnswer,
  setAnswerFromServer,
}) => {
  const [answerText, setAnswerText] = useState(answer.answer)
  const [isCorrect, setIsCorrect] = useState(answer.isCorrect)

  const changeAnswerTextHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setAnswerText(e.currentTarget.value)
  }

  const changeCorrectHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setIsCorrect(e.currentTarget.checked)
  }

  const changeAnswerHandler = async () => {
    const changeAnswerResult = await RequestUtility.requestToServer<IAnswer>(
      'PUT',
      `/change-answer`,
      { id: answer.id, answer: answerText, isCorrect },
      token
    )
    if (changeAnswerResult.data) {
      changeAnswer(answer.id, changeAnswerResult.data.answer, changeAnswerResult.data.isCorrect)
      setAnswerFromServer({ message: 'Answer successfully changed', isError: false })
    } else if (changeAnswerResult.message) {
      setAnswerFromServer({ message: changeAnswerResult.message, isError: true })
    }
  }

  const deleteAnswerHandler = async () => {
    const deleteAnswerResult = await RequestUtility.requestToServer(
      'DELETE',
      `/delete-answer`,
      { id: answer.id },
      token
    )
    if (deleteAnswerResult.data) {
      deleteAnswer(answer.id)
    }
  }

  return (
    <div className={S.answerContainer}>
      <input
        type="input"
        className={`${CS.field} ${S.answerField}`}
        placeholder="Answer text"
        value={answerText}
        onChange={changeAnswerTextHandler}
        name="answer"
      />
      <input type="checkbox" onChange={changeCorrectHandler} name="question" checked={isCorrect} />
      <div className={S.controls}>
        <button className={`${CS.btnPrimary} ${S.btnControl}`} onClick={changeAnswerHandler}>
          Update
        </button>
        <button className={`${CS.btnThird} ${S.btnControl}`} onClick={deleteAnswerHandler}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default ChangeAnswer
