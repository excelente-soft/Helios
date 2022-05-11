import { motion } from 'framer-motion'

import S from './ProgressBar.module.scss'

interface IProgressBarProps {
  duration: number
  percent: number
}

const ProgressBar: React.VFC<IProgressBarProps> = ({ duration, percent }) => {
  return (
    <div className={S.progressLine}>
      <motion.div className={S.progress} animate={{ width: `${percent}%`, transition: { duration } }}></motion.div>
    </div>
  )
}

export default ProgressBar
