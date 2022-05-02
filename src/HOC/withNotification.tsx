/* eslint-disable react/display-name */
import { ReactNode, VFC, useState } from 'react'

import Notification from '@components/Notification/Notification'
import { INotification } from '@interfaces/INotification'

export interface IWithNotificationProps {
  answerFromServer: INotification
  setAnswerFromServer: (answerFromServer: INotification) => void
  notification: ReactNode
}

export function withNotification<T>(Component: VFC<T>) {
  return (props: Omit<T, 'answerFromServer' | 'setAnswerFromServer' | 'notification'>) => {
    const [answerFromServer, setAnswerFromServer] = useState<INotification>({ message: '', isError: false })

    return (
      <Component
        {...(props as T)}
        answerFromServer={answerFromServer}
        setAnswerFromServer={setAnswerFromServer}
        notification={<Notification answerFromServer={answerFromServer} />}
      />
    )
  }
}
