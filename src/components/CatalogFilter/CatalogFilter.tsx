import { motion } from 'framer-motion'

import { useAppDispatch, useAppSelector } from '@hooks/app'
import { FilterByDate, FilterByPrice } from '@interfaces/ITerms'
import { setFilterByDate, setFilterByPrice } from '@store/catalogTerms/catalogTermsSlice'

import S from './CatalogFilter.module.scss'
import CS from '@common.module.scss'

const filterVariants = {
  visible: { height: 185, paddingBottom: 32 },
  hidden: { height: 0, paddingBottom: 0 },
}

const CatalogFilter = () => {
  const catalogTerms = useAppSelector((state) => state.catalogTerms)
  const dispatch = useAppDispatch()

  const changeFilterByPrice = (value: FilterByPrice) => {
    if (catalogTerms.byPrice === value) {
      return
    }
    dispatch(setFilterByPrice(value))
  }

  const changeFilterByDate = (value: FilterByDate) => {
    if (catalogTerms.byDate === value) {
      return
    }
    dispatch(setFilterByDate(value))
  }

  const filterByDateCurry = (value: FilterByDate) => {
    return () => changeFilterByDate(value)
  }

  const filterByPriceCurry = (value: FilterByPrice) => {
    return () => changeFilterByPrice(value)
  }

  const { byDate, byPrice } = catalogTerms
  return (
    <motion.div
      className={`${CS.pageContainer} ${S.filterContainer}`}
      variants={filterVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div>
        <h5 className={S.title}>Cost of courses</h5>
        <ul className={S.list}>
          <li className={S.term}>
            <label htmlFor="checkbox[filterCostAny]" className={`${CS.label} ${S.filterLabel}`}>
              Any
            </label>
            <input
              id="checkbox[filterCostAny]"
              name="costAny"
              type="checkbox"
              className={S.checkbox}
              checked={byPrice === FilterByPrice.Any}
              onChange={filterByPriceCurry(FilterByPrice.Any)}
            />
          </li>
          <li className={S.term}>
            <label htmlFor="checkbox[filterCostFree]" className={`${CS.label} ${S.filterLabel}`}>
              Free
            </label>
            <input
              id="checkbox[filterCostFree]"
              name="costFree"
              type="checkbox"
              className={S.checkbox}
              checked={byPrice === FilterByPrice.Free}
              onChange={filterByPriceCurry(FilterByPrice.Free)}
            />
          </li>
          <li className={S.term}>
            <label htmlFor="checkbox[filterCostPremium]" className={`${CS.label} ${S.filterLabel}`}>
              Premium
            </label>
            <input
              id="checkbox[filterCostPremium]"
              name="costPremium"
              type="checkbox"
              className={S.checkbox}
              checked={byPrice === FilterByPrice.Premium}
              onChange={filterByPriceCurry(FilterByPrice.Premium)}
            />
          </li>
        </ul>
      </div>
      <div>
        <h5 className={S.title}>Date of creation</h5>
        <ul className={S.list}>
          <li className={S.term}>
            <label htmlFor="checkbox[filterDateAny]" className={`${CS.label} ${S.filterLabel}`}>
              Any
            </label>
            <input
              id="checkbox[filterDateAny]"
              name="costAny"
              type="checkbox"
              className={S.checkbox}
              checked={byDate === FilterByDate.Any}
              onChange={filterByDateCurry(FilterByDate.Any)}
            />
          </li>
          <li className={S.term}>
            <label htmlFor="checkbox[filterDateLastWeek]" className={`${CS.label} ${S.filterLabel}`}>
              LastWeek
            </label>
            <input
              id="checkbox[filterDateLastWeek]"
              name="costLastWeek"
              type="checkbox"
              className={S.checkbox}
              checked={byDate === FilterByDate.LastWeek}
              onChange={filterByDateCurry(FilterByDate.LastWeek)}
            />
          </li>
          <li className={S.term}>
            <label htmlFor="checkbox[filterDateOlder]" className={`${CS.label} ${S.filterLabel}`}>
              Older
            </label>
            <input
              id="checkbox[filterDateOlder]"
              name="filterDateOlder"
              type="checkbox"
              className={S.checkbox}
              checked={byDate === FilterByDate.Older}
              onChange={filterByDateCurry(FilterByDate.Older)}
            />
          </li>
        </ul>
      </div>
    </motion.div>
  )
}

export default CatalogFilter
