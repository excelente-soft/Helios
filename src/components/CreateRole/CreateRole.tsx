import { Field, Form, Formik } from 'formik'
import { useState } from 'react'

import { Block } from '@components/Block/Block'
import { Notification } from '@components/Notification/Notification'
import { RowField } from '@components/RowField/RowField'
import { INotification } from '@interfaces/INotification'
import { IUser } from '@interfaces/IUser'

import S from './CreateRole.module.scss'
import CS from '@common.module.scss'

interface ICreateRoleProps {
  user: IUser
}

export const CreateRole: React.VFC<ICreateRoleProps> = ({ user }) => {
  const [answerFromServer, setAnswerFromServer] = useState<INotification>({ message: '', isError: false })
  const initialValues = {
    accessLevel: 0,
    hiddenAccessLevel: user.role.accessLevel,
    color: '#fbede3',
    roleName: '',
  }

  const createRoleSubmit = (formData: typeof initialValues) => {
    console.log(formData)
    setAnswerFromServer({ message: 'answer from server', isError: true })
  }

  return (
    <Block noMargin>
      <Formik initialValues={initialValues} onSubmit={createRoleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <RowField
              id="field[roleName]"
              label="Role name"
              placeholder="Enter role name"
              name="roleName"
              error={errors.roleName}
              touched={touched.roleName}
            />
            <RowField
              id="field[accessLevel]"
              label="Access level"
              placeholder={`Enter access level (0 - ${user.role.accessLevel - 1})`}
              name="accessLevel"
              error={errors.accessLevel}
              touched={touched.accessLevel}
            />
            <div className={S.colorRow}>
              <label htmlFor="field[color]" className={CS.label}>
                Color(hex)
              </label>
              <Field id="field[color]" type="color" className={`${CS.field} ${S.colorPicker}`} name="color" />
            </div>
            {answerFromServer.message && <Notification answerFromServer={answerFromServer} />}
            <button type="submit" className={`${CS.btnPrimary} ${CS.btnBasicSize}`}>
              Create role
            </button>
          </Form>
        )}
      </Formik>
    </Block>
  )
}
