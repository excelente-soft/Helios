import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { FilterByDate, FilterByPrice, ICatalogTerms } from '@interfaces/ITerms'

const initialState: ICatalogTerms = {
  byDate: FilterByDate.Any,
  byPrice: FilterByPrice.Any,
  search: '',
}

export const catalogTermsSlice = createSlice({
  name: 'catalogTerms',
  initialState,
  reducers: {
    setFilterByDate: (state, action: PayloadAction<FilterByDate>) => {
      state.byDate = action.payload
    },
    setFilterByPrice: (state, action: PayloadAction<FilterByPrice>) => {
      state.byPrice = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
})

export const { setFilterByDate, setFilterByPrice, setSearch } = catalogTermsSlice.actions

export default catalogTermsSlice.reducer
