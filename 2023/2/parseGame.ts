import { Color, CubeSet } from "./types"

export function parseGame(line: string) {
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
