import { ReactNode } from 'react'

export interface IModal {
  content: ReactNode | null
  type: ModalType
}

export interface IModalRaw {
  message: string
  type: ModalType
}

export enum ModalType {
  Error = 'Error',
  Info = 'Info',
  Success = 'Success',
}
