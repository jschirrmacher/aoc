const bag = {
  red: 12,
  green: 13,
  blue: 14,
}

type Bag = typeof bag
type Color = keyof Bag
type CubeSet = [number, Color][][]

export default function (rawData: string) {
  const games = rawData
    .split("\n")
    .filter(l => l)
    .map(parseGame)
    .filter(possible)

  return games.map(([game]) => game).reduce((sum, game) => sum + game, 0)
}

function parseGame(line: string) {
  const { game, cubes } = line.match(/Game (?<game>\d+): (?<cubes>.*)/)!.groups!
  return [
    +game,
    cubes.split(";").map(value =>
      value
        .split(",")
        .map(v => v.trim().split(" "))
        .map(([num, color]) => [+num, color as Color])
    ),
  ] as [number, CubeSet]
}

function possible([, cubeSet]: [number, CubeSet]) {
  return cubeSet.every(cubes => cubes.every(canBeInBag))
}

function canBeInBag([num, color]: [number, Color]) {
  return num <= bag[color]
}
