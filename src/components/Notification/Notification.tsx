import S from './Notification.module.scss'

interface INotificationProps {
  answerFromServer: { message: string; isError: boolean }
}

export const Notification: React.VFC<INotificationProps> = ({ answerFromServer }) => {
  const { message, isError } = answerFromServer
  return <div className={isError ? S.operationError : S.operationSuccess}>{message}</div>
}
