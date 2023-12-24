import { splitBlocks, splitLines, mod, times } from "../../utils"

const directions = [">", "v", "<", "^"]

function parseInput(rawData: string) {
  const [part1, part2] = splitBlocks(rawData)
  const board = splitLines(part1)
    .map(row => row.split(""))
    .map(row => ({
      start: row.findIndex(c => c !== " "),
      end: row.length - 1,
      row,
    }))

  const path = [] as [number, string][]
  let pos = 0
  while (pos < part2.length - 1) {
    const num = parseInt(part2.substring(pos))
    pos += ("" + num).length
    path.push([num, part2.charAt(pos++)])
  }

  return { board, path }
}

export default function (rawData: string) {
  const { board, path } = parseInput(rawData)

  const current = { x: board[0].start, y: 0, d: 0 }

  function moveTo(newX: number, newY: number) {
    if (board[newY].row[newX] === ".") {
      current.x = newX
      current.y = newY
    }
  }

  function moveRight() {
    moveTo(current.x + 1 < board[current.y].end ? current.x + 1 : board[current.y].start, current.y)
  }

  function moveLeft() {
    moveTo(current.x - 1 > board[current.y].start ? current.x - 1 : board[current.y].end, current.y)
  }

  function moveUp() {
    const lastRow = board.map(row => row.row[current.x]).join("").length - 1
    moveTo(current.x, current.y > 0 && board[current.y - 1].row[current.x] !== " " ? current.y -1 : lastRow)
  }

  function moveDown() {}

  const way = path.map(([num, dir]) => {
    ;[
      () => times(num, moveRight),
      () => times(num, moveDown),
      () => times(num, moveLeft),
      () => times(num, moveUp),
    ][current.d]()
    current.d = mod(current.d + (dir === "R" ? 1 : -1), 4)
    return Object.values(current)
  })

  return "\n" + way.join("\n") + "\n"
}
