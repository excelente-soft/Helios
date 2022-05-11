import { ReactNode } from 'react'

import { useAppDispatch } from '@hooks/app'
import { ModalType } from '@interfaces/IModal'
import { clearModal, setModal } from '@store/modal/modalSlice'

export const useModal = () => {
  const dispatch = useAppDispatch()

  const showModal = (content: ReactNode, type: ModalType) => {
    dispatch(setModal({ content, type }))
  }

  const hideModal = () => {
    dispatch(clearModal())
  }

  return { showModal, hideModal }
}
