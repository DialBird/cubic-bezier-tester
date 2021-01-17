import { useState } from 'react'

export const useCubicBezier = () => {
  const [value, _setValue] = useState<CubicBezier>([0.0, 0.0, 1.0, 1.0])

  const setValue = (val: CubicBezier) => {
    val = val.map((v) => Math.round(v * 1000) / 1000) as CubicBezier
    _setValue(val)
  }

  return [value, setValue] as [CubicBezier, (val: CubicBezier) => void]
}
