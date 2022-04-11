import { memo } from 'react'

import S from './CourseSearch.module.scss'
import CS from '@common.module.scss'

interface ICourseSearchProps {
  total: number
  creteria: string
  setCreteria: (creteria: string) => void
}

const CourseSearch: React.VFC<ICourseSearchProps> = ({ total, creteria, setCreteria }) => {
  const changeCreteriaHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreteria(event.target.value)
  }

  return (
    <div className={S.searchContainer}>
      <div className={`${CS.pageContainer} ${S.searchPanel}`}>
        <input
          onChange={changeCreteriaHandler}
          className={`${CS.field} ${S.searchField}`}
          value={creteria}
          type="text"
          placeholder="Search course"
        />
        <button className={`${S.filter} ${CS.btnSecondary}`}>
          Filter <span className={S.dropdownIcon}></span>
        </button>
        <div className={S.totalContainer}>
          <p className={S.total}>{total} courses</p>
        </div>
      </div>
    </div>
  )
}

export const MemoizedCourseSearch = memo(CourseSearch)
