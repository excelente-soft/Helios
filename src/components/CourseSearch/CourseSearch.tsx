/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { CatalogFilter } from '@components/CatalogFilter/CatalogFilter'
import { useAppDispatch } from '@hooks/app'
import { setSearch } from '@store/catalogTerms/catalogTermsSlice'

import S from './CourseSearch.module.scss'
import CS from '@common.module.scss'

interface ICourseSearchProps {
  total: number
  searchCreteria: string
  setSearchCreteria: (creteria: string) => void
}

export const CourseSearch: React.VFC<ICourseSearchProps> = ({ total, searchCreteria, setSearchCreteria }) => {
  const [isOpen, setIsOpen] = useState(false)
  const creteriaRef = useRef(searchCreteria)
  const dispatch = useAppDispatch()

  useEffect(() => {
    creteriaRef.current = searchCreteria
  }, [searchCreteria])

  useEffect(() => {
    return () => {
      dispatch(setSearch(creteriaRef.current))
    }
  }, [])

  const changeCreteriaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCreteria(e.target.value)
  }

  const filterHandler = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={S.searchContainer}>
      <div className={`${CS.pageContainer} ${S.searchPanel}`}>
        <input
          onChange={changeCreteriaHandler}
          className={`${CS.field} ${S.searchField}`}
          value={searchCreteria}
          type="text"
          placeholder="Search course"
        />
        <button onClick={filterHandler} className={`${S.filter} ${CS.btnSecondary}`}>
          Filter <span className={`${S.dropdownIcon} ${isOpen ? S.dropdownIconReverse : ''}`}></span>
        </button>
        <div className={S.totalContainer}>
          <p className={S.total}>{total} courses</p>
        </div>
        <AnimatePresence>
          {isOpen && (
            <div className={`${S.dropdown}`}>
              <CatalogFilter />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
