import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@hooks/app'
import { IUserLogin } from '@interfaces/IUser'
import { setUser } from '@store/user/userSlice'
import { getItemFromStorage, saveItemToStorage } from '@utils/storage'

export const useUser = () => {
  const user = useAppSelector(({ user }) => user)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  const restoreFromStorage = () => {
    console.log('User data was restored from storage')
    const userFromStorage = getItemFromStorage<IUserLogin>('user')
    if (userFromStorage) {
      dispatch(setUser(userFromStorage))
    }
    setLoading(false)
  }

  const saveToStorage = (userData: IUserLogin) => {
    saveItemToStorage<IUserLogin>('user', userData)
  }

  return { user, loading, restoreFromStorage, saveToStorage }
}
