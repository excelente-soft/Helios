import { configureStore } from '@reduxjs/toolkit'

import catalogTermsReducer from '@store/catalogTerms/catalogTermsSlice'
import mentorTermsReducer from '@store/mentorTerms/mentorTermsSlice'
import modalReducer from '@store/modal/modalSlice'
import userReducer from '@store/user/userSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      catalogTerms: catalogTermsReducer,
      modal: modalReducer,
      mentorTerms: mentorTermsReducer,
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
