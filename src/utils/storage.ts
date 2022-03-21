export const getItemFromStorage = <T>(key: string, defaultValue: T | null = null) => {
  try {
    const item = window.localStorage.getItem(key) || ''
    return item ? (JSON.parse(item) as T) : defaultValue
  } catch (error) {
    return defaultValue
  }
}

export const saveItemToStorage = <T>(key: string, value: T) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.log(`Cannot set an item to local storage`)
    return false
  }
}
