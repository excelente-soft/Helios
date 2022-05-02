import { Field, Form, Formik } from 'formik'

import { IWithNotificationProps, withNotification } from '@HOC/withNotification'
import Block from '@components/Block/Block'
import RowField from '@components/RowField/RowField'
import { IRole } from '@interfaces/IRole'
import { IUser } from '@interfaces/IUser'
import { RequestUtility } from '@utils/request'
import { YupSchemas } from '@utils/yupSchemas'

import S from './CreateRole.module.scss'
import CS from '@common.module.scss'

interface ICreateRoleProps extends IWithNotificationProps {
  user: IUser
}

const CreateRole: React.VFC<ICreateRoleProps> = ({ user, notification, setAnswerFromServer }) => {
  const initialValues = {
    accessLevel: 0,
    hiddenAccessLevel: user.role.accessLevel - 1,
    color: '#fbede3',
    roleName: '',
  }

  const createRoleSubmit = async (formData: typeof initialValues) => {
    const changeRoleResult = await RequestUtility.requestToServer<IRole>('POST', '/create-role', formData, user.token)
    if (changeRoleResult.data) {
      setAnswerFromServer({ message: 'Role created successfully', isError: false })
    } else if (changeRoleResult.message) {
      setAnswerFromServer({ message: changeRoleResult.message, isError: true })
    }
  }

  return (
    <Block>
      <h3 className={CS.subtitle}>Create role</h3>
      <Formik initialValues={initialValues} validationSchema={YupSchemas.CreateRoleSchema} onSubmit={createRoleSubmit}>
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
            {notification}
            <button type="submit" className={`${CS.btnPrimary} ${CS.btnBasicSize}`}>
              Create role
            </button>
          </Form>
        )}
      </Formik>
    </Block>
  )
}

export default withNotification(CreateRole)
