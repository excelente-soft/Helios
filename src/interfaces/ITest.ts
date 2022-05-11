import { IQuest } from '@interfaces/IQuest'
import { ITask } from '@interfaces/ITask'

export interface ITest extends ITask {
  time: number
  quests: IQuest[]
}
