export const cubicBezierFormat = (value: number[]) => {
  return `cubic-bezier(${value[0]}, ${value[1]}, ${value[2]}, ${value[3]})`
}

export const dist = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}
