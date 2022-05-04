import { STORAGE_REFRESH_TOKEN, STORAGE_USER } from '@constants'
import { useAppDispatch } from '@hooks/app'
import { IRole } from '@interfaces/IRole'
import { IUser, IUserCredentials, IUserLogin, IUserSignup, IUserStorage } from '@interfaces/IUser'
import { setUser } from '@store/user/userSlice'
import { RequestUtility } from '@utils/request'
import { StorageUtility } from '@utils/storage'

export const useAuth = () => {
  const dispatch = useAppDispatch()

  const login = async (credentials: IUserCredentials) => {
    const responseFromServer = await RequestUtility.requestToServer<IUserLogin>('POST', '/login', credentials)
    if (responseFromServer.data) {
      StorageUtility.saveUserToStorage(responseFromServer.data.user)
      StorageUtility.saveItemToStorage<string>(STORAGE_REFRESH_TOKEN, responseFromServer.data.refreshToken)
      dispatch(setUser(responseFromServer.data.user))
    }
    return responseFromServer
  }

  const signup = async (userData: IUserSignup) => {
    const responseFromServer = await RequestUtility.requestToServer<IUserLogin>('POST', '/signup', userData)
    if (responseFromServer.data) {
      StorageUtility.saveUserToStorage(responseFromServer.data.user)
      StorageUtility.saveItemToStorage<string>(STORAGE_REFRESH_TOKEN, responseFromServer.data.refreshToken)
      dispatch(setUser(responseFromServer.data.user))
    }
    return responseFromServer
  }

  const restoreFromStorage = async (): Promise<IUser | null> => {
    const userFromStorage = StorageUtility.getItemFromStorage<IUserStorage>(STORAGE_USER)
    if (userFromStorage) {
      const { avatar, email, name, nickname, secondName, type } = userFromStorage
      const responseFromServer = await RequestUtility.requestToServer<IRole>(
        'POST',
        '/my-role',
        { avatar, email, name, nickname, secondName, type },
        userFromStorage.token
      )
      if (responseFromServer.data) {
        return { ...userFromStorage, role: responseFromServer.data }
      } else {
        StorageUtility.removeItemFromStorage(STORAGE_USER)
        StorageUtility.removeItemFromStorage(STORAGE_REFRESH_TOKEN)
        return null
      }
    }
    return null
  }

  return { login, signup, restoreFromStorage }
}
