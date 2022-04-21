import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IModal } from '@interfaces/IModal'

const initialState: IModal = {
  content: null,
  type: 'Info',
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (_, action: PayloadAction<IModal>) => {
      return action.payload
    },
    clearModal: (state) => {
      state.content = null
    },
  },
})

export const { setModal, clearModal } = modalSlice.actions

export default modalSlice.reducer
