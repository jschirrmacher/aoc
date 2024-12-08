import { directions, order, parseMap } from "./lib"

export default function (rawData: string) {
  const labMap = parseMap(rawData)
  const visited = new Set<string>()
  const [rows, cols] = [labMap.length, labMap[0].length]
  const start = labMap
    .flatMap((row, x) => row.map((cell, y) => ({ cell, position: [x, y] as [number, number] })))
    .find(({ cell }) => directions[cell])
  if (!start) {
    throw new Error("No start found")
  }

  let position = start.position
  let direction = directions[start.cell]

  visited.add(position.join(","))

  function moveGuard() {
    const [nextX, nextY] = [position[0] + direction[0], position[1] + direction[1]]

    if (nextX < 0 || nextX >= rows || nextY < 0 || nextY >= cols) {
      return false
    }

    if (labMap[nextX][nextY] === "#") {
      const index = order.findIndex(dir => dir[0] === direction[0] && dir[1] === direction[1])
      direction = order[(index + 1) % 4]
    } else {
      position = [nextX, nextY]
      visited.add(position.join(","))
    }

    return true
  }

  while (moveGuard()) {}

  return visited.size
}
