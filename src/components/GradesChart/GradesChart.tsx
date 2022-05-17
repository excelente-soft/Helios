import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import Block from '@components/Block/Block'
import { FAKE_USER_COURSE_STATISTICS } from '@constants'
import { IGrade } from '@interfaces/IGrade'

import S from './GradesChart.module.scss'
import CS from '@common.module.scss'

interface IGradesChartProps {
  grades: IGrade[]
}

const GradesChart: React.VFC<IGradesChartProps> = ({ grades }) => {
  const preparedGrades = grades.map((grade) => ({
    ...grade,
    createdAt: new Date(grade.createdAt).toLocaleDateString(),
  }))

  const isUnlocked = preparedGrades.length > 1
  return (
    <Block>
      <h2 className={CS.subtitle}>My rating stats</h2>
      <div className={S.chartContainer}>
        {!isUnlocked && (
          <div className={S.lockContainer}>
            <h2 className={S.locked}>To unlock stats, you need to get at least 2 grades.</h2>
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%" className={`${isUnlocked ? '' : S.blur}`}>
          <AreaChart
            data={isUnlocked ? preparedGrades : FAKE_USER_COURSE_STATISTICS}
            margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey="rating" scale="sequential" />
            <XAxis dataKey="createdAt" />
            <Tooltip animationDuration={100} />
            <Area type="monotone" dataKey="rating" stroke="#19066a" fill="#3a10e5" fillOpacity="1" />
            <Area type="monotone" dataKey="type" stroke="#13b919" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Block>
  )
}

export default GradesChart
