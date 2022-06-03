import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'

import ControlledTask from '@components/ControlledTask/ControlledTask'
import { ITask } from '@interfaces/ITask'

import S from './TaskList.module.scss'

interface ITaskListProps {
  tasks: ITask[]
  token: string
  reorderTasks: (result: DropResult) => void
}

const TaskList: React.VFC<ITaskListProps> = ({ tasks, reorderTasks, token }) => {
  return (
    <DragDropContext onDragEnd={reorderTasks}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div className={S.taskList} {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, i) => (
              <Draggable key={task.id} draggableId={task.id} index={i}>
                {(provided) => (
                  <ControlledTask
                    key={task.id}
                    task={task}
                    forwardRef={provided.innerRef}
                    token={token}
                    dragHandler={provided.dragHandleProps}
                    draggableProps={provided.draggableProps}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default TaskList
