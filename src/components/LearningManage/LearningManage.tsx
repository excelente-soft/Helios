import { Reorder } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'

import Block from '@components/Block/Block'
import ControlledTask from '@components/ControlledTask/ControlledTask'
import { LearningManageContext } from '@contexts/LearningManage'
import { IAnswer } from '@interfaces/IAnswer'
import { IPractice } from '@interfaces/IPractice'
import { IQuest } from '@interfaces/IQuest'
import { ITask } from '@interfaces/ITask'
import { ITest } from '@interfaces/ITest'
import { RequestUtility } from '@utils/request'

import S from './LearningManage.module.scss'
import CS from '@common.module.scss'

interface ILearningManage {
  tasks: ITask[]
  token: string
  courseId: string
  setTasks: Dispatch<SetStateAction<ITask[]>>
}

const LearningManage: React.VFC<ILearningManage> = ({ tasks, token, setTasks, courseId }) => {
  const createLectureHandler = async () => {
    const createLectureResult = await RequestUtility.requestToServer<ITask>(
      'POST',
      '/create-lecture',
      { courseId },
      token
    )
    if (createLectureResult.data) {
      addTask(createLectureResult.data)
    }
  }

  const createTestHandler = async () => {
    const createTestResult = await RequestUtility.requestToServer<Omit<ITest, 'quests'>>(
      'POST',
      '/create-test',
      { courseId },
      token
    )
    if (createTestResult.data) {
      const test = { ...createTestResult.data, quests: [] }
      addTask(test)
    }
  }

  const createPracticeHandler = async () => {
    const createPracticeResult = await RequestUtility.requestToServer<IPractice>(
      'POST',
      '/create-practice',
      { courseId },
      token
    )
    if (createPracticeResult.data) {
      const practice: IPractice = { ...createPracticeResult.data }
      addTask(practice)
    }
  }

  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)
  }

  const changeLecture = (lectureId: string, text: string, name: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === lectureId) {
        return { ...task, text, name }
      }
      return task
    })
    setTasks(newTasks)
  }

  const addTask = (task: ITask) => {
    setTasks((prevTasks) => [...prevTasks, task])
  }

  const changeTaskName = (taskId: string, name: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, name }
      }
      return task
    })
    setTasks(newTasks)
  }

  const changeTest = (taskId: string, name: string, time: number) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId && task.type === 'test') {
        return { ...task, name, time }
      }
      return task
    })
    setTasks(newTasks)
  }

  const addQuest = (taskId: string, quest: IQuest) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId && task.type === 'test') {
        const newTask = { ...task } as ITest
        newTask.quests = [...newTask.quests, quest]
        return newTask
      }
      return task
    })
    setTasks(newTasks)
  }

  const deleteQuest = (questId: string) => {
    const newTasks = tasks.map((task) => {
      if (task.type === 'test') {
        const newTask = { ...task } as ITest
        newTask.quests = newTask.quests.filter((quest) => quest.id !== questId)
        return newTask
      }
      return task
    })
    setTasks(newTasks)
  }

  const changeQuest = (questId: string, question: string) => {
    const newTasks = tasks.map((task) => {
      if (task.type === 'test') {
        const newTask = { ...task } as ITest
        newTask.quests = newTask.quests.map((quest) => {
          if (quest.id === questId) {
            return { ...quest, question }
          }
          return quest
        })
        return newTask
      }
      return task
    })
    setTasks(newTasks)
  }

  const changeOrder = async () => {
    await RequestUtility.requestToServer('PUT', '/change-order', tasks, token)
  }

  const changePractice = async (taskId: string, practice: IPractice) => {
    const newTasks = tasks.map((task) => (task.id === taskId && task.type === 'practice' ? practice : task))
    setTasks(newTasks)
  }

  const deleteAnswer = (questId: string, answerId: string) => {
    const newTasks = tasks.map((task) => {
      if (task.type === 'test') {
        const newTask = { ...task } as ITest
        newTask.quests = newTask.quests.map((quest) => {
          if (quest.id === questId) {
            return { ...quest, answers: quest.answers.filter((answerItem) => answerItem.id !== answerId) }
          }
          return quest
        })
        return newTask
      }
      return task
    })
    setTasks(newTasks)
  }

  const addAnswer = (questId: string, answer: IAnswer) => {
    const newTasks = tasks.map((task) => {
      if (task.type === 'test') {
        const newTask = { ...task } as ITest
        newTask.quests = newTask.quests.map((quest) => {
          if (quest.id === questId) {
            return { ...quest, answers: [...quest.answers, answer] }
          }
          return quest
        })
        return newTask
      }
      return task
    })
    setTasks(newTasks)
  }

  const changeAnswer = (questId: string, answerId: string, answer: string, isCorrect: boolean) => {
    const newTasks = tasks.map((task) => {
      if (task.type === 'test') {
        const newTask = { ...task } as ITest
        newTask.quests = newTask.quests.map((quest) => {
          if (quest.id === questId) {
            return {
              ...quest,
              answers: quest.answers.map((answerItem) => {
                if (answerItem.id === answerId) {
                  return { ...answerItem, answer, isCorrect }
                }
                return answerItem
              }),
            }
          }
          return quest
        })
        return newTask
      }
      return task
    })
    setTasks(newTasks)
  }

  return (
    <LearningManageContext.Provider
      value={{
        deleteTask,
        changeTaskName,
        changeOrder,
        addQuest,
        deleteQuest,
        changeQuest,
        changeAnswer,
        deleteAnswer,
        addAnswer,
        changePractice,
        changeLecture,
        changeTest,
      }}
    >
      <Block noMargin>
        <h3 className={CS.subtitle}>Learning management</h3>
        <Reorder.Group className={S.taskList} axis="y" values={tasks} onReorder={setTasks}>
          {tasks.map((task) => (
            <ControlledTask key={task.id} task={task} token={token} />
          ))}
        </Reorder.Group>
        <div className={S.controls}>
          <button className={`${CS.btnPrimary} ${CS.btnBasicSize}`} onClick={createLectureHandler}>
            Create lecture
          </button>
          <button className={`${CS.btnSecondary} ${CS.btnBasicSize} ${S.btnPractice}`} onClick={createPracticeHandler}>
            Create practice
          </button>
          <button className={`${CS.btnSecondary} ${CS.btnBasicSize}`} onClick={createTestHandler}>
            Create test
          </button>
        </div>
      </Block>
    </LearningManageContext.Provider>
  )
}

export default LearningManage
