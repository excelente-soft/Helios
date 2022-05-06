import PossibleQuest from '@components/PossibleQuest/PossibleQuest'
import { POSSIBLE_QUESTIONS } from '@constants'

import S from './PossibleQuestions.module.scss'
import CS from '@common.module.scss'

const PossibleQuestions = () => {
  return (
    <section className={`${S.PossibleQuestionsSection} ${CS.pageContainer}`}>
      <h1 className={S.title}>Frequently asked questions</h1>
      <div className={S.questions}>
        {POSSIBLE_QUESTIONS.map(({ question, answer }) => (
          <PossibleQuest key={question} question={question} answer={answer} />
        ))}
      </div>
    </section>
  )
}

export default PossibleQuestions
