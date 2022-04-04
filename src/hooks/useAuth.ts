import { STORAGE_REFRESH_TOKEN, STORAGE_USER } from '@constants'
import { useAppDispatch } from '@hooks/app'
import { IUser, IUserCredentials, IUserLogin, IUserSignup } from '@interfaces/IUser'
import { setUser } from '@store/user/userSlice'
import { HeliosAPI } from '@utils/api'
import { saveItemToStorage } from '@utils/storage'

export const useAuth = () => {
  const dispatch = useAppDispatch()

  const login = async (credentials: IUserCredentials) => {
    const response = await HeliosAPI.postRequest<IUserLogin, IUserCredentials>('/login', credentials)
    if (response.data) {
      saveItemToStorage<IUser>(STORAGE_USER, response.data.user)
      saveItemToStorage<string>(STORAGE_REFRESH_TOKEN, response.data.refreshToken)
      dispatch(setUser(response.data.user))
    }
    return response
  }

  const signup = async (userData: IUserSignup) => {
    const response = await HeliosAPI.postRequest<IUserLogin, IUserSignup>('/signup', userData)
    if (response.data) {
      saveItemToStorage<IUser>(STORAGE_USER, response.data.user)
      saveItemToStorage<string>(STORAGE_REFRESH_TOKEN, response.data.refreshToken)
      dispatch(setUser(response.data.user))
    }
    return response
  }

  return { login, signup }
}
