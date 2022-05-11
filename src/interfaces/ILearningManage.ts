import { IAnswer } from '@interfaces/IAnswer'
import { IPractice } from '@interfaces/IPractice'
import { IQuest } from '@interfaces/IQuest'

export interface ILearningManageContext {
  deleteTask: (taskId: string) => void
  changeTaskName: (taskId: string, name: string) => void
  changeOrder: () => Promise<void>
  addQuest: (taskId: string, quest: IQuest) => void
  deleteQuest: (questId: string) => void
  changeQuest: (questId: string, question: string) => void
  changeAnswer: (questId: string, answerId: string, answer: string, isCorrect: boolean) => void
  deleteAnswer: (questId: string, answerId: string) => void
  addAnswer: (questId: string, answer: IAnswer) => void
  changePractice: (taskId: string, practice: IPractice) => void
  changeLecture: (lectureId: string, text: string, name: string) => void
  changeTest: (taskId: string, name: string, time: number) => void
}
