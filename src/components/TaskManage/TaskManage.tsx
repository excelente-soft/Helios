import { DragControls } from 'framer-motion'
import React, { useState } from 'react'

import ChangeLecture from '@components/ChangeLecture/ChangeLecture'
import ChangePractice from '@components/ChangePractice/ChangePractice'
import ChangeTest from '@components/ChangeTest/ChangeTest'
import { ILecture } from '@interfaces/ILecture'
import { IPractice } from '@interfaces/IPractice'
import { ITask } from '@interfaces/ITask'
import { ITest } from '@interfaces/ITest'

import S from './TaskManage.module.scss'

interface ITaskManageProps {
  task: ITask
  token: string
  controls: DragControls
}

const TaskManage: React.VFC<ITaskManageProps> = ({ task, token, controls }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdownHandler = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={S.taskContainer}>
      <div className={S.taskDisplay}>
        <span className={S.moveIcon} onPointerDown={(e) => controls.start(e)}></span>
        <h2 className={S.taskName}>
          {task.name} <span className={S.type}>({task.type})</span>
        </h2>
        <span
          className={`${S.dropdownIcon} ${isOpen ? S.dropdownIconReverse : ''}`}
          onClick={toggleDropdownHandler}
        ></span>
      </div>
      {isOpen && task.type === 'lecture' && <ChangeLecture lecture={task as ILecture} token={token} />}
      {isOpen && task.type === 'test' && <ChangeTest test={task as ITest} token={token} />}
      {isOpen && task.type === 'practice' && <ChangePractice practice={task as IPractice} token={token} />}
    </div>
  )
}

export default TaskManage
