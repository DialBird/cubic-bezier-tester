import { useMount } from 'ahooks'
import anime from 'animejs'
import React, { useState } from 'react'

import { MoveBall } from '../atoms/MoveBall'

interface MoveBallAreaProps {
  value: CubicBezier
}

export const MoveBallArea = ({ value }: MoveBallAreaProps) => {
  const [position, setPosition] = useState(0)

  const animationState = {
    position: 0,
  }

  const startAnimation = () => {
    anime({
      targets: animationState,
      position: 300,
      duration: 1000,
      value: [0, 100],
      easing: `cubicBezier(${value.join(',')})`,
      update: (anim) => {
        setPosition(animationState.position)
      },
    })
  }

  useMount(() => {
    startAnimation()
  })

  return (
    <div
      onClick={startAnimation}
      className="relative h-20"
      style={{ width: '300px' }}
    >
      <MoveBall position={position} />
    </div>
  )
}
