import { directions, order, parseMap } from "./lib"

type Position = [number, number]

export default function (rawData: string) {
  const labMap = parseMap(rawData)
  const [rows, cols] = [labMap.length, labMap[0].length]
  const flattenedMap = labMap.flatMap((row, x) =>
    row.map((cell, y) => ({ cell, pos: [x, y] as Position })),
  )
  const start = flattenedMap.find(({ cell }) => directions[cell])

  if (!start) {
    throw new Error("No start found")
  }

  return flattenedMap
    .filter(({ cell }) => cell === ".")
    .filter(({ pos }) => simulateWithObstacle(pos)).length

  function simulateWithObstacle(pos: Position) {
    const newLabMap = labMap.map(row => [...row])
    newLabMap[pos[0]][pos[1]] = "#"
    let position = start!.pos
    let direction = directions[start!.cell]
    const visited = new Set<string>()
    visited.add(`${position.join(",")},${direction}`)

    do {
      const [nextX, nextY] = [position[0] + direction[0], position[1] + direction[1]]

      if (nextX < 0 || nextX >= rows || nextY < 0 || nextY >= cols) {
        return false
      }

      const nextPositionKey = `${nextX},${nextY},${direction}`
      const cell = newLabMap[nextX][nextY]
      if (visited.has(nextPositionKey)) {
        return true
      }

      if (cell === "#") {
        const index = order.findIndex(dir => dir[0] === direction[0] && dir[1] === direction[1])
        direction = order[(index + 1) % 4]
      } else {
        position = [nextX, nextY]
        visited.add(nextPositionKey)
      }
    } while (true)
  }
}
