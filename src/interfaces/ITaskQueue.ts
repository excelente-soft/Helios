import { IPractice } from '@interfaces//IPractice'

export interface ITaskQueue {
  id: string
  link: string
  practiceId: string
  position: number
  createdAt: Date
  practice: IPractice
}

export interface ITaskQueueRaw {
  id: string
  link: string
  practiceId: string
  position: number
  createdAt: string
  practice: IPractice
}
