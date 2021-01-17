import React from 'react'

import BezierComponent from './BezierComponent'

export default class Handle extends BezierComponent {
  shouldComponentUpdate(nextProps) {
    if (super.shouldComponentUpdate(nextProps)) return true
    const {
      index,
      handleRadius,
      hover,
      down,
      handleStroke,
      xval,
      yval,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
    } = this.props
    return (
      nextProps.index !== index ||
      nextProps.handleRadius !== handleRadius ||
      nextProps.hover !== hover ||
      nextProps.down !== down ||
      nextProps.handleStroke !== handleStroke ||
      nextProps.xval !== xval ||
      nextProps.yval !== yval ||
      nextProps.onMouseDown !== onMouseDown ||
      nextProps.onMouseLeave !== onMouseLeave ||
      nextProps.onMouseEnter !== onMouseEnter
    )
  }

  render() {
    const { x, y } = this
    const {
      index,
      handleRadius,
      hover,
      down,
      handleStroke,
      xval,
      yval,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
    } = this.props

    const sx = x(index)
    const sy = y(index)
    const cx = x(xval)
    const cy = y(yval)
    const a = Math.atan2(cy - sy, cx - sx)
    const cxs = cx - handleRadius * Math.cos(a)
    const cys = cy - handleRadius * Math.sin(a)

    return (
      <g>
        <line
          stroke="#f00"
          strokeWidth={hover || down ? 1 + handleStroke : handleStroke}
          x1={cxs}
          y1={cys}
          x2={sx}
          y2={sy}
        />
        <circle
          cx={cx}
          cy={cy}
          r={handleRadius}
          stroke="#f00"
          strokeWidth={hover || down ? 2 * handleStroke : handleStroke}
          fill="#f00"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
        />
      </g>
    )
  }
}
