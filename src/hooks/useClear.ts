import { STORAGE_REFRESH_TOKEN, STORAGE_USER } from '@constants'
import { useAppDispatch } from '@hooks/app'
import { setUser } from '@store/user/userSlice'
import { removeItemFromStorage } from '@utils/storage'

export const useClear = () => {
  const dispatch = useAppDispatch()

  const clearUser = () => {
    dispatch(setUser(null))
    removeItemFromStorage(STORAGE_USER)
    removeItemFromStorage(STORAGE_REFRESH_TOKEN)
  }

  return { clearUser }
}
