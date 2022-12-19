import { sum } from "../../utils"
import { numberOfNeighbors, parse3dCoords } from "./common"

export default function (rawData: string) {
  const { world, positions } = parse3dCoords(rawData)
  const neighbors = positions.map(pos => numberOfNeighbors(pos, world))
  return sum(neighbors.map(neighbors => 6 - neighbors))
}
