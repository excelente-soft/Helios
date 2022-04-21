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

export interface ICourseRaw extends Omit<ICourse, 'creationDate'> {
  creationDate: string
}
