import React from 'react'

interface MoveBallProps {
  position: number
  shadow?: boolean
}

export const MoveBall = ({ position, shadow = false }: MoveBallProps) => {
  return (
    <div
      className={`absolute w-10 h-10 rounded-full bg-red-400 ${
        shadow && 'bg-opacity-30'
      }`}
      style={{ left: position }}
    ></div>
  )
}
