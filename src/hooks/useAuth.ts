import { IUser, IUserCredentials, IUserLogin } from '@interfaces/IUser'
import { HeliosAPI } from '@utils/api'

export const useAuth = () => {
  const login = async (credentials: IUserCredentials) => {
    const response = await HeliosAPI.postRequest<IUserLogin, IUserCredentials>('/login', credentials)
    return response
  }

  const signup = async (userData: IUser) => {
    const response = await HeliosAPI.postRequest<IUserLogin, IUser>('/login', userData)
    return response
  }

  return { login, signup }
}
