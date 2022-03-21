import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IUserLogin } from '@interfaces/IUser'

export type UserState = IUserLogin | null

const initialState: IUserLogin | null = null as UserState

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserLogin>) => {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
