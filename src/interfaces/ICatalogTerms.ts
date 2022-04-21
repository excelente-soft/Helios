export interface ICatalogTerms {
  byPrice: IFilterByPrice
  byDate: IFilterByDate
  search: string
}

export type IFilterByPrice = 'any' | 'free' | 'premium'
export type IFilterByDate = 'any' | 'lastWeek' | 'older'
