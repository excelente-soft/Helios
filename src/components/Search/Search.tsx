import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import CatalogFilter from '@components/CatalogFilter/CatalogFilter'
import { useAppDispatch } from '@hooks/app'

import QueueFilter from '../QueueFilter/QueueFilter'
import S from './Search.module.scss'
import CS from '@common.module.scss'

interface ISearchProps {
  total: number
  searchCreteria: string
  setSearchCreteria: (creteria: string) => void
  type?: 'course' | 'task'
  onSave: ActionCreatorWithPayload<string, string>
}

const Search: React.VFC<ISearchProps> = ({ total, searchCreteria, setSearchCreteria, type = 'course', onSave }) => {
  const [isOpen, setIsOpen] = useState(false)
  const creteriaRef = useRef(searchCreteria)
  const dispatch = useAppDispatch()

  useEffect(() => {
    creteriaRef.current = searchCreteria
  }, [searchCreteria])

  useEffect(() => {
    return () => {
      dispatch(onSave(creteriaRef.current))
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
          placeholder={`Search ${type}`}
        />
        <button onClick={filterHandler} className={`${S.filter} ${CS.btnSecondary}`}>
          Filter <span className={`${S.dropdownIcon} ${isOpen ? S.dropdownIconReverse : ''}`}></span>
        </button>
        <div className={S.totalContainer}>
          <p className={S.total}>
            {total} {type}s
          </p>
        </div>
        <AnimatePresence>
          {isOpen && (
            <div className={`${S.dropdown}`}>
              {type === 'course' && <CatalogFilter />}
              {type === 'task' && <QueueFilter />}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Search
