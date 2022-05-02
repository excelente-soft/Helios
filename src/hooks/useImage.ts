import { Dispatch, RefObject, SetStateAction, useState } from 'react'

import { ReaderUtility } from '@utils/reader'

type UseImageType = [
  string,
  () => void,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  Dispatch<SetStateAction<string>>
]

export const useImage = (inputRef: RefObject<HTMLInputElement>, initImage = ''): UseImageType => {
  const [image, setImage] = useState(initImage)

  const uploadImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files
    if (!file) {
      return
    }
    ReaderUtility.readFile(file[0], uploadImageSetter)
    e.target.value = ''
  }

  const uploadImageSetter = (file: { message?: string; data?: string }) => {
    if (file.data) {
      setImage(file.data)
    }
  }

  const uploadImageTrigger = () => {
    inputRef.current?.click()
  }

  return [image, uploadImageTrigger, uploadImageHandler, setImage]
}
