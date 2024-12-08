export type Direction = [number, number]

export function parseMap(rawData: string): string[][] {
  return rawData
    .trim()
    .split("\n")
    .map(line => line.split(""))
}

export const directions: Record<string, Direction> = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [0, -1],
}
export const order: Direction[] = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]

export interface Position {
  cell: string
  position: [number, number]
}
