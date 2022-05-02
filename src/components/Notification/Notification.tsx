import S from './Notification.module.scss'

interface INotificationProps {
  answerFromServer: { message: string; isError: boolean }
}

const Notification: React.VFC<INotificationProps> = ({ answerFromServer }) => {
  const { message, isError } = answerFromServer
  return <>{message && <div className={isError ? S.operationError : S.operationSuccess}>{message}</div>}</>
}

export default Notification
