export interface IAnswer {
  id: string
  answer: string
  isCorrect: boolean
  questId: string
}

export interface IUserAnswer {
  questId: string
  answersId: string[]
}
