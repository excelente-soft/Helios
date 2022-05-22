import { memo, useEffect, useState } from 'react'

import { STARS_COUNT } from '@constants'

import S from './StarsPlate.module.scss'

const StarsPlate = () => {
  const [starPositions, setStarPositions] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    const innerWidth = window.innerWidth
    const starPositions = new Array(STARS_COUNT)
      .fill(0)
      .map(() => ({ x: Math.random() * innerWidth, y: Math.random() * innerWidth }))
    setStarPositions(starPositions)
  }, [])

  return (
    <div className={S.plate}>
      {starPositions.map(({ x, y }) => (
        <div key={x} className={S.star} style={{ top: x, left: y, width: x / 55 + 5, height: x / 55 + 5 }}></div>
      ))}
    </div>
  )
}
export const MemoizedStarsPlate = memo(StarsPlate)
