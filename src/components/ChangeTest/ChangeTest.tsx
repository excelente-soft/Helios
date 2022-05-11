import { useContext, useState } from 'react'

import { IWithNotificationProps, withNotification } from '@HOC/withNotification'
import ChangeQuest from '@components/ChangeQuest/ChangeQuest'
import { LearningManageContext } from '@contexts/LearningManage'
import { IQuestSolo } from '@interfaces/IQuest'
import { ITest } from '@interfaces/ITest'
import { RequestUtility } from '@utils/request'

import S from './ChangeTest.module.scss'
import CS from '@common.module.scss'

interface IChangeTest extends IWithNotificationProps {
  test: ITest
  token: string
}

const ChangeTest: React.VFC<IChangeTest> = ({ test, token, notification, setAnswerFromServer }) => {
  const [name, setName] = useState(test.name)
  const [time, setTime] = useState(test.time)
  const { changeTest, deleteTask, addQuest } = useContext(LearningManageContext)

  const changeNameHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const changeTimeHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setTime(+e.currentTarget.value)
  }

  const changeTestHandler = async () => {
    const changeTestNameResult = await RequestUtility.requestToServer<Omit<ITest, 'quests'>>(
      'PUT',
      `/change-test`,
      { id: test.id, name, time },
      token
    )
    if (changeTestNameResult.data) {
      changeTest(test.id, changeTestNameResult.data.name, changeTestNameResult.data.time)
      setAnswerFromServer({ message: 'Test successfully changed', isError: false })
    } else if (changeTestNameResult.message) {
      setAnswerFromServer({ message: changeTestNameResult.message, isError: true })
    }
  }

  const deleteTestHandler = async () => {
    const deleteTestResult = await RequestUtility.requestToServer('DELETE', `/delete-test`, { id: test.id }, token)
    if (deleteTestResult.message) {
      setAnswerFromServer({ message: deleteTestResult.message, isError: true })
    } else if (deleteTestResult.data) {
      deleteTask(test.id)
    }
  }

  const createQuestHandler = async () => {
    const createQuestResult = await RequestUtility.requestToServer<IQuestSolo>(
      'POST',
      `/create-quest`,
      { testId: test.id },
      token
    )
    if (createQuestResult.data) {
      addQuest(test.id, { ...createQuestResult.data, answers: [] })
    } else if (createQuestResult.message) {
      setAnswerFromServer({ message: createQuestResult.message, isError: true })
    }
  }

  return (
    <div className={S.changeTestContainer}>
      <input
        type="input"
        className={`${CS.field} ${S.testName}`}
        placeholder="Test name"
        value={name}
        onChange={changeNameHandler}
        name="test"
      />
      <input
        type="input"
        className={CS.field}
        placeholder="Time for test (in seconds)"
        value={time}
        onChange={changeTimeHandler}
        name="time"
      />
      <div className={S.quests}>
        {test.quests.length > 0 &&
          test.quests.map((quest) => <ChangeQuest key={quest.id} quest={quest} token={token} />)}
      </div>
      {notification}
      <div className={S.control}>
        <button className={`${CS.btnPrimary} ${S.btnChange}`} onClick={changeTestHandler}>
          Update test
        </button>
        <button className={`${CS.btnSecondary} ${S.btnChange}`} onClick={createQuestHandler}>
          Create question
        </button>
        <button className={`${CS.btnThird} ${S.btnDelete}`} onClick={deleteTestHandler}>
          Delete test
        </button>
      </div>
    </div>
  )
}

export default withNotification(ChangeTest)
