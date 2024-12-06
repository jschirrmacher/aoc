export default function (rawData: string) {
  const matrix = rawData.split("\n").map(row => row.split(""))
  const containsMandS = (diag: string[]) => diag.includes("M") && diag.includes("S")

  function isXmas(i: number, j: number) {
    return (
      matrix[i][j] === "A" &&
      containsMandS([matrix[i - 1][j - 1], matrix[i + 1][j + 1]]) &&
      containsMandS([matrix[i - 1][j + 1], matrix[i + 1][j - 1]])
    )
  }

  return matrix.flatMap((row, i) =>
    row
      .map((_, j) => ({ i, j }))
      .filter(({ i, j }) => i > 0 && i < matrix.length - 1 && j > 0 && j < row.length - 1)
      .filter(({ i, j }) => isXmas(i, j))
  ).length
}
