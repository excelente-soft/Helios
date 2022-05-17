export interface ITask {
  id: string
  name: string
  position: number
  courseId: string
  type: TaskType
}

export enum TaskType {
  Lecture = 'lecture',
  Test = 'test',
  Practice = 'practice',
}

export interface ITaskWithGrade extends ITask {
  grade: number
}
