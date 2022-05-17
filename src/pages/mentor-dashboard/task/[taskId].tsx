/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { IWithAdminProps, withAdmin } from '@HOC/withAdmin'
import Block from '@components/Block/Block'
import PracticeView from '@components/PracticeView/PracticeView'
import RowField from '@components/RowField/RowField'
import { useModal } from '@hooks/useModal'
import { IModalRaw, ModalType } from '@interfaces/IModal'
import { ITaskQueue, ITaskQueueRaw } from '@interfaces/ITaskQueue'
import { RequestUtility } from '@utils/request'
import { YupSchemas } from '@utils/yupSchemas'

import CS from '@common.module.scss'
import S from '@styles/TaskReview.module.scss'

const TaskReview: React.VFC<IWithAdminProps> = ({ user }) => {
  const router = useRouter()
  const { taskId } = router.query
  const [task, setTask] = useState<ITaskQueue>()
  const { showModal } = useModal()
  const initialValues = {
    review: '',
    rating: 0,
  }

  useEffect(() => {
    if (router.isReady) {
      const fetchTask = async () => {
        const task = await RequestUtility.requestToServer<ITaskQueueRaw>(
          'GET',
          `/task-review/${taskId}`,
          null,
          user.token
        )
        if (task.data) {
          const parsedTask = { ...task.data, createdAt: new Date(task.data.createdAt) }
          setTask(parsedTask)
        } else {
          router.push('/mentor-dashboard')
        }
      }
      fetchTask()
    }
  }, [router.isReady])

  const reviewSubmit = async (formData: typeof initialValues) => {
    const myCoursesResponse = await RequestUtility.requestToServer<IModalRaw>(
      'POST',
      '/submit-feedback',
      { id: taskId, rating: formData.rating, review: formData.review },
      user.token
    )
    if (myCoursesResponse.data) {
      router.push('/mentor-dashboard')
    } else {
      showModal('Task not found Or somebody is already reviewing this task', ModalType.Error)
    }
  }

  return (
    <>
      {task && (
        <PracticeView pageTitle="Practice review" practice={task.practice}>
          <Block>
            <h3 className={CS.subtitle}>User solution</h3>
            <div className={S.userInfo}>
              <h4 className={S.infoRow}>
                Deployed link:{' '}
                <a href={task.link} target="_blank" className={S.deployedLink} rel="noreferrer">
                  {task.link}
                </a>
              </h4>
              <h4 className={`${S.infoRow} ${S.marginend}`}>
                User nickname: <span className={S.nickname}>Anonymous({task.position})</span>
              </h4>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={YupSchemas.TaskReviewSchema}
              onSubmit={reviewSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <RowField
                    id="field[review]"
                    label="Task review"
                    placeholder="Enter your review for this task"
                    name="review"
                    error={errors.review}
                    touched={touched.review}
                  />
                  <RowField
                    id="field[rating]"
                    label="Rating"
                    placeholder="Enter your rating for this task"
                    name="rating"
                    error={errors.rating}
                    touched={touched.rating}
                    type="number"
                  />
                  <button type="submit" className={`${CS.btnPrimary} ${CS.btnBasicSize}`}>
                    Submit review
                  </button>
                </Form>
              )}
            </Formik>
          </Block>
        </PracticeView>
      )}
    </>
  )
}

export default withAdmin(TaskReview, 'Task review', 1)
