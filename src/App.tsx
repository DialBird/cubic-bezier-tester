import './App.css'

import BezierEditor from 'bezier-easing-editor'
import React, { useState } from 'react'

// type CubicBezier = {
//   x1: number
//   x2: num
// }

function App() {
  const [value, setValue] = useState<number[]>([0, 0, 1, 1])

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
      <p>{value.join(' ')}</p>
    </div>
  )
}

export default App
