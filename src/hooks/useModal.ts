import { ReactNode } from 'react'

import { useAppDispatch } from '@hooks/app'
import { clearModal, setModal } from '@store/modal/modalSlice'

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
