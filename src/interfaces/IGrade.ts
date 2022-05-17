import { TaskType } from '@interfaces/ITask'

export interface IGrade {
  id: string
  type: TaskType
  taskId: string
  rating: number
  studentId: string
  createdAt: string
}
