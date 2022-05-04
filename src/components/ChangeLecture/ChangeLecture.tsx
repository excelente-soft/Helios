import dynamic from 'next/dynamic'
import React, { useContext, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css'
import remarkGfm from 'remark-gfm'

import { IWithNotificationProps, withNotification } from '@HOC/withNotification'
import { LearningManageContext } from '@contexts/LearningManage'
import { ILecture } from '@interfaces/ILecture'
import { RequestUtility } from '@utils/request'

import S from './ChangeLecture.module.scss'
import CS from '@common.module.scss'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
})

interface IChangeLecture extends IWithNotificationProps {
  lecture: ILecture
  token: string
}

const ChangeLecture: React.VFC<IChangeLecture> = ({ lecture, token, notification, setAnswerFromServer }) => {
  const [text, setText] = useState(lecture.text)
  const [name, setName] = useState(lecture.name)
  const { deleteTask, changeLecture } = useContext(LearningManageContext)

  const textChangeHandler = ({ text }: { text: string }) => {
    setText(text)
  }

  const changeLectureHandler = async () => {
    const changeLectureResult = await RequestUtility.requestToServer<ILecture>(
      'PUT',
      `/change-lecture`,
      { id: lecture.id, text, name },
      token
    )
    if (changeLectureResult.message) {
      setAnswerFromServer({ message: changeLectureResult.message, isError: true })
    } else if (changeLectureResult.data) {
      changeLecture(lecture.id, changeLectureResult.data.text, changeLectureResult.data.name)
      setAnswerFromServer({ message: 'Lecture successfully changed', isError: false })
    }
  }

  const deleteLectureHandler = async () => {
    const deleteLectureResult = await RequestUtility.requestToServer(
      'DELETE',
      `/delete-lecture`,
      { id: lecture.id },
      token
    )
    if (deleteLectureResult.message) {
      setAnswerFromServer({ message: deleteLectureResult.message, isError: true })
    } else {
      deleteTask(lecture.id)
    }
  }

  const changeNameHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  return (
    <div className={S.changeLectureContainer}>
      <input
        id="field[lecture]"
        type="input"
        className={CS.field}
        placeholder="Lecture name"
        value={name}
        onChange={changeNameHandler}
        name="lecture"
      />
      <MdEditor
        className={S.editor}
        renderHTML={(text) => <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>}
        value={text}
        onChange={textChangeHandler}
      />
      {notification}
      <div className={S.control}>
        <button className={`${CS.btnPrimary} ${S.btnChange}`} onClick={changeLectureHandler}>
          Change lecture
        </button>
        <button className={`${CS.btnThird} ${S.btnDelete}`} onClick={deleteLectureHandler}>
          Delete lecture
        </button>
      </div>
    </div>
  )
}

export default withNotification(ChangeLecture)
