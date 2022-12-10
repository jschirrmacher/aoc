import { splitLines } from "../../utils"

export default function (rawData: string) {
  const splitted = splitLines(rawData)
  const grid = splitted.map(row => row.split("").map(Number))
  const rows = splitted.length
  const cols = splitted[0].length

  function findShorterTrees(height: number, x: number, y: number, dX: number, dY: number): number {
    if (x + dX < 0 || x + dX >= cols || y + dY < 0 || y + dY >= rows) {
      return 0
    }
    if (grid[y + dY][x + dX] >= height) {
      return 1
    }
    return 1 + findShorterTrees(height, x + dX, y + dY, dX, dY)
  }

  const scores = grid.flatMap((row, y) =>
    row.map(
      (height, x) =>
        findShorterTrees(height, x, y, 0, -1) *
        findShorterTrees(height, x, y, -1, 0) *
        findShorterTrees(height, x, y, 0, 1) *
        findShorterTrees(height, x, y, 1, 0)
    )
  )

  return Math.max(...scores)
}
