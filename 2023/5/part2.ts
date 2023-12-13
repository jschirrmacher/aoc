import { Range } from "./Range.js"
import { Mapping } from "./Mapping.js"

function numericAttributes(object: { [key: string]: string }) {
  return Object.fromEntries(Object.entries(object!).map(([key, value]) => [key, Number(value)]))
}

function parseBlock(block: string) {
  const mappingInfoPattern = /(?<to>\d+) (?<from>\d+) (?<count>\d+)/g
  return block
    .split("\n")
    .map(line => line.matchAll(mappingInfoPattern))
    .map(([match]) => match?.groups!)
    .map(numericAttributes)
    .map(({ to, from, count }) => ({ to: +to, from: +from, count: +count }))
    .map(({ to, from, count }) => Mapping(Range(from, from + count - 1), to - from))
}

export default function (rawData: string) {
  const blocks = rawData.split("\n\n")
  const seedData = blocks
    .shift()!
    .match(/seeds: (.*)/)!
    .at(0)!
  const seedRanges = [...seedData.matchAll(/(?<from>\d+) (?<length>\d+)/gs)]
    .map(match => match.groups!)
    .map(numericAttributes)
    .map(({ from, length }) => Range(from, from + length - 1))

  const MappingBlockPattern = /(?<from>\w+)(-to-)(?<to>\w+) map:\s*(?<block>.*)/gs
  const mappings = Object.fromEntries(
    blocks
      .map(block => block.matchAll(MappingBlockPattern))
      .map(([match]) => match?.groups!)
      .map(({ from, to, block }) => [from, { to, mappings: parseBlock(block) }])
  )

  return Math.min(...seedRanges.flatMap(range => mapRange(range).map(r => r.from)))

  function mapRange(range: Range, type = "seed"): Range[] {
    if (!mappings[type]) {
      return [range]
    }
    const relevantMappings = mappings[type].mappings
      .filter(mapping => range.intersect(mapping.source))
      .map(mapping => Mapping(range.intersect(mapping.source)!, mapping.offset))

    const result = relevantMappings.reduce(
      ({ unmapped, mapped }, mapping) => {
        const result = { unmapped: [], mapped } as { unmapped: Range[]; mapped: Range[] }
        unmapped.forEach(range => {
          const i = range.intersect(mapping.source)
          if (i) {
            if (range.from < i.from) {
              result.unmapped.push(Range(range.from, i.from - 1))
            }
            result.mapped.push(i.offset(mapping.offset))
            if (range.to > i.to) {
              result.unmapped.push(Range(i.to + 1, range.to))
            }
          }
        })
        return result
      },
      { unmapped: [range], mapped: [] as Range[] }
    )

    const dest = mappings[type].to
    return [...result.unmapped, ...result.mapped].flatMap(range => mapRange(range, dest))
  }
}
