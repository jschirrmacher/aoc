export type Coord = {
  x: number
  y: number
  add(other: Coord): Coord
  diff(other: Coord): Coord
  toString(): string
}

export const moveMap = {
  R: coord(1, 0),
  L: coord(-1, 0),
  U: coord(0, 1),
  D: coord(0, -1),
}

export function coord(x: number, y: number): Coord {
  return {
    x,
    y,

    add(other: Coord) {
      return coord(this.x + other.x, this.y + other.y)
    },

    diff(other: Coord) {
      return coord(this.x - other.x, this.y - other.y)
    },

    toString() {
      return `${this.x},${this.y}`
    },
  }
}
