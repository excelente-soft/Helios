export interface ICatalogTerms {
  byPrice: FilterByPrice
  byDate: FilterByDate
  search: string
}

export enum FilterByPrice {
  Any = 'any',
  Free = 'free',
  Premium = 'premium',
}

export enum FilterByDate {
  Any = 'any',
  LastWeek = 'lastWeek',
  Older = 'older',
}
