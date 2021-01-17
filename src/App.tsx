import React from 'react'

import { AnimationApplyButton } from './components/atoms/AnimationApplyButton'
import { AnimationBallArea } from './components/molecules/AnimationBallArea'
import { BezierEditor } from './components/molecules/BezierEditor'
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
    // NOTE: ONLY show first three action
    let cnt = 0
    for (let k in animationTemplates) {
      if (cnt > 2) break

      lst.push(
        <AnimationApplyButton
          onClick={() => setValue(animationTemplates[k])}
          label={k}
        />,
      )

      cnt += 1
    }
    return lst
  }

  return (
    <div className="container mx-auto" style={{ width: '450px' }}>
      <h1 className="text-4xl font-bold my-4 text-center">Bezier Tester</h1>
      <AnimationBallArea value={value} />
      <div className="grid grid-cols-footer gap-4 my-4">
        <div className="flex flex-col justify-between items-center gap-y-4">
          {renderButtons()}
        </div>
        <div className="border flex justify-center items-center p-2">
          <BezierEditor
            curveWidth={3}
            handleRadius={6}
            handleStroke={3}
            onChange={setValue}
            value={value}
          />
        </div>
      </div>
      <p className="text-2xl text-center">{cubicBezierFormat(value)}</p>
    </div>
  )
}

export default App
