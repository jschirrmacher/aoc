import { findPath } from "./findPath"

const mapping = {
  "O|": "I",
  OF: "1",
  OL: "2",
  "1J": "I",
  "17": "O",
  "1-": "1",
  "2J": "O",
  "27": "I",
  "2-": "2",
  "I|": "O",
  IF: "2",
  IL: "1",
} as Record<string, string>

export default function (rawData: string) {
  const path = findPath(rawData)
  const sortedPath = path.sort((a, b) => a.index - b.index)
  const result = sortedPath.reduce(
    (acc, pos) => ({
      count: acc.state === "I" ? acc.count + pos.index - acc.last - 1 : acc.count,
      state: mapping[acc.state + pos.symbol!],
      last: pos.index,
    }),
    { state: "O", count: 0, last: -1 }
  )

  return result.count
}
