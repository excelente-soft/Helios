export interface IFeedback {
  id: string
  rating: number
  review: string
  createdAt: Date
}

export interface IFeedbackRaw {
  id: string
  rating: number
  review: string
  createdAt: string
}
