import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import S from './PossibleQuest.module.scss'

const answerVariants = {
  visible: { height: '0%', padding: 16 },
  hidden: { height: '0px', padding: 0 },
}

interface IPossibleQuestProps {
  question: string
  answer: string
}

const PossibleQuest: React.VFC<IPossibleQuestProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdownHandler = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={S.questionContainer}>
      <div className={S.questDisplay}>
        <h2 className={S.question}>{question}</h2>
        <span
          className={`${S.dropdownIcon} ${isOpen ? S.dropdownIconReverse : ''}`}
          onClick={toggleDropdownHandler}
        ></span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={S.dropdownContainer}
            variants={answerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <p className={S.answer}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PossibleQuest
