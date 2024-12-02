export function extractColumns(rawData: string) {
  const [col1, col2] = rawData
    .split("\n")
    .map(row => row.split(/\s+/).map(Number))
    .reduce(
      ([list1, list2], row) => [list1.concat(row[0]), list2.concat(row[1])],
      [[] as number[], [] as number[]]
    )

  return [col1.sort((a, b) => a - b), col2.sort((a, b) => a - b)]
}
