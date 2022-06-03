import React, { useState } from 'react'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd'

import ChangeLecture from '@components/ChangeLecture/ChangeLecture'
import ChangePractice from '@components/ChangePractice/ChangePractice'
import ChangeTest from '@components/ChangeTest/ChangeTest'
import { ILecture } from '@interfaces/ILecture'
import { IPractice } from '@interfaces/IPractice'
import { ITask, TaskType } from '@interfaces/ITask'
import { ITest } from '@interfaces/ITest'

import S from './ControlledTask.module.scss'

interface IControlledTaskProps {
  task: ITask
  token: string
  dragHandler?: DraggableProvidedDragHandleProps
  draggableProps: DraggableProvidedDraggableProps
  forwardRef: (element?: HTMLElement | null) => void
}

const ControlledTask: React.VFC<IControlledTaskProps> = ({ task, token, dragHandler, draggableProps, forwardRef }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdownHandler = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={S.taskContainer} {...draggableProps} ref={forwardRef}>
      <div className={S.taskDisplay}>
        <span className={S.moveIcon} {...dragHandler}></span>
        <h2 className={S.taskName}>
          {task.name} <span className={S.type}>({task.type})</span>
        </h2>
        <span
          className={`${S.dropdownIcon} ${isOpen ? S.dropdownIconReverse : ''}`}
          onClick={toggleDropdownHandler}
        ></span>
      </div>
      {isOpen && task.type === TaskType.Lecture && <ChangeLecture lecture={task as ILecture} token={token} />}
      {isOpen && task.type === TaskType.Test && <ChangeTest test={task as ITest} token={token} />}
      {isOpen && task.type === TaskType.Practice && <ChangePractice practice={task as IPractice} token={token} />}
    </div>
  )
}

export default ControlledTask
