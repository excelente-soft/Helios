import Link from 'next/link'
import React from 'react'

import { ITask, TaskType } from '@interfaces/ITask'

import S from './Task.module.scss'
import CS from '@common.module.scss'

interface ITaskProps {
  task: ITask
  completed: boolean
}

const Task: React.VFC<ITaskProps> = ({ task, completed }) => {
  const TaskTypeIcon =
    task.type === TaskType.Lecture ? S.lectureIcon : task.type === TaskType.Practice ? S.practiceIcon : S.testIcon
  return (
    <div className={S.taskDisplay}>
      {<span className={`${S.icon} ${completed ? S.completedIcon : TaskTypeIcon}`}></span>}
      <h2 className={S.taskName}>
        {task.name} <span className={S.type}>({task.type})</span>
      </h2>
      <Link href={`/study/${task.type}/${task.id}`}>
        <a className={`${CS.btnSecondary} ${S.btnExplore}`}>Explore</a>
      </Link>
    </div>
  )
}

export default Task
