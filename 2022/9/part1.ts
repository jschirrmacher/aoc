import { splitLines, times } from "../../utils"
import { Coord, coord, moveMap } from "./common"

export default function (rawData: string) {
  let headPos = coord(0, 0)
  let tailPos = coord(0, 0)
  const tailPositions = new Set([`${tailPos}`])

  function move(dir: Coord) {
    headPos = headPos.add(dir)
    const diff = headPos.diff(tailPos)
    if (Math.abs(diff.x) > 1 || Math.abs(diff.y) > 1) {
      if (headPos.x !== tailPos.x && headPos.y !== tailPos.y) {
        tailPos = tailPos.add(coord(diff.x / Math.abs(diff.x), diff.y / Math.abs(diff.y)))
      } else {
        tailPos = tailPos.add(dir)
      }
      tailPositions.add(`${tailPos}`)
    }
  }

  splitLines(rawData)
    .map(line => line.split(" ") as [keyof typeof moveMap, number])
    .forEach(([dir, num]) => times(num, () => move(moveMap[dir])))

  return tailPositions.size
}
