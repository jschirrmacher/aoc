import { parseGame } from "./parseGame.js"
import { Bag, Color, CubeSet } from "./types.js"

export const bag: Bag = {
  red: 12,
  green: 13,
  blue: 14,
}

export default function (rawData: string) {
  const games = rawData
    .split("\n")
    .filter(l => l)
    .map(parseGame)
    .filter(possible)

  return games.map(([game]) => game).reduce((sum, game) => sum + game, 0)
}

function possible([, cubeSet]: [number, CubeSet]) {
  return cubeSet.every(cubes => cubes.every(canBeInBag))
}

function canBeInBag([num, color]: [number, Color]) {
  return num <= bag[color]
}
