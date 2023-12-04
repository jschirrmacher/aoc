export default function (rawData: string) {
  const rows = rawData.split("\n")
  const partNos: number[] = []
  rows.map((line, rowNo) => {
    let digits = ""
    line.split("").forEach((char, index) => {
      if (char.match(/\d/)) {
        digits += char
      } else {
        digits = memorizeIfPartNo(digits, rowNo, index)
      }
    })
    memorizeIfPartNo(digits, rowNo, line.length)
  })

  return JSON.stringify(
    partNos.reduce((sum, val) => sum + val, 0),
    null,
    2
  )

  function memorizeIfPartNo(digits: string, rowNo: number, index: number) {
    if (digits.length) {
      const start = index - digits.length - 1
      const subStart = Math.max(start, 0)
      const prev = start >= 0 ? rows[rowNo][start] : ""
      const next = index < rows[0].length ? rows[rowNo][index] : ""
      const above = rowNo > 0 ? rows[rowNo - 1].substring(subStart, index + 1) : ""
      const below = rowNo < rows.length - 1 ? rows[rowNo + 1].substring(subStart, index + 1) : ""

      if ((above + prev + next + below).match(/[^\.\d]/)) {
        partNos.push(+digits)
      }
    }
    return ""
  }
}
