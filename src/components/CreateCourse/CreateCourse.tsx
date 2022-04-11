import { Form, Formik } from 'formik'
import Image from 'next/image'
import { useRef, useState } from 'react'

import { Block } from '@components/Block/Block'
import { Notification } from '@components/Notification/Notification'
import { RowField } from '@components/RowField/RowField'
import { ICourse } from '@interfaces/ICourse'
import { INotification } from '@interfaces/INotification'
import { IUser } from '@interfaces/IUser'
import { ReaderUtility } from '@utils/reader'
import { RequestUtility } from '@utils/request'

import { YupSchemas } from '../../utils/yupSchemas'
import S from './CreateCourse.module.scss'
import CS from '@common.module.scss'

interface ICreateCourseProps {
  user: IUser
}

export const CreateCourse: React.VFC<ICreateCourseProps> = ({ user }) => {
  const [answerFromServer, setAnswerFromServer] = useState<INotification>({ message: '', isError: false })
  const [courseImage, setCourseImagge] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const initialValues = {
    name: '',
    shortDescription: '',
    description: '',
    price: 0,
  }

  const createCourseSubmit = async (formData: typeof initialValues) => {
    const createCourseResult = await RequestUtility.requestToServer<ICourse, Omit<ICourse, 'author'>>(
      'POST',
      '/createCourse',
      { ...formData, image: courseImage || 'empty' },
      user.token
    )
    if (createCourseResult.data) {
      setAnswerFromServer({ message: 'Course created successfully', isError: false })
    } else if (createCourseResult.message) {
      setAnswerFromServer({ message: createCourseResult.message, isError: true })
    }
  }

  const uploadCourseImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files
    if (!file) {
      return
    }
    ReaderUtility.readFile(file[0], uploadCourseImageSetter)
    e.target.value = ''
  }

  const uploadCourseImageSetter = (file: { message?: string; data?: string }) => {
    setCourseImagge(courseImage)
    if (file.data) {
      setCourseImagge(file.data)
    }
  }

  const deleteImageHandler = () => {
    setCourseImagge('')
  }

  const uploadCourseAvatarTrigger = () => {
    fileInputRef.current?.click()
  }

  return (
    <Block noMargin>
      <Formik
        initialValues={initialValues}
        validationSchema={YupSchemas.CreateCourseSchema}
        onSubmit={createCourseSubmit}
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
                <button
                  onClick={uploadCourseAvatarTrigger}
                  type="button"
                  className={`${CS.btnPrimary} ${S.uploadImage}`}
                >
                  Upload course image
                </button>
                <input
                  onChange={uploadCourseImageHandler}
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
            {answerFromServer.message && <Notification answerFromServer={answerFromServer} />}
            <div className={S.controls}>
              <button type="submit" className={`${CS.btnPrimary} ${CS.btnBasicSize}`}>
                Create course
              </button>
              <button type="button" className={`${CS.btnSecondary} ${CS.btnBasicSize}`}>
                Preview
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Block>
  )
}
