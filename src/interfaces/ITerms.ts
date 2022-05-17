export interface ICatalogTerms {
  byPrice: FilterByPrice
  byDate: FilterByDate
  search: string
}

export interface IMentorTerms {
  search: string
  byDate: FilterByDate
  byObjectiveType: FilterByObjectiveType
}

export enum FilterByObjectiveType {
  Any = 'any',
  None = 'none',
  Figma = 'figma',
  Codesandbox = 'codesandbox',
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
