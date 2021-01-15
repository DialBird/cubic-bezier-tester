import BezierEditor from 'bezier-easing-editor'
import React, { useState } from 'react'

import { cubicBezierFormat } from './utils'

function App() {
  const [value, _setValue] = useState<number[]>([0, 0, 1, 1])
  const setValue = (val: number[]) => {
    val = val.map((v) => Math.round(v * 1000) / 1000)
    _setValue(val)
  }

  return (
    <div className="App">
      <h1>Bezier</h1>
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
