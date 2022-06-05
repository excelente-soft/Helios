import { STORAGE_USER } from '@constants'
import { IUser, IUserStorage } from '@interfaces/IUser'

const getItemFromStorage = <T>(key: string, defaultValue: T | null = null) => {
  try {
    const item = window.localStorage.getItem(key) || ''
    return item ? (JSON.parse(item) as T) : defaultValue
  } catch (error) {
    return defaultValue
  }
}

const saveItemToStorage = <T>(key: string, value: T) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    return false
  }
}

const removeItemFromStorage = (key: string) => {
  try {
    window.localStorage.removeItem(key)
    return true
  } catch (error) {
    return false
  }
}

const saveUserToStorage = (user: IUser | IUserStorage) => {
  const { nickname, avatar, email, name, secondName, token, type } = user
  return saveItemToStorage<IUserStorage>(STORAGE_USER, { nickname, avatar, email, name, secondName, token, type })
}

export const StorageUtility = {
  getItemFromStorage,
  saveItemToStorage,
  removeItemFromStorage,
  saveUserToStorage,
}
