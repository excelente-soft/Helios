import { Form, Formik } from 'formik'
import Image from 'next/image'
import { useRef } from 'react'

import { IWithNotificationProps, withNotification } from '@HOC/withNotification'
import Block from '@components/Block/Block'
import RowField from '@components/RowField/RowField'
import { useImage } from '@hooks/useImage'
import { ICourse } from '@interfaces/ICourse'
import { IUser } from '@interfaces/IUser'
import { RequestUtility } from '@utils/request'
import { YupSchemas } from '@utils/yupSchemas'

import S from './ChangeCourse.module.scss'
import CS from '@common.module.scss'

interface IChangeCourse extends IWithNotificationProps {
  course: ICourse
  user: IUser
}

const ChangeCourse: React.VFC<IChangeCourse> = ({ course, user, notification, setAnswerFromServer }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [courseImage, uploadImageTrigger, imageHandler, setCourseImage] = useImage(fileInputRef, course.image)

  const initialValues = {
    name: course.name,
    shortDescription: course.shortDescription,
    description: course.description,
    price: course.price,
    targetAccessLevel: course.targetAccessLevel,
    hiddenAccessLevel: user.role.accessLevel,
  }

  const changeCourseSubmit = async (formData: typeof initialValues) => {
    const changedImage = courseImage === course.image ? 'old' : courseImage
    const changeRoleResult = await RequestUtility.requestToServer<ICourse>(
      'PUT',
      '/change-course',
      { id: course.id, data: { ...formData, image: changedImage || 'empty' } },
      user.token
    )
    if (changeRoleResult.data) {
      setAnswerFromServer({ message: 'Course changed successfully', isError: false })
    } else if (changeRoleResult.message) {
      setAnswerFromServer({ message: changeRoleResult.message, isError: true })
    }
  }

  const deleteImageHandler = () => {
    setCourseImage('')
  }

  return (
    <Block>
      <h3 className={CS.subtitle}>Change course</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={YupSchemas.ChangeCourseSchema}
        onSubmit={changeCourseSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <RowField
              id="field[name]"
              label="Name"
              placeholder="Enter course name"
              name="name"
              error={errors.name}
              touched={touched.name}
            />
            <div className={S.description}>
              <RowField
                id="field[shortDescription]"
                label="Short description"
                placeholder="Enter short description"
                name="shortDescription"
                error={errors.shortDescription}
                touched={touched.shortDescription}
              />
              <RowField
                id="field[description]"
                label="Full description"
                placeholder="Enter full description"
                name="description"
                error={errors.description}
                touched={touched.description}
              />
            </div>
            <RowField
              id="field[price]"
              label="Price"
              placeholder="Enter price"
              name="price"
              error={errors.price}
              touched={touched.price}
            />
            <RowField
              id="field[targetAccessLevel]"
              label="Target access level"
              placeholder={`Enter target access level (2 - ${user.role.accessLevel})`}
              name="targetAccessLevel"
              error={errors.targetAccessLevel}
              touched={touched.targetAccessLevel}
            />
            <div className={S.imageContainer}>
              <div className={S.image}>
                {courseImage && (
                  <Image
                    src={courseImage}
                    alt="Course image"
                    className={S.courseImage}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
              <div className={S.imageControls}>
                <button onClick={uploadImageTrigger} type="button" className={`${CS.btnPrimary} ${S.uploadImage}`}>
                  Upload course image
                </button>
                <input
                  onChange={imageHandler}
                  ref={fileInputRef}
                  className={S.hiddenFileInput}
                  type="file"
                  tabIndex={-1}
                />
                <p className={S.advanced}>
                  You can also{' '}
                  <button onClick={deleteImageHandler} type="button" className={S.deleteImage}>
                    delete image
                  </button>
                </p>
              </div>
            </div>
            <p className={S.notification}>
              <span className={S.warning}>Warning: Changing the name of the course will change the link.</span> It is
              recommended not to change the name of the course
            </p>
            {notification}
            <button type="submit" className={`${CS.btnPrimary} ${CS.btnBasicSize}`}>
              Change course
            </button>
          </Form>
        )}
      </Formik>
    </Block>
  )
}

export default withNotification(ChangeCourse)
