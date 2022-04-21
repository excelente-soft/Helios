import { configureStore } from '@reduxjs/toolkit'

import catalogTermsReducer from '@store/catalogTerms/catalogTermsSlice'
import modalReducer from '@store/modal/modalSlice'
import userReducer from '@store/user/userSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      catalogTerms: catalogTermsReducer,
      modal: modalReducer,
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
