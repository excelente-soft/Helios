import Image from 'next/image'

import S from './LearningProcess.module.scss'
import CS from '@common.module.scss'

const LearningProcess = () => {
  return (
    <section className={`${S.learningProcessSection} ${CS.pageContainer}`}>
      <h2 className={S.learn}>How is the learning process?</h2>
      <div className={S.process}>
        <div className={S.procWrapper}>
          <h3 className={S.procName}>Lecture material</h3>
          <p className={S.procDescription}>
            Get new knowledge thanks to the lecture material, which contains videos, texts for learning
          </p>
        </div>
        <Image src="/images/lectures-learn.svg" width={400} height={400} objectFit="contain" alt="learning process" />
      </div>
      <div className={S.process}>
        <div className={`${S.procWrapper} ${S.reverse}`}>
          <h3 className={S.procName}>Knowledge testing</h3>
          <p className={S.procDescription}>
            The most important thing for us is to objectively evaluate the knowledge gained, we use tests to test the
            knowledge of students
          </p>
        </div>
        <Image src="/images/tests-learn.svg" width={400} height={400} objectFit="contain" alt="learning process" />
      </div>
      <div className={S.process}>
        <div className={S.procWrapper}>
          <h3 className={S.procName}>Practical tasks</h3>
          <p className={S.procDescription}>
            Discover new and exciting ways to approach an exercise by getting mentored on it. Getting feedback from real
            people is an amazingly exciting way to learn. And becoming a mentor and giving feedback yourself is an even
            bigger step forward. So complete the circle - be mentored and mentor 🎉
          </p>
        </div>
        <Image src="/images/practices-learn.svg" width={400} height={400} objectFit="contain" alt="learning process" />
      </div>
    </section>
  )
}

export default LearningProcess
