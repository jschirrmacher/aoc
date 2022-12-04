import { overlap, Range, splitLines } from "../../utils"

export default function (rawData: string) {
  const pairs = splitLines(rawData).map(line =>
    line.split(",").map(range => range.split("-").map(Number) as Range)
  )
  return pairs.map(pair => overlap(pair[0], pair[1], true)).filter(p => p).length
}
