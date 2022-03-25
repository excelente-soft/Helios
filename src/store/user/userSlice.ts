import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IUser } from '@interfaces/IUser'

export type UserState = IUser | null

const initialState: IUser | null = null as UserState

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<IUser | null>) => {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
