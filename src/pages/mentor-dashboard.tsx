import { useEffect, useState } from 'react'

import { IWithAdminProps, withAdmin } from '@HOC/withAdmin'
import MentorHeader from '@components/MentorHeader/MentorHeader'
import ReviewCard from '@components/ReviewCard/ReviewCard'
import Search from '@components/Search/Search'
import { WEEK } from '@constants'
import { useAppSelector } from '@hooks/app'
import { ObjectiveType } from '@interfaces/IPractice'
import { ITaskQueue, ITaskQueueRaw } from '@interfaces/ITaskQueue'
import { FilterByDate, FilterByObjectiveType } from '@interfaces/ITerms'
import { setMentorSearch } from '@store/mentorTerms/mentorTermsSlice'
import { RequestUtility } from '@utils/request'

import CS from '@common.module.scss'
import S from '@styles/Mentor-dashboard.module.scss'

const MentorDashboard: React.VFC<IWithAdminProps> = ({ user }) => {
  const mentorTerms = useAppSelector((state) => state.mentorTerms)
  const [searchCreteria, setSearchCreteria] = useState(mentorTerms.search)
  const [taskQueue, setTaskQueue] = useState<ITaskQueue[]>([])

  useEffect(() => {
    const fetchTaskQueue = async () => {
      const taskQueue = await RequestUtility.requestToServer<ITaskQueueRaw[]>('GET', '/task-queue', null, user.token)
      if (taskQueue.data) {
        const parsedTasks = taskQueue.data.map((task) => ({ ...task, createdAt: new Date(task.createdAt) }))
        setTaskQueue(parsedTasks)
      }
    }
    fetchTaskQueue()
  }, [])

  const search = (taskQueue: ITaskQueue[]) => {
    if (searchCreteria === '') {
      return taskQueue
    }
    return taskQueue.filter(
      (task) =>
        task.link.toLowerCase().includes(searchCreteria.toLowerCase()) ||
        task.position === +searchCreteria ||
        task.practice.name.toLowerCase().includes(searchCreteria.toLowerCase())
    )
  }

  const filterByDate = (taskQueue: ITaskQueue[]) => {
    if (mentorTerms.byDate === FilterByDate.Any) {
      return taskQueue
    } else if (mentorTerms.byDate === FilterByDate.LastWeek) {
      return taskQueue.filter((task) => task.createdAt.getTime() > Date.now() - WEEK)
    } else {
      return taskQueue.filter((task) => task.createdAt.getTime() < Date.now() - WEEK)
    }
  }

  const filterByObjectiveType = (taskQueue: ITaskQueue[]) => {
    if (mentorTerms.byObjectiveType === FilterByObjectiveType.Any) {
      return taskQueue
    } else if (mentorTerms.byObjectiveType === FilterByObjectiveType.Codesandbox) {
      return taskQueue.filter((task) => task.practice.objectiveType === ObjectiveType.Codesandbox)
    } else if (mentorTerms.byObjectiveType === FilterByObjectiveType.Figma) {
      return taskQueue.filter((task) => task.practice.objectiveType === ObjectiveType.Figma)
    } else {
      return taskQueue.filter((task) => task.practice.objectiveType === ObjectiveType.None)
    }
  }

  const foundedTaskQueue = filterByObjectiveType(filterByDate(search(taskQueue)))
  return (
    <div>
      <MentorHeader token={user.token} />
      <Search
        total={foundedTaskQueue.length}
        searchCreteria={searchCreteria}
        setSearchCreteria={setSearchCreteria}
        type="task"
        onSave={setMentorSearch}
      />
      <div className={`${CS.pageContainer} ${S.queueContainer}`}>
        {foundedTaskQueue.map((task) => (
          <ReviewCard key={task.id} taskQueue={task} />
        ))}
      </div>
    </div>
  )
}

export default withAdmin(MentorDashboard, 'Mentor dashboard', 1)
