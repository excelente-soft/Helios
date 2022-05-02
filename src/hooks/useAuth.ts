import { STORAGE_REFRESH_TOKEN, STORAGE_USER } from '@constants'
import { useAppDispatch } from '@hooks/app'
import { IUser, IUserCredentials, IUserLogin, IUserSignup } from '@interfaces/IUser'
import { setUser } from '@store/user/userSlice'
import { RequestUtility } from '@utils/request'
import { StorageUtility } from '@utils/storage'

export const useAuth = () => {
  const dispatch = useAppDispatch()

  const login = async (credentials: IUserCredentials) => {
    const responseFromServer = await RequestUtility.requestToServer<IUserLogin>('POST', '/login', credentials)
    if (responseFromServer.data) {
      StorageUtility.saveItemToStorage<IUser>(STORAGE_USER, responseFromServer.data.user)
      StorageUtility.saveItemToStorage<string>(STORAGE_REFRESH_TOKEN, responseFromServer.data.refreshToken)
      dispatch(setUser(responseFromServer.data.user))
    }
    return responseFromServer
  }

  const signup = async (userData: IUserSignup) => {
    const responseFromServer = await RequestUtility.requestToServer<IUserLogin>('POST', '/signup', userData)
    if (responseFromServer.data) {
      StorageUtility.saveItemToStorage<IUser>(STORAGE_USER, responseFromServer.data.user)
      StorageUtility.saveItemToStorage<string>(STORAGE_REFRESH_TOKEN, responseFromServer.data.refreshToken)
      dispatch(setUser(responseFromServer.data.user))
    }
    return responseFromServer
  }

  return { login, signup }
}
