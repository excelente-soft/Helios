import React, { useCallback, useEffect, useState } from 'react'

type UseOutsideType = [state: boolean, toggle: () => void]

export const useOutside = (ref: React.RefObject<HTMLElement>): UseOutsideType => {
  const [toggleState, setState] = useState(false)
  const toggle = useCallback(() => setState((state) => !state), [])

  const listener = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Element)) {
        return
      }

      setState(false)
    },
    [ref]
  )

  useEffect(() => {
    if (toggleState) {
      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)
    } else {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [toggleState, listener])

  return [toggleState, toggle]
}
