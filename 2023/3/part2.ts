type Part = [string, number]

export default function (rawData: string) {
  const rows = rawData.split("\n")
  const parts: Part[] = []

  rows.map((line, row) => {
    let digits = ""
    line.split("").forEach((char, col) => {
      if (char.match(/\d/)) {
        digits += char
      } else {
        digits = memorizeIfPart(digits, row, col)
      }
    })
    memorizeIfPart(digits, row, line.length)
  })

  return Object.values(parts.reduce(toGearPositions, {}))
    .filter(gear => gear.length === 2)
    .map(gear => gear[0] * gear[1])
    .reduce((acc, value) => acc + value, 0)

  function memorizeIfPart(value: string, row: number, col: number) {
    if (value.length) {
      const start = Math.max(col - value.length - 1, 0)

      const sub = [
        row > 0 ? rows[row - 1].substring(start, col + 1) : "",
        rows[row].substring(start, col + 1),
        row < rows.length - 1 ? rows[row + 1].substring(start, col + 1) : "",
      ]

      if (sub.join("").match(/(\*)/)) {
        const pos = findGearPos(sub, value, row, start)
        parts.push([row - 1 + pos.row + "-" + (start + pos.col), +value])
      }
    }
    return ""
  }

  function findGearPos(sub: string[], value: string, rowNo: number, start: number) {
    const positions = sub.map(line => line.indexOf("*"))
    const symbolInLines = positions.reduce((acc, line) => (acc += line >= 0 ? 1 : 0), 0)
    if (symbolInLines !== 1) {
      throw new Error(`Symbol not in exactly one line: ${JSON.stringify({ sub, positions })}`)
    }

    const row = positions.findIndex(line => line >= 0)
    return { row, col: positions[row] }
  }

  function toGearPositions(gears: Record<string, number[]>, part: Part) {
    if (!gears[part[0]]) {
      gears[part[0]] = []
    }
    gears[part[0]].push(part[1])
    return gears
  }
}
