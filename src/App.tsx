import BezierEditor from 'bezier-easing-editor'
import React from 'react'

import { AnimationApplyButton } from './components/atoms/AnimationApplyButton'
import { AnimationBallArea } from './components/molecules/AnimationBallArea'
import { useCubicBezier } from './hooks/useCubicBezier'
import { cubicBezierFormat } from './utils'

const animationTemplates: {
  [key: string]: CubicBezier
} = {
  linear: [0.0, 0.0, 1.0, 1.0],
  easeInOut: [0.4, 0.0, 0.6, 1.0],
  fastOutLinearIn: [0.5, 0.0, 1.0, 1.0],
  easeOut: [0.0, 0.0, 0.6, 1.0],
}

function App() {
  const [value, setValue] = useCubicBezier()

  const renderButtons = () => {
    const lst = []
    for (let k in animationTemplates) {
      lst.push(
        <AnimationApplyButton
          onClick={() => setValue(animationTemplates[k])}
          label={k}
        />,
      )
    }
    return lst
  }

  return (
    <div className="App">
      <h1>Bezier</h1>
      <AnimationBallArea value={value} />
      {renderButtons()}
      <BezierEditor
        className="bezier"
        value={value}
        onChange={setValue}
        handleStroke={3}
        handleRadius={6}
        curveWidth={3}
      >
        <text x={0} y={16} fill="#f00">
          Controlled Bezier Editor
        </text>
      </BezierEditor>
      <p>{cubicBezierFormat(value)}</p>
    </div>
  )
}

export default App
