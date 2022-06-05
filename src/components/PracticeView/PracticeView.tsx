import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import Block from '@components/Block/Block'
import Codesandbox from '@components/Codesandbox/Codesandbox'
import FigmaFrame from '@components/FigmaFrame/FigmaFrame'
import { IPractice, ObjectiveType } from '@interfaces/IPractice'

import S from './PracticeView.module.scss'
import CS from '@common.module.scss'

interface IPracticeViewProps {
  pageTitle: string
  practice: IPractice
}

const PracticeView: React.FC<IPracticeViewProps> = ({ practice, children }) => {
  const hasFigmaFrame = practice.link && practice.objectiveType === ObjectiveType.Figma
  const hasCodesandboxFrame = practice.link && practice.objectiveType === ObjectiveType.Codesandbox
  return (
    <>
      {hasFigmaFrame && <FigmaFrame embedUrl={practice.link} />}
      {hasCodesandboxFrame && <Codesandbox embedUrl={practice.link} />}
      <div className={CS.pageContainer}>
        <h2 className={CS.pageTitle}>Task review</h2>
        <Block noMargin>
          <h3 className={CS.subtitle}>{practice.name}</h3>
          <div className={S.practiceText}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{practice.objective}</ReactMarkdown>
          </div>
        </Block>
        {children}
      </div>
    </>
  )
}

export default PracticeView
