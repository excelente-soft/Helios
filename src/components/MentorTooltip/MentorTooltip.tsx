import { TooltipProps } from 'recharts'
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'

import S from './MentorTooltip.module.scss'

type IMentorTooltipProps = TooltipProps<ValueType, NameType>

const MentorTooltip: React.VFC<IMentorTooltipProps> = ({ payload, label, active }) => {
  const hasPayload = active && payload && payload.length > 0
  if (hasPayload) {
    return (
      <div className={S.tooltip}>
        <p className={S.label}>{label}</p>
        <p className={S.info}>{`rating: ${payload[0].payload?.review}`}</p>
        <p className={S.info}>{`review: ${payload[0].payload?.rating}`}</p>
      </div>
    )
  }

  return null
}

export default MentorTooltip
