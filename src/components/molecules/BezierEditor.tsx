import React, { useRef, useState } from 'react'

import Curve from '../atoms/Curve'
import Handle from '../atoms/Handle'

interface BezierEditorProps {
  curveWidth: number
  handleRadius: number
  handleStroke: number
  onChange: (value: CubicBezier) => void
  value: CubicBezier
}

export const BezierEditor = ({
  curveWidth,
  handleRadius,
  handleStroke,
  onChange,
  value,
}: BezierEditorProps) => {
  const [down, setDown] = useState<any>(0)
  const [hover, setHover] = useState<any>(0)

  const width = 300
  const height = 300
  const padding = [10, 10, 10, 10]
  const aRef = useRef<SVGSVGElement>(null!)

  const onDownHandle = (h: number) => () => {
    setHover(null)
    setDown(h)
  }

  const onEnterHandle = (h: number) => () => {
    if (!down) {
      setHover(h)
    }
  }

  const onLeaveHandle = () => () => {
    if (!down) {
      setHover(null)
    }
  }

  const onDownHandle1 = onDownHandle(1)
  const onDownHandle2 = onDownHandle(2)
  const onEnterHandle1 = onEnterHandle(1)
  const onEnterHandle2 = onEnterHandle(2)
  const onLeaveHandle1 = onLeaveHandle()
  const onLeaveHandle2 = onLeaveHandle()

  const onDownLeave = (e: any) => {
    if (down) {
      onDownMove(e)
      setDown(null)
    }
  }

  const positionForEvent = (e: any) => {
    const rect = aRef.current.getBoundingClientRect()
    return [e.clientX - rect.left, e.clientY - rect.top]
  }

  const x = (value: any) => {
    const w = width - padding[1] - padding[3]
    return Math.round(padding[3] + value * w)
  }

  const y = (value: any) => {
    const h = height - padding[0] - padding[2]
    return Math.round(padding[0] + (1 - value) * h)
  }

  const inversey = (y: any) => {
    const clampMargin = 2 * handleRadius
    const h = height - padding[0] - padding[2]
    y = Math.max(clampMargin, Math.min(y, height - clampMargin))
    return 1 - (y - padding[0]) / h
  }

  const inversex = (x: number) => {
    const w = width - padding[1] - padding[3]
    return Math.max(0, Math.min((x - padding[3]) / w, 1))
  }

  const onDownMove = (e: any) => {
    if (down) {
      e.preventDefault()
      const i = 2 * (down - 1)
      const [x, y] = positionForEvent(e)
      value[i] = inversex(x)
      value[i + 1] = inversey(y)
      onChange(value)
    }
  }

  const onDownUp = () => {
    setDown(0)
  }

  const sharedProps = {
    xFrom: x(0),
    yFrom: y(0),
    xTo: x(1),
    yTo: y(1),
  }

  const containerEvents = !down
    ? {}
    : {
        onMouseMove: onDownMove,
        onMouseUp: onDownUp,
        onMouseLeave: onDownLeave,
      }
  const handle1Events = down
    ? {}
    : {
        onMouseDown: onDownHandle1,
        onMouseEnter: onEnterHandle1,
        onMouseLeave: onLeaveHandle1,
      }
  const handle2Events = down
    ? {}
    : {
        onMouseDown: onDownHandle2,
        onMouseEnter: onEnterHandle2,
        onMouseLeave: onLeaveHandle2,
      }

  return (
    <svg ref={aRef} width={300} height={300} {...containerEvents}>
      <Curve {...sharedProps} value={value} curveWidth={curveWidth} />
      <g>
        <Handle
          {...sharedProps}
          {...handle1Events}
          index={0}
          xval={value[0]}
          yval={value[1]}
          handleRadius={handleRadius}
          down={down === 1}
          hover={hover === 1}
          handleStroke={handleStroke}
        />
        <Handle
          {...sharedProps}
          {...handle2Events}
          index={1}
          xval={value[2]}
          yval={value[3]}
          handleRadius={handleRadius}
          down={down === 2}
          hover={hover === 2}
          handleStroke={handleStroke}
        />
      </g>
    </svg>
  )
}
