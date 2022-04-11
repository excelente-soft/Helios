import Image from 'next/image'
import { useRef, useState } from 'react'

import { Block } from '@components/Block/Block'
import { Notification } from '@components/Notification/Notification'
import { STORAGE_USER } from '@constants'
import { useAppDispatch } from '@hooks/app'
import { INotification } from '@interfaces/INotification'
import { IUser } from '@interfaces/IUser'
import { setAvatar } from '@store/user/userSlice'
import { ReaderUtility } from '@utils/reader'
import { RequestUtility } from '@utils/request'
import { StorageUtility } from '@utils/storage'

import S from './ChangeAvatar.module.scss'
import CS from '@common.module.scss'

interface IChangeAvatarProps {
  user: IUser
}

export const ChangeAvatar: React.VFC<IChangeAvatarProps> = ({ user }) => {
  const [uploadAvatarNotification, setUploadAvatarNotification] = useState<INotification>({
    message: '',
    isError: false,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  const uploadAvatarHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files
    if (!file) {
      return
    }
    ReaderUtility.readFile(file[0], uploadAvatarSubmit)
    e.target.value = ''
  }

  const uploadAvatarSubmit = async (file: { message?: string; data?: string }) => {
    if (file.data) {
      const changeAvatarResult = await RequestUtility.requestToServer<{ avatar: string }, { avatar: string }>(
        'PUT',
        '/changeAvatar',
        { avatar: file.data },
        user.token
      )
      if (changeAvatarResult.data) {
        StorageUtility.saveItemToStorage<IUser>(STORAGE_USER, { ...user, ...changeAvatarResult.data })
        dispatch(setAvatar(changeAvatarResult.data.avatar))
        setUploadAvatarNotification({ message: 'Avatar successfully changed', isError: false })
      } else if (changeAvatarResult.message) {
        setUploadAvatarNotification({ message: changeAvatarResult.message, isError: true })
      }
    } else if (file.message) {
      setUploadAvatarNotification({ message: file.message, isError: true })
      return
    }
  }

  const deleteAvatarHandler = async () => {
    uploadAvatarSubmit({ data: 'default' })
  }

  const uploadAvatarTrigger = () => {
    fileInputRef.current?.click()
  }

  return (
    <Block>
      <h3 className={CS.subtitle}>Change avatar</h3>
      <div className={S.customForm}>
        <Image
          src={user.avatar}
          alt={`${user.nickname}'s big avatar`}
          className={S.bigAvatar}
          layout="fixed"
          height={124}
          width={124}
          objectFit="cover"
        />
        <div className={S.controls}>
          <button onClick={uploadAvatarTrigger} className={`${CS.btnPrimary} ${S.uploadBtn}`}>
            Upload a new avatar
          </button>
          <input
            onChange={uploadAvatarHandler}
            className={S.hiddenFileInput}
            ref={fileInputRef}
            type="file"
            tabIndex={-1}
          />
          <p className={S.advanced}>
            You can also{' '}
            <button onClick={deleteAvatarHandler} className={S.deletePicture}>
              delete your picture
            </button>
          </p>
        </div>
      </div>
      {uploadAvatarNotification.message && <Notification answerFromServer={uploadAvatarNotification} />}
    </Block>
  )
}
