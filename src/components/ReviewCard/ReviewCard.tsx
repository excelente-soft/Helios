import Link from 'next/link'

import { ITaskQueue } from '@interfaces/ITaskQueue'

import S from './ReviewCard.module.scss'

interface IReviewCardProps {
  taskQueue: ITaskQueue
}

const ReviewCard: React.VFC<IReviewCardProps> = ({ taskQueue }) => {
  const fakeNickname = `Anonymous(${taskQueue.position})`
  return (
    <Link href={`/mentor-dashboard/task/${taskQueue.id}`}>
      <a className={S.reviewContainer}>
        <h2 className={S.taskName}>
          {taskQueue.practice.name} ({taskQueue.practice.objectiveType})
        </h2>
        <h4 className={S.fakeNickname}>{fakeNickname}</h4>
      </a>
    </Link>
  )
}

export default ReviewCard
