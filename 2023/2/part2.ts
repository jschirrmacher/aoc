import { parseGame } from "./parseGame.js"
import { Bag, Color, CubeSet } from "./types.js"

export default function (rawData: string) {
  const games = rawData
    .split("\n")
    .filter(l => l)
    .map(parseGame)
    .map(getMaximums)
    .map(getPower)

  return games.map(([, power]) => power).reduce((sum, power) => sum + power, 0)
}

function getMaximums([game, cubeSet]: [number, CubeSet]) {
  return [game, {
    red: getMaximum("red", cubeSet),
    green: getMaximum("green", cubeSet),
    blue: getMaximum("blue", cubeSet),
  }] as [number, Bag]
}

function getMaximum(color: Color, cubeSet: CubeSet) {
  return Math.max(
    ...cubeSet.flatMap(cubes => cubes.filter(([, c]) => c === color)).map(([num]) => num)
  )
}

function getPower([game, bag]: [number, Bag]) {
  return [game, bag.red * bag.green * bag.blue]
}
