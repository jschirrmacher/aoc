export interface Range {
  from: number
  to: number
  size: number
  intersect(range: Range): Range | undefined
  offset(offset: number): Range
  toString(): string
}

export function Range(from: number, to: number): Range {
  return {
    from,
    to,
    get size() {
      return to - from + 1
    },
    intersect(range) {
      if (to >= range.from && from <= range.to) {
        return Range(Math.max(from, range.from), Math.min(to, range.to))
      }
    },
    offset(offset: number) {
      return Range(from + offset, to + offset)
    },
    toString() {
      return `[${from}-${to}]`
    },
  }
}
