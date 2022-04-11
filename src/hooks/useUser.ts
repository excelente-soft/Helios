import { STORAGE_REFRESH_TOKEN, STORAGE_USER } from '@constants'
import { useAppDispatch, useAppSelector } from '@hooks/app'
import { useClear } from '@hooks/useClear'
import { IUser, IUserLogin } from '@interfaces/IUser'
import { setUser } from '@store/user/userSlice'
import { RequestUtility } from '@utils/request'
import { StorageUtility } from '@utils/storage'

export const useUser = () => {
  const user = useAppSelector(({ user }) => user)
  const dispatch = useAppDispatch()
  const { clearUser } = useClear()

  const refresh = async (refreshToken: string) => {
    const responseFromServer = await RequestUtility.requestToServer<IUserLogin, { refreshToken: string }>(
      'POST',
      '/refresh',
      {
        refreshToken,
      }
    )
    if (responseFromServer.data) {
      StorageUtility.saveItemToStorage<IUser>(STORAGE_USER, responseFromServer.data.user)
      StorageUtility.saveItemToStorage<string>(STORAGE_REFRESH_TOKEN, responseFromServer.data.refreshToken)
      dispatch(setUser(responseFromServer.data.user))
    }
    return responseFromServer
  }

  const restoreFromStorage = async () => {
    const userFromStorage = StorageUtility.getItemFromStorage<IUser>(STORAGE_USER)
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
      const responseFromServer = await RequestUtility.requestToServer<boolean, object>(
        'POST',
        '/validate',
        {},
        userToValidate.token
      )
      if (!responseFromServer.data) {
        const refreshToken = StorageUtility.getItemFromStorage<string>(STORAGE_REFRESH_TOKEN) || ''
        const refreshResponseFromServer = await refresh(refreshToken)
        if (!refreshResponseFromServer.data) {
          clearUser()
        }
      }
      return userToValidate
    }

    return null
  }

  return { user, restoreFromStorage, validate }
}
