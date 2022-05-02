import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { memo } from 'react'

import { useAppDispatch, useAppSelector } from '@hooks/app'
import errorIcon from '@images/error.svg'
import infoIcon from '@images/info.svg'
import successIcon from '@images/success.svg'
import { clearModal } from '@store/modal/modalSlice'

import S from './Modal.module.scss'

const modalVariants = {
  visible: { opacity: 1, y: 0, x: 0 },
  hidden: { opacity: 0, y: -50 },
}

const Modal = () => {
  const dispatch = useAppDispatch()
  const content = useAppSelector((state) => state.modal.content)
  const type = useAppSelector((state) => state.modal.type)

  const modalCloseHandler = () => {
    dispatch(clearModal())
  }

  const modalCloseRestrict = (e: React.SyntheticEvent) => {
    e.stopPropagation()
  }

  const modalIcon = type === 'Error' ? errorIcon : type === 'Info' ? infoIcon : successIcon
  return (
    <>
      {content && (
        <div onClick={modalCloseHandler} className={S.modalBackground}>
          <motion.div
            onClick={modalCloseRestrict}
            className={S.modalContainer}
            initial="hidden"
            animate="visible"
            variants={modalVariants}
          >
            <div className={S.typeImage}>
              <Image src={modalIcon} height={128} width={128} alt={`${type} icon`} />
            </div>
            <div>{content}</div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export const MemoizedModal = memo(Modal)
