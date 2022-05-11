import S from './TestInfo.module.scss'
import CS from '@common.module.scss'

interface ITestInfoProps {
  name: string
  time: number
  totalQuestions: number
}

const TestInfo: React.VFC<ITestInfoProps> = ({ name, time, totalQuestions }) => {
  return (
    <>
      <h3 className={CS.subtitle}>{name}</h3>
      <div>
        <p className={S.infoRow}>
          Test Time: <strong>{time / 60} minutes</strong>
        </p>
        <p className={S.infoRow}>
          Time for question: <strong>{(time / totalQuestions).toFixed(1)} seconds</strong>
        </p>
        <p className={S.infoRow}>
          Number of Questions: <strong>{totalQuestions}</strong>
        </p>
        <p className={S.infoRow}>
          Multiple Choice: <strong>Yes</strong>
        </p>
        <span className={S.infoRow}>
          Subtest Score is set in accordance with the number of correct answers according to the following system:
          <ul className={S.ratingList}>
            <li className={S.ratingRow}>
              less than 40% - testing <strong>not passed</strong>;
            </li>
            <li className={S.ratingRow}>
              from 55% to 70% - score <strong>«pass»</strong>;
            </li>
            <li className={S.ratingRow}>
              from 70% to 90% - score <strong>«good»</strong>;
            </li>
            <li className={S.ratingRow}>
              from 90% - score <strong>«excellent»</strong>.
            </li>
          </ul>
        </span>
      </div>
      <p className={CS.notification}>
        <span className={CS.warning}>Warning: After running the test, you can not leave the page</span>
      </p>
    </>
  )
}

export default TestInfo
