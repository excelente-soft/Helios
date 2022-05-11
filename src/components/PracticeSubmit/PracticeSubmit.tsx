import { Form, Formik } from 'formik'

import Block from '@components/Block/Block'
import RowField from '@components/RowField/RowField'
import { useModal } from '@hooks/useModal'
import { IModalRaw, ModalType } from '@interfaces/IModal'
import { RequestUtility } from '@utils/request'
import { YupSchemas } from '@utils/yupSchemas'

import CS from '@common.module.scss'

interface IPracticeSubmitProps {
  token: string
  practiceId: string
}

const PracticeSubmit: React.VFC<IPracticeSubmitProps> = ({ token, practiceId }) => {
  const { showModal } = useModal()
  const initialValues = {
    link: '',
  }
  const practiceSubmit = async ({ link }: typeof initialValues) => {
    const responseFromServer = await RequestUtility.requestToServer<IModalRaw>(
      'POST',
      `/submit-practice`,
      {
        link,
        practiceId,
      },
      token
    )
    if (responseFromServer.data) {
      showModal(responseFromServer.data.message, responseFromServer.data.type)
    } else {
      if (responseFromServer.message) {
        showModal(responseFromServer.message, ModalType.Error)
      }
    }
  }

  return (
    <Block>
      <h2 className={CS.subtitle}>Practice submit</h2>
      <Formik initialValues={initialValues} validationSchema={YupSchemas.LinkSchema} onSubmit={practiceSubmit}>
        {({ errors, touched }) => (
          <Form>
            <RowField
              id="field[link]"
              label="Link to solution (github, figma, google drive and ets..)"
              placeholder="Link to solution"
              name="link"
              error={errors.link}
              touched={touched.link}
            />
            <button type="submit" className={`${CS.btnPrimary} ${CS.btnBasicSize}`}>
              Submit solution
            </button>
          </Form>
        )}
      </Formik>
    </Block>
  )
}

export default PracticeSubmit
