import React, { useState } from 'react'

import { ITask } from '@interfaces/ITask'

import S from './SyllabusPreview.module.scss'
import CS from '@common.module.scss'

interface ISyllabusPreviewProps {
  syllabus: ITask[]
}

const SyllabusPreview: React.VFC<ISyllabusPreviewProps> = ({ syllabus }) => {
  const [isMore, setIsMore] = useState(false)

  const toggleMoreHandler = () => {
    setIsMore(!isMore)
  }

  const syllabusPrepared = isMore ? syllabus : syllabus.slice(0, 5)
  return (
    <section className={`${S.syllabusPreviewSection} ${CS.pageContainer}`}>
      <h2 className={S.willDo}>What you will learn?</h2>
      <div className={S.syllabus}>
        {syllabusPrepared.map((task, index) => (
          <div key={index} className={S.task}>
            <div className={S.position}>{task.position}</div>
            <div className={S.info}>
              <h3 className={S.name}>
                {task.name} ({task.type})
              </h3>
            </div>
          </div>
        ))}
        {syllabus.length > 5 && (
          <button className={`${CS.btnSecondary} ${S.BtnMore}`} type="button" onClick={toggleMoreHandler}>
            {isMore ? 'Show less' : `Show more +${syllabus.length - syllabusPrepared.length}`}
          </button>
        )}
      </div>
    </section>
  )
}

export default SyllabusPreview
