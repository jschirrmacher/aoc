import { splitLines, sum } from "../../utils"

export default function (rawData: string) {
  const grid = splitLines(rawData).map(row => row.split("").map(Number))

  function visibleFromLeft(grid: number[][]): number[][] {
    function directlyVisibleFromLeft(heights: number[]): number[] {
      let max = -Infinity
      return heights.reduce((visible, height, index) => {
        const next = index === 0 || height > max ? 1 : 0
        max = Math.max(max, height)
        return [...visible, next]
      }, [] as number[])
    }

    return grid.map(row => directlyVisibleFromLeft(row))
  }

  function rotate(grid: number[][]): number[][] {
    const cols = grid[0].length - 1
    return grid[0].map((_, index) => grid.map(row => row[cols - index]))
  }

  const visibilityMatrix = [
    visibleFromLeft(grid).flat(),
    rotate(rotate(rotate(visibleFromLeft(rotate(grid))))).flat(),
    rotate(rotate(visibleFromLeft(rotate(rotate(grid))))).flat(),
    rotate(visibleFromLeft(rotate(rotate(rotate(grid))))).flat(),
  ]

  const combined = visibilityMatrix[0].map(
    (visible, index) =>
      visible ||
      visibilityMatrix[1][index] ||
      visibilityMatrix[2][index] ||
      visibilityMatrix[3][index]
  )
  return sum(combined)
}
