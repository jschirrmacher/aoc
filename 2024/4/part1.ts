export default function (rawData: string) {
  const matrix = rawData.split("\n").map(row => row.split(""))
  const word = "XMAS"
  const wordLength = word.length
  const rows = matrix.length
  const cols = matrix[0].length

  const dirs = [
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ]

  function isMatching(i: number, j: number, k: number) {
    return i >= 0 && i < rows && j >= 0 && j < cols && matrix[i][j] === word[k]
  }

  const isAtPos = (i: number, j: number, dirX: number, dirY: number): boolean =>
    Array(wordLength)
      .fill(0)
      .every((_, k) => isMatching(i + k * dirX, j + k * dirY, k))

  const countAtPos = (i: number, j: number): number =>
    dirs.reduce((count, [dirX, dirY]) => count + (isAtPos(i, j, dirX, dirY) ? 1 : 0), 0)

  return matrix.reduce(
    (total, row, i) => total + row.reduce((rowTotal, _, j) => rowTotal + countAtPos(i, j), 0),
    0
  )
}
