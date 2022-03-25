import { useAppDispatch, useAppSelector } from '@hooks/app'
import { IUser, IUserLogin } from '@interfaces/IUser'
import { setUser } from '@store/user/userSlice'
import { HeliosAPI } from '@utils/api'
import { getItemFromStorage, removeItemFromStorage, saveItemToStorage } from '@utils/storage'

export const useUser = () => {
  const user = useAppSelector(({ user }) => user)
  const dispatch = useAppDispatch()

  const refresh = async (refreshToken: string) => {
    const response = await HeliosAPI.postRequest<IUserLogin, { refreshToken: string }>('/refresh', {
      refreshToken,
    })
    if (response.data) {
      saveToStorage(response.data.user)
      saveRefreshTokenToStorage(response.data.refreshToken)
      dispatch(setUser(response.data.user))
    }
    return response
  }

  const restoreFromStorage = async () => {
    const userFromStorage = getItemFromStorage<IUser>('user')
    if (userFromStorage) {
      const validatedUser = await validate(userFromStorage)
      if (validatedUser) {
        dispatch(setUser(userFromStorage))
      }
    }

    console.log('~ User data was restored from storage ~')
  }

  const validate = async (probUser?: IUser | null) => {
    const userToValidate = probUser ? probUser : user
    if (userToValidate) {
      const responseFromServer = await HeliosAPI.postRequest<boolean, object>('/validate', {}, userToValidate.token)
      console.log(responseFromServer.data)
      if (!responseFromServer.data) {
        const refreshToken = getItemFromStorage<string>('refreshToken') || ''
        const refreshResponseFromServer = await refresh(refreshToken)
        if (!refreshResponseFromServer.data) {
          clear()
        }
      }
      return userToValidate
    }

    return null
  }

  const saveToStorage = (userData: IUser) => {
    saveItemToStorage<IUser>('user', userData)
  }

  const clear = () => {
    dispatch(setUser(null))
    removeItemFromStorage('user')
    removeItemFromStorage('refreshToken')
  }

  const saveRefreshTokenToStorage = (refreshToken: string) => {
    saveItemToStorage<string>('refreshToken', refreshToken)
  }

  return { user, restoreFromStorage, validate, saveRefreshTokenToStorage, saveToStorage, clear }
}
