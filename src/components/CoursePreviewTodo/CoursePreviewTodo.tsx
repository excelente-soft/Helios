import { motion } from 'framer-motion'

import Block from '@components/Block/Block'

import S from './CoursePreviewTodo.module.scss'
import CS from '@common.module.scss'

const todoVariants = {
  visible: { opacity: 1, height: 62, x: 0, transition: { duration: 0.55 } },
  hidden: { opacity: 0, height: 0, x: 45 },
}

interface ICoursePreviewHeaderProps {
  description: string
}

const CoursePreviewTodo: React.VFC<ICoursePreviewHeaderProps> = ({ description }) => {
  return (
    <section className={`${S.todoSection} ${CS.pageContainer}`}>
      <div className={S.todoContent}>
        <motion.h2 className={`${S.todo} ${S.trail}`} initial="hidden" animate="visible" variants={todoVariants}>
          What will you do on the course?
        </motion.h2>
      </div>
      <div className={S.descriptionContainer}>
        <Block>
          <p className={S.description}>{description}</p>
        </Block>
      </div>
    </section>
  )
}

export default CoursePreviewTodo
