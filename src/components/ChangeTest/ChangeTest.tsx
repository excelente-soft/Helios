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
  const { changeTaskName, deleteTask, addQuest } = useContext(LearningManageContext)

  const changeNameHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const changeTestNameHandler = async () => {
    const changeTestNameResult = await RequestUtility.requestToServer<Omit<ITest, 'quests'>>(
      'PUT',
      `/change-test-name`,
      { id: test.id, name },
      token
    )
    if (changeTestNameResult.data) {
      changeTaskName(test.id, changeTestNameResult.data.name)
      setAnswerFromServer({ message: 'Test name successfully changed', isError: false })
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
      `/create-question`,
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
        id="field[test]"
        type="input"
        className={CS.field}
        placeholder="Test name"
        value={name}
        onChange={changeNameHandler}
        name="test"
      />
      <div className={S.quests}>
        {test.quests.length > 0 &&
          test.quests.map((quest) => <ChangeQuest key={quest.id} quest={quest} token={token} />)}
      </div>
      {notification}
      <div className={S.control}>
        <button className={`${CS.btnPrimary} ${S.btnChange}`} onClick={changeTestNameHandler}>
          Change name
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
