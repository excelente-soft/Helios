import { IGrade } from '@interfaces/IGrade'
import { ITask } from '@interfaces/ITask'

export interface ICourse {
  id: string
  name: string
  shortDescription: string
  description: string
  price: number
  image: string
  author: string
  creationDate: Date
  targetAccessLevel: number
}

export interface ICourseWithProgress extends ICourse {
  progress: number
  hasCertificate: boolean
}

export interface ICourseRaw extends Omit<ICourse, 'creationDate'> {
  creationDate: string
}

export interface IManageRaw {
  course: ICourseRaw
  tests: ITask[]
  lectures: ITask[]
  practices: ITask[]
}

export interface IManageWithGradesRaw extends IManageRaw {
  grades: IGrade[]
}
