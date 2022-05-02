import { Form, Formik, FormikProps } from 'formik'
import Image from 'next/image'
import { useRef, useState } from 'react'

import { IWithNotificationProps, withNotification } from '@HOC/withNotification'
import Block from '@components/Block/Block'
import CourseCard from '@components/CourseCard/CourseCard'
import RowField from '@components/RowField/RowField'
import Table from '@components/Table/Table'
import { useImage } from '@hooks/useImage'
import { ICourse } from '@interfaces/ICourse'
import { IUser } from '@interfaces/IUser'
import { RequestUtility } from '@utils/request'
import { YupSchemas } from '@utils/yupSchemas'

import S from './CreateCourse.module.scss'
import CS from '@common.module.scss'

interface ICreateCourseProps extends IWithNotificationProps {
  user: IUser
}

const CreateCourse: React.VFC<ICreateCourseProps> = ({ user, notification, setAnswerFromServer }) => {
  const [coursePreview, setCoursePreview] = useState<ICourse | null>(null)
  const formikRef = useRef<FormikProps<typeof initialValues>>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [courseImage, uploadImageTrigger, imageHandler, setCourseImage] = useImage(fileInputRef, '')

  const initialValues = {
    name: '',
    shortDescription: '',
    description: '',
    price: 0,
  }

  const coursePreviewHandler = () => {
    if (formikRef.current && formikRef.current.isValid && formikRef.current.dirty) {
      setCoursePreview({
        id: '',
        ...formikRef.current.values,
        image: courseImage,
        creationDate: new Date(),
        author: user.nickname,
        targetAccessLevel: user.role.accessLevel,
      })
    }
  }

  const createCourseSubmit = async (formData: typeof initialValues) => {
    const createCourseResult = await RequestUtility.requestToServer<ICourse>(
      'POST',
      '/create-course',
      { ...formData, image: courseImage || 'empty' },
      user.token
    )
    if (createCourseResult.data) {
      setAnswerFromServer({ message: 'Course created successfully', isError: false })
    } else if (createCourseResult.message) {
      setAnswerFromServer({ message: createCourseResult.message, isError: true })
    }
  }

  const deleteImageHandler = () => {
    setCourseImage('')
  }

  return (
    <Block noMargin>
      <h3 className={CS.subtitle}>Create course</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={YupSchemas.CreateCourseSchema}
        onSubmit={createCourseSubmit}
        innerRef={formikRef}
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
            {notification}
            <div className={S.controls}>
              <button type="submit" className={`${CS.btnPrimary} ${CS.btnBasicSize}`}>
                Create course
              </button>
              <button onClick={coursePreviewHandler} type="button" className={`${CS.btnSecondary} ${CS.btnBasicSize}`}>
                Preview
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {coursePreview && (
        <div className={S.preview}>
          <Table noPadding>
            <CourseCard course={coursePreview} />
            <CourseCard course={coursePreview} />
            <CourseCard course={coursePreview} />
          </Table>
        </div>
      )}
    </Block>
  )
}

export default withNotification(CreateCourse)
