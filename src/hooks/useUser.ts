import { STORAGE_REFRESH_TOKEN } from '@constants'
import { useAppDispatch, useAppSelector } from '@hooks/app'
import { useClear } from '@hooks/useClear'
import { IUser, IUserLogin } from '@interfaces/IUser'
import { setUser } from '@store/user/userSlice'
import { RequestUtility } from '@utils/request'
import { StorageUtility } from '@utils/storage'

export const useUser = () => {
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const { clearUser } = useClear()

  const refresh = async (refreshToken: string) => {
    const responseFromServer = await RequestUtility.requestToServer<IUserLogin>('POST', '/refresh', {
      refreshToken,
    })
    if (responseFromServer.data) {
      StorageUtility.saveUserToStorage(responseFromServer.data.user)
      StorageUtility.saveItemToStorage<string>(STORAGE_REFRESH_TOKEN, responseFromServer.data.refreshToken)
      dispatch(setUser(responseFromServer.data.user))
    }
    return responseFromServer
  }

  const validate = async (probUser?: IUser | null) => {
    const userToValidate = probUser ? probUser : user
    if (userToValidate) {
      const responseFromServer = await RequestUtility.requestToServer('POST', '/validate', null, userToValidate.token)
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

  return { user, validate }
}
