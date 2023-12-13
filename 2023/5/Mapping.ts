import { Range } from "./Range.js"

export interface Mapping {
  source: Range
  offset: number
  toString(): string
}

export function Mapping(source: Range, offset: number): Mapping {
  return {
    source,
    offset,
    toString() {
      return `${source.toString()} -> ${source.offset(offset)}`
    }
  }
}
