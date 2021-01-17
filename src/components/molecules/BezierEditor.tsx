import React, { useRef, useState } from 'react'

import { dist } from '../../utils'
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
  const rootRef = useRef<SVGSVGElement>(null!)

  const onDownHandle0 = (e: any) => {
    const [x, y] = positionForEvent(e)
    if (dist(value[0], value[1], x, y) <= dist(value[2], value[3], x, y)) {
      value[0] = x
      value[1] = y
      setDown(1)
    } else {
      value[2] = x
      value[3] = y
      setDown(2)
    }
    setHover(null)
    onChange(value)
  }

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

  const onDownLeave = (e: any) => {
    if (down) {
      onDownMove(e)
      setDown(null)
    }
  }

  const positionForEvent = (e: any) => {
    const rect = rootRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    return [inversex(x), inversey(y)]
  }

  const x = (value: any) => {
    const w = width - padding[1] - padding[3]
    return Math.round(padding[3] + value * w)
  }

  const y = (value: any) => {
    const h = height - padding[0] - padding[2]
    return Math.round(padding[0] + (1 - value) * h)
  }

  const inversex = (x: number) => {
    const w = width - padding[1] - padding[3]
    return Math.max(0, Math.min((x - padding[3]) / w, 1))
  }

  const inversey = (y: any) => {
    const clampMargin = 2 * handleRadius
    const h = height - padding[0] - padding[2]
    y = Math.max(clampMargin, Math.min(y, height - clampMargin))
    return 1 - (y - padding[0]) / h
  }

  const onDownMove = (e: any) => {
    if (down) {
      e.preventDefault()
      const i = 2 * (down - 1)
      const [x, y] = positionForEvent(e)
      value[i] = x
      value[i + 1] = y
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
    ? {
        onMouseDown: onDownHandle0,
      }
    : {
        onMouseMove: onDownMove,
        onMouseUp: onDownUp,
        onMouseLeave: onDownLeave,
      }
  const handle1Events = down
    ? {}
    : {
        onMouseDown: onDownHandle(1),
        onMouseEnter: onEnterHandle(1),
        onMouseLeave: onLeaveHandle,
      }
  const handle2Events = down
    ? {}
    : {
        onMouseDown: onDownHandle(2),
        onMouseEnter: onEnterHandle(2),
        onMouseLeave: onLeaveHandle,
      }

  return (
    <svg ref={rootRef} width={300} height={300} {...containerEvents}>
      <line
        x1="10"
        y1="290"
        x2="290"
        y2="10"
        stroke="#eee"
        strokeWidth={curveWidth}
      />
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
