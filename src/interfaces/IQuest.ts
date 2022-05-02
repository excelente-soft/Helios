import { IAnswer } from '@interfaces/IAnswer'

export interface IQuest {
  id: string
  question: string
  testId: string
  answers: IAnswer[]
}

export type IQuestSolo = Omit<IQuest, 'answers'>
