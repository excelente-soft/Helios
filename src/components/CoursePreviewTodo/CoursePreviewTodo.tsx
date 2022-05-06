import S from './CoursePreviewTodo.module.scss'
import CS from '@common.module.scss'

interface ICoursePreviewHeaderProps {
  description: string
}

const CoursePreviewTodo: React.VFC<ICoursePreviewHeaderProps> = ({ description }) => {
  return (
    <section className={`${S.todoSection} ${CS.pageContainer}`}>
      <h2 className={S.todo}>What will you do on the course?</h2>
      <div className={S.descriptionContainer}>
        <div className={S.block}>
          <p className={S.description}>{description}</p>
        </div>
      </div>
    </section>
  )
}

export default CoursePreviewTodo
