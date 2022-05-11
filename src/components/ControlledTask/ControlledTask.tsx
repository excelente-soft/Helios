import { Reorder, useDragControls } from 'framer-motion'
import { useContext } from 'react'

import TaskManage from '@components/TaskManage/TaskManage'
import { LearningManageContext } from '@contexts/LearningManage'
import { ITask } from '@interfaces/ITask'

interface IControlledTaskProps {
  task: ITask
  token: string
}

const ControlledTask: React.VFC<IControlledTaskProps> = ({ task, token }) => {
  const controls = useDragControls()
  const { changeOrder } = useContext(LearningManageContext)

  return (
    <Reorder.Item key={task.id} dragControls={controls} value={task} dragListener={false} onDragEnd={changeOrder}>
      <TaskManage key={task.id} task={task} token={token} controls={controls} />
    </Reorder.Item>
  )
}

export default ControlledTask
