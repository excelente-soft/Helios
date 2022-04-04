import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IUser, IUserProfile, UserTypeEnum } from '@interfaces/IUser'

export type UserState = IUser | null

const initialState: IUser | null = null as UserState

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<IUser | null>) => {
      return action.payload
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      if (state) {
        state.avatar = action.payload
      }
    },
    setType: (state, action: PayloadAction<UserTypeEnum>) => {
      if (state) {
        state.type = action.payload
      }
    },
    setProfile: (state, action: PayloadAction<IUserProfile>) => {
      if (state) {
        state.name = action.payload.name
        state.secondName = action.payload.secondName
        state.nickname = action.payload.nickname
      }
    },
  },
})

export const { setUser, setType, setProfile, setAvatar } = userSlice.actions

export default userSlice.reducer
