import { ICourse } from './ICourse'
import { IGrade } from './IGrade'
import { ITask } from './ITask'

export interface IProgress {
  course: ICourse
  grades: IGrade[]
  lectures: ITask[]
  practicies: ITask[]
  tests: ITask[]
}
