import { parseIntegers, splitLines } from "../../utils"

export type Coord3d = [number, number, number]
export type World = Set<string>

export function parse3dCoords(rawData: string) {
  const positions = splitLines(rawData).map(row => parseIntegers(row, ",", Number) as Coord3d)
  return { positions, world: new Set(positions.map(([x, y, z]) => `${x},${y},${z}`)) as World }
}

export function numberOfNeighbors([x, y, z]: Coord3d, world: World) {
  return [
    world.has(`${x - 1},${y},${z}`),
    world.has(`${x + 1},${y},${z}`),
    world.has(`${x},${y - 1},${z}`),
    world.has(`${x},${y + 1},${z}`),
    world.has(`${x},${y},${z - 1}`),
    world.has(`${x},${y},${z + 1}`),
  ].filter(b => b).length
}
