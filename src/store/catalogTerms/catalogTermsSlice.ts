import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ICatalogTerms, IFilterByDate, IFilterByPrice } from '@interfaces/ICatalogTerms'

const initialState: ICatalogTerms = {
  byDate: 'any',
  byPrice: 'any',
  search: '',
}

export const catalogTermsSlice = createSlice({
  name: 'catalogTerms',
  initialState,
  reducers: {
    setFilterByDate: (state, action: PayloadAction<IFilterByDate>) => {
      state.byDate = action.payload
    },
    setFilterByPrice: (state, action: PayloadAction<IFilterByPrice>) => {
      state.byPrice = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
})

export const { setFilterByDate, setFilterByPrice, setSearch } = catalogTermsSlice.actions

export default catalogTermsSlice.reducer
