import { memo, useEffect, useRef, useState } from 'react'
import React from 'react'

import { STARS_COUNT } from '@constants'

import S from './StarsPlate.module.scss'

const StarsPlate = () => {
  const [starPositions, setStarPositions] = useState<{ x: number; y: number; size: number }[]>([])
  const plateRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const indent = 10
    const starPositions = new Array(STARS_COUNT).fill(0).map(() => ({
      x: Math.round(Math.abs(Math.random() * 100 - indent)),
      y: Math.round(Math.abs(Math.random() * 100 - indent)),
      size: Math.ceil(Math.abs(Math.random()) * 10),
    }))
    setStarPositions(starPositions)
  }, [])

  return (
    <div ref={plateRef} className={S.plate}>
      {starPositions.map(({ x, y, size }, i) => (
        <div key={i} className={S.star} style={{ top: `${x}%`, left: `${y}%`, width: size, height: size }}></div>
      ))}
    </div>
  )
}
export const MemoizedStarsPlate = memo(StarsPlate)
