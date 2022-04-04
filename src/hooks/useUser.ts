import { STORAGE_REFRESH_TOKEN, STORAGE_USER } from '@constants'
import { useAppDispatch, useAppSelector } from '@hooks/app'
import { useClear } from '@hooks/useClear'
import { IUser, IUserLogin } from '@interfaces/IUser'
import { setUser } from '@store/user/userSlice'
import { HeliosAPI } from '@utils/api'
import { getItemFromStorage, saveItemToStorage } from '@utils/storage'

export const useUser = () => {
  const user = useAppSelector(({ user }) => user)
  const dispatch = useAppDispatch()
  const { clearUser } = useClear()

  const refresh = async (refreshToken: string) => {
    const response = await HeliosAPI.postRequest<IUserLogin, { refreshToken: string }>('/refresh', {
      refreshToken,
    })
    if (response.data) {
      saveItemToStorage<IUser>(STORAGE_USER, response.data.user)
      saveItemToStorage<string>(STORAGE_REFRESH_TOKEN, response.data.refreshToken)
      dispatch(setUser(response.data.user))
    }
    return response
  }

  const restoreFromStorage = async () => {
    const userFromStorage = getItemFromStorage<IUser>(STORAGE_USER)
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
      if (!responseFromServer.data) {
        const refreshToken = getItemFromStorage<string>(STORAGE_REFRESH_TOKEN) || ''
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
