import { STORAGE_REFRESH_TOKEN, STORAGE_USER } from '@constants'
import { useAppDispatch } from '@hooks/app'
import { setUser } from '@store/user/userSlice'
import { StorageUtility } from '@utils/storage'

export const useClear = () => {
  const dispatch = useAppDispatch()

  const clearUser = () => {
    dispatch(setUser(null))
    StorageUtility.removeItemFromStorage(STORAGE_USER)
    StorageUtility.removeItemFromStorage(STORAGE_REFRESH_TOKEN)
  }

  return { clearUser }
}
