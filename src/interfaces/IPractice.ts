import { ITask } from '@interfaces/ITask'

export interface IPractice extends ITask {
  objective: string
  objectiveType: ObjectiveType
  link: string
}

export enum ObjectiveType {
  None = 'none',
  Figma = 'figma',
  Codesandbox = 'codesandbox',
}
