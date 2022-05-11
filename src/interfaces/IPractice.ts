import { ITask } from '@interfaces/ITask'

export interface IPractice extends ITask {
  objective: string
  objectiveType: 'codesandbox' | 'figma' | 'none'
  link: string
}
