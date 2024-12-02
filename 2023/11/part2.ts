export default function (rawData: string) {
  const lines = rawData.split("\n")
  const width = lines.at(0)!.length
  const height = lines.length

  const data = lines.flatMap((row, rowNo) =>
    row
      .split("")
      .map((ch, index) => (ch === "#" ? [rowNo, index] : []))
      .filter(c => c.length)
  )

  const emptyRows = leftOut(get(data, 0), height)
  const emptyCols = leftOut(get(data, 1), width)

  const universe = data.map(([y, x]) => [
    y + 10 * emptyRows.filter(e => y >= e).length,
    x + 10 * emptyCols.filter(e => x >= e).length,
  ])

  const pathLengths = universe.flatMap((coord, index) =>
    universe
      .filter((_, i) => i > index)
      .map(other => Math.abs(other[0] - coord[0]) + Math.abs(other[1] - coord[1]))
  )
  return pathLengths.reduce((acc, val) => acc + val, 0)
}

function get<T>(arr: T[][], num: number) {
  return arr.map(el => el[num])
}

function leftOut(numbers: number[], count: number) {
  const contained = uniqueSortNums(numbers)
  return getNumbers(count).filter(num => !contained.includes(num))
}

function getNumbers(num: number) {
  return Array(num)
    .fill(0)
    .map((_, i) => i)
}

function uniqueSortNums(numbers: number[]) {
  return [...new Set(numbers)].sort()
}
