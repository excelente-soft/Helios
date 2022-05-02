import { ITask } from '@interfaces/ITask'

export interface IPractice extends ITask {
  text: string
  objective: string
  objectiveType: 'codesandbox' | 'figma' | 'none'
  link: string
}
