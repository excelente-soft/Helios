import { ReactNode } from 'react'

import { clearModal, setModal } from '../store/modal/modalSlice'
import { useAppDispatch } from './app'

export const useModal = () => {
  const dispatch = useAppDispatch()

  const showModal = (content: ReactNode, type: 'Error' | 'Success' | 'Info') => {
    dispatch(setModal({ content, type }))
  }

  const hideModal = () => {
    dispatch(clearModal())
  }

  return { showModal, hideModal }
}
