import { motion } from 'framer-motion'

import { useAppDispatch, useAppSelector } from '@hooks/app'
import { FilterByDate, FilterByObjectiveType } from '@interfaces/ITerms'
import { setMentorFilterByDate, setMentorFilterByObjectiveType } from '@store/mentorTerms/mentorTermsSlice'

import S from './QueueFilter.module.scss'
import CS from '@common.module.scss'

const filterVariants = {
  visible: { height: 210, paddingBottom: 32 },
  hidden: { height: 0, paddingBottom: 0 },
}

const QueueFilter = () => {
  const catalogTerms = useAppSelector((state) => state.mentorTerms)
  const dispatch = useAppDispatch()

  const changeFilterByDate = (value: FilterByDate) => {
    if (catalogTerms.byDate === value) {
      return
    }
    dispatch(setMentorFilterByDate(value))
  }

  const changeFilterByObjectiveType = (value: FilterByObjectiveType) => {
    if (catalogTerms.byObjectiveType === value) {
      return
    }
    dispatch(setMentorFilterByObjectiveType(value))
  }

  const filterByDateCurry = (value: FilterByDate) => {
    return () => changeFilterByDate(value)
  }

  const filterByObjectiveTypeCurry = (value: FilterByObjectiveType) => {
    return () => changeFilterByObjectiveType(value)
  }

  const { byDate, byObjectiveType } = catalogTerms
  return (
    <motion.div
      className={`${CS.pageContainer} ${S.filterContainer}`}
      variants={filterVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
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
      <div>
        <h5 className={S.title}>Objective type</h5>
        <ul className={S.list}>
          <li className={S.term}>
            <label htmlFor="checkbox[filterObjectiveTypeAny]" className={`${CS.label} ${S.filterLabel}`}>
              Any
            </label>
            <input
              id="checkbox[filterObjectiveTypeAny]"
              name="typeAny"
              type="checkbox"
              className={S.checkbox}
              checked={byObjectiveType === FilterByObjectiveType.Any}
              onChange={filterByObjectiveTypeCurry(FilterByObjectiveType.Any)}
            />
          </li>
          <li className={S.term}>
            <label htmlFor="checkbox[filterObjectiveTypeNone]" className={`${CS.label} ${S.filterLabel}`}>
              None
            </label>
            <input
              id="checkbox[filterObjectiveTypeNone]"
              name="typeNone"
              type="checkbox"
              className={S.checkbox}
              checked={byObjectiveType === FilterByObjectiveType.None}
              onChange={filterByObjectiveTypeCurry(FilterByObjectiveType.None)}
            />
          </li>
          <li className={S.term}>
            <label htmlFor="checkbox[filterObjectiveTypeFigma]" className={`${CS.label} ${S.filterLabel}`}>
              Figma
            </label>
            <input
              id="checkbox[filterObjectiveTypeFigma]"
              name="typeFigma"
              type="checkbox"
              className={S.checkbox}
              checked={byObjectiveType === FilterByObjectiveType.Figma}
              onChange={filterByObjectiveTypeCurry(FilterByObjectiveType.Figma)}
            />
          </li>
          <li className={S.term}>
            <label htmlFor="checkbox[filterObjectiveTypeCodesandbox]" className={`${CS.label} ${S.filterLabel}`}>
              Codesandbox
            </label>
            <input
              id="checkbox[filterObjectiveTypeCodesandbox]"
              name="typeCodesandbox"
              type="checkbox"
              className={S.checkbox}
              checked={byObjectiveType === FilterByObjectiveType.Codesandbox}
              onChange={filterByObjectiveTypeCurry(FilterByObjectiveType.Codesandbox)}
            />
          </li>
        </ul>
      </div>
    </motion.div>
  )
}

export default QueueFilter
