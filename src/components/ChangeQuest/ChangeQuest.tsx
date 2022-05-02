import { useContext, useState } from 'react'

import { IWithNotificationProps, withNotification } from '@HOC/withNotification'
import ChangeAnswer from '@components/ChangeAnswer/ChangeAnswer'
import { LearningManageContext } from '@contexts/LearningManage'
import { IAnswer } from '@interfaces/IAnswer'
import { IQuest, IQuestSolo } from '@interfaces/IQuest'
import { RequestUtility } from '@utils/request'

import S from './ChangeQuest.module.scss'
import CS from '@common.module.scss'

interface IChangeQuestProps extends IWithNotificationProps {
  quest: IQuest
  token: string
}

const ChangeQuest: React.VFC<IChangeQuestProps> = ({ quest, token, notification, setAnswerFromServer }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [questText, setQuestText] = useState(quest.question)
  const { changeQuest, deleteQuest, changeAnswer, deleteAnswer, addAnswer } = useContext(LearningManageContext)

  const changeQuestNameHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setQuestText(e.currentTarget.value)
  }

  const changeQuestHandler = async () => {
    const changeQuestResult = await RequestUtility.requestToServer<IQuestSolo>(
      'PUT',
      `/change-question`,
      { id: quest.id, question: questText },
      token
    )
    if (changeQuestResult.data) {
      changeQuest(quest.id, changeQuestResult.data.question)
      setAnswerFromServer({ message: 'Question successfully changed', isError: false })
    } else if (changeQuestResult.message) {
      setAnswerFromServer({ message: changeQuestResult.message, isError: true })
    }
  }

  const toggleDropdownHandler = () => {
    setIsOpen(!isOpen)
  }

  const deleteQuestHandler = async () => {
    const deleteQuestResult = await RequestUtility.requestToServer('DELETE', `/delete-quest`, { id: quest.id }, token)
    if (deleteQuestResult.data) {
      deleteQuest(quest.id)
    }
  }

  const changeAnswerHandler = (answerId: string, answer: string, isCorrect: boolean) => {
    changeAnswer(quest.id, answerId, answer, isCorrect)
  }

  const deleteAnswerHandler = (answerId: string) => {
    deleteAnswer(quest.id, answerId)
  }

  const createAnswerHandler = async () => {
    const createAnswerResult = await RequestUtility.requestToServer<IAnswer>(
      'POST',
      `/create-answer`,
      { id: quest.id },
      token
    )
    if (createAnswerResult.data) {
      addAnswer(quest.id, createAnswerResult.data)
    }
  }

  return (
    <div className={S.questContainer}>
      <div className={S.questDisplay}>
        <h4 className={S.question}>{quest.question}</h4>
        <span
          className={`${S.dropdownIcon} ${isOpen ? S.dropdownIconReverse : ''}`}
          onClick={toggleDropdownHandler}
        ></span>
      </div>
      {isOpen && (
        <div>
          <input
            id="field[question]"
            type="input"
            className={`${CS.field} ${S.questionField}`}
            placeholder="Question text"
            value={questText}
            onChange={changeQuestNameHandler}
            name="question"
          />
          <h5 className={S.answersTitle}>Answers:</h5>
          <div className={S.answersContainer}>
            {quest.answers.map((answer) => (
              <ChangeAnswer
                key={answer.id}
                answer={answer}
                token={token}
                changeAnswer={changeAnswerHandler}
                deleteAnswer={deleteAnswerHandler}
                setAnswerFromServer={setAnswerFromServer}
              />
            ))}
          </div>
          {notification}
          <div className={S.control}>
            <button className={`${CS.btnPrimary} ${S.btnChange}`} onClick={changeQuestHandler}>
              Change question
            </button>
            <button className={`${CS.btnSecondary} ${S.btnChange}`} onClick={createAnswerHandler}>
              Create answer
            </button>
            <button className={`${CS.btnThird} ${S.btnDelete}`} onClick={deleteQuestHandler}>
              Delete quest
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default withNotification(ChangeQuest)
