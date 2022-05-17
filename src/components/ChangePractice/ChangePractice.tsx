import dynamic from 'next/dynamic'
import { useContext, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css'
import remarkGfm from 'remark-gfm'

import { IWithNotificationProps, withNotification } from '@HOC/withNotification'
import Steps from '@components/Steps/Steps'
import { LearningManageContext } from '@contexts/LearningManage'
import { useModal } from '@hooks/useModal'
import { ModalType } from '@interfaces/IModal'
import { IPractice, ObjectiveType } from '@interfaces/IPractice'
import { RequestUtility } from '@utils/request'

import S from './ChangePractice.module.scss'
import CS from '@common.module.scss'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
})

interface IChangePracticeProps extends IWithNotificationProps {
  practice: IPractice
  token: string
}

const ChangePractice: React.VFC<IChangePracticeProps> = ({ token, practice, notification, setAnswerFromServer }) => {
  const [objective, setObjective] = useState(practice.objective)
  const [objectiveType, setObjectiveType] = useState(practice.objectiveType)
  const [name, setName] = useState(practice.name)
  const [objectiveLink, setObjectiveLink] = useState(practice.link)
  const { deleteTask, changePractice } = useContext(LearningManageContext)
  const { showModal } = useModal()

  const objectiveChangeHandler = ({ text }: { text: string }) => {
    setObjective(text)
  }

  const changeNameHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const changeObjectiveLinkHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setObjectiveLink(e.currentTarget.value)
  }

  const changePracticeHandler = async () => {
    const changePracticeResult = await RequestUtility.requestToServer<IPractice>(
      'PUT',
      `/change-practice`,
      { id: practice.id, name, objective, objectiveType, link: objectiveLink },
      token
    )
    if (changePracticeResult.message) {
      setAnswerFromServer({ message: changePracticeResult.message, isError: true })
    } else if (changePracticeResult.data) {
      changePractice(practice.id, changePracticeResult.data)
      setAnswerFromServer({ message: 'Practice successfully changed', isError: false })
    }
  }

  const deletePracticeHandler = async () => {
    const deletePracticeResult = await RequestUtility.requestToServer(
      'DELETE',
      `/delete-practice`,
      { id: practice.id },
      token
    )
    if (deletePracticeResult.message) {
      setAnswerFromServer({ message: deletePracticeResult.message, isError: true })
    } else {
      deleteTask(practice.id)
    }
  }

  const showStepsHandler = () => {
    showModal(<Steps />, ModalType.Info)
  }

  const objectiveTypeCurry = (value: ObjectiveType) => {
    return () => setObjectiveType(value)
  }

  return (
    <div className={S.changePracticeContainer}>
      <input
        type="input"
        className={CS.field}
        placeholder="Practice name"
        value={name}
        onChange={changeNameHandler}
        name="practice"
      />
      <div className={S.switch}>
        <div
          className={`${S.toggle} ${
            objectiveType === ObjectiveType.Figma ? '' : objectiveType === ObjectiveType.None ? S.second : S.third
          }`}
        ></div>
        <div className={S.names}>
          <p className={S.objectiveType} onClick={objectiveTypeCurry(ObjectiveType.Figma)}>
            Figma
          </p>
          <p className={S.objectiveType} onClick={objectiveTypeCurry(ObjectiveType.None)}>
            None
          </p>
          <p className={S.objectiveType} onClick={objectiveTypeCurry(ObjectiveType.Codesandbox)}>
            Codesandbox
          </p>
        </div>
      </div>
      <input
        type="input"
        className={`${CS.field}`}
        placeholder="Link to objective example (link to codesandbox or figma)"
        value={objectiveLink}
        onChange={changeObjectiveLinkHandler}
        name="objective link"
      />
      <p className={`${CS.notification} ${S.notify}`}>
        <span className={CS.warning}>Warning: Incorrect link will lead to incorrect display of the task.</span> To get
        the correct link you need to follow{' '}
        <button onClick={showStepsHandler} type="button" className={S.steps}>
          these steps.
        </button>
      </p>
      <MdEditor
        className={S.editor}
        renderHTML={(text) => <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>}
        value={objective}
        onChange={objectiveChangeHandler}
      />
      {notification}
      <div className={S.control}>
        <button className={`${CS.btnPrimary} ${S.btnChange}`} onClick={changePracticeHandler}>
          Update practice
        </button>
        <button className={`${CS.btnThird} ${S.btnDelete}`} onClick={deletePracticeHandler}>
          Delete practice
        </button>
      </div>
    </div>
  )
}

export default withNotification(ChangePractice)
