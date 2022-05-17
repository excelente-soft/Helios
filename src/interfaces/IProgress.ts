import { ICourse } from '@interfaces/ICourse'
import { IGrade } from '@interfaces/IGrade'
import { ITask } from '@interfaces/ITask'

export interface IProgress {
  course: ICourse
  grades: IGrade[]
  lectures: ITask[]
  practicies: ITask[]
  tests: ITask[]
}
