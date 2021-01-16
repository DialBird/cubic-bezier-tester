import React from 'react'

interface MoveBallProps {
  position: number
}

export const MoveBall = ({ position }: MoveBallProps) => {
  return (
    <div
      className="absolute w-10 h-10 rounded-full bg-red-400"
      style={{ left: position }}
    ></div>
  )
}
