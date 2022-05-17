import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { FilterByDate, FilterByObjectiveType, IMentorTerms } from '@interfaces/ITerms'

const initialState: IMentorTerms = {
  search: '',
  byDate: FilterByDate.Any,
  byObjectiveType: FilterByObjectiveType.Any,
}

export const mentorTermsSlice = createSlice({
  name: 'mentorTerms',
  initialState,
  reducers: {
    setMentorSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setMentorFilterByDate: (state, action: PayloadAction<FilterByDate>) => {
      state.byDate = action.payload
    },
    setMentorFilterByObjectiveType: (state, action: PayloadAction<FilterByObjectiveType>) => {
      state.byObjectiveType = action.payload
    },
  },
})

export const { setMentorSearch, setMentorFilterByDate, setMentorFilterByObjectiveType } = mentorTermsSlice.actions

export default mentorTermsSlice.reducer
