const combineArray = <T>(...args: T[]) => {
  return args.flat(1)
}

export const CombineUtility = {
  combineArray,
}
