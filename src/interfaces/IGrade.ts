export interface IGrade {
  id: string
  type: 'lecture' | 'test' | 'practice'
  taskId: string
  rating: number
  studentId: string
}
