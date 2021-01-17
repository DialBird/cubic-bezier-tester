import { useMount } from 'ahooks'
import anime from 'animejs'
import React, { useRef, useState } from 'react'

import { MoveBall } from '../atoms/MoveBall'

interface AnimationBallAreaProps {
  value: CubicBezier
}

export const AnimationBallArea = ({ value }: AnimationBallAreaProps) => {
  const [position, setPosition] = useState(0)
  const [balls, setBalls] = useState<JSX.Element[]>([])
  const countRef = useRef(0)

  const animationState = {
    position: 0,
  }

  const startAnimation = () => {
    setBalls([])
    anime({
      targets: animationState,
      position: 300,
      duration: 1000,
      value: [0, 100],
      easing: `cubicBezier(${value.join(',')})`,
      update: (anim) => {
        setPosition(animationState.position)
        if (countRef.current % 5 === 0) {
          setBalls((prev) => {
            return [
              ...prev,
              <MoveBall position={animationState.position} shadow={true} />,
            ]
          })
        }
        countRef.current += 1
      },
    })
  }

  useMount(() => {
    startAnimation()
  })

  return (
    <div
      className="relative h-20"
      onClick={startAnimation}
      style={{ width: '300px' }}
    >
      <div className="absolute top-0 left-0">{balls}</div>
      <div className="absolute top-0 left-0">
        <MoveBall position={position} />
      </div>
    </div>
  )
}
