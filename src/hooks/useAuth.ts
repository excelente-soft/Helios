import { useAppDispatch } from '@hooks/app'
import { useUser } from '@hooks/useUser'
import { IUserCredentials, IUserLogin, IUserSignup } from '@interfaces/IUser'
import { setUser } from '@store/user/userSlice'
import { HeliosAPI } from '@utils/api'

export const useAuth = () => {
  const { saveToStorage, saveRefreshTokenToStorage } = useUser()
  const dispatch = useAppDispatch()

  const login = async (credentials: IUserCredentials) => {
    const response = await HeliosAPI.postRequest<IUserLogin, IUserCredentials>('/login', credentials)
    if (response.data) {
      saveToStorage(response.data.user)
      saveRefreshTokenToStorage(response.data.refreshToken)
      dispatch(setUser(response.data.user))
    }
    return response
  }

  const signup = async (userData: IUserSignup) => {
    const response = await HeliosAPI.postRequest<IUserLogin, IUserSignup>('/signup', userData)
    if (response.data) {
      saveToStorage(response.data.user)
      saveRefreshTokenToStorage(response.data.refreshToken)
      dispatch(setUser(response.data.user))
    }
    return response
  }

  return { login, signup }
}
