import { Form, Formik } from 'formik'
import Image from 'next/image'
import { useRef, useState } from 'react'

import { Block } from '@components/Block/Block'
import { Notification } from '@components/Notification/Notification'
import { RowField } from '@components/RowField/RowField'
import { INotification } from '@interfaces/INotification'
import { readFile } from '@utils/upload'

import S from './CreateCourse.module.scss'
import CS from '@common.module.scss'

export const CreateCourse = () => {
  const [answerFromServer, setAnswerFromServer] = useState<INotification>({ message: '', isError: false })
  const [courseImage, setCourseImagge] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const initialValues = {
    name: '',
    shortDescription: '',
    description: '',
    image: '',
    price: '',
  }

  const createCourseSubmit = (formData: typeof initialValues) => {
    console.log(formData)
    setAnswerFromServer({ message: 'Not correct avatar', isError: true })
  }

  const uploadCourseImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files
    if (!file) {
      return
    }
    readFile(file[0], uploadCourseImageSetter)
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
      <Formik initialValues={initialValues} onSubmit={createCourseSubmit}>
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
