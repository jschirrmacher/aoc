type Pos = {
  index: number
  dir: number
  symbol?: string
}

export function findPath(rawData: string) {
  const tiles = rawData.replace(/\n/g, "")
  const width = rawData.split("\n").at(0)?.length!
  const [U, D, L, R] = [-width, width, -1, 1]
  const reverseDir = {
    [-width]: "U",
    [width]: "D",
    [-1]: "L",
    [1]: "R",
  }

  function getStart(): Pos {
    const index = tiles.indexOf("S")
    if (index > width && ["7", "F", "|"].includes(tiles[index + U])) return { index, dir: U }
    if (index % width > 0 && ["L", "F", "-"].includes(tiles[index + L])) return { index, dir: L }
    if (index % width < width - 1 && ["J", "7", "-"].includes(tiles[index + R]))
      return { index, dir: R }
    return { index: index, dir: D }
  }

  function goNextStep({ index, dir }: Pos) {
    if (dir !== D && index > width && ["J", "L", "|"].includes(tiles[index])) return U
    if (dir !== R && index % width > 0 && ["7", "J", "-"].includes(tiles[index])) return L
    if (dir !== L && index % width < width - 1 && ["F", "L", "-"].includes(tiles[index])) return R
    return D
  }

  const symbolMapping = {
    LL: "-",
    LU: "7",
    LD: "J",
    RR: "-",
    RU: "L",
    RD: "F",
    UU: "|",
    UL: "L",
    UR: "J",
    DD: "|",
    DL: "F",
    DR: "7",
  } as Record<string, string>

  function getSymbol(startDir: number, endDir: number) {
    const key = `${reverseDir[startDir]}${reverseDir[endDir]}`
    if (!symbolMapping[key]) {
      throw new Error(`Unexpected combination ${key}`)
    }
    return symbolMapping[key]
  }

  let pos = getStart()
  const start = pos
  const path = [] as Pos[]
  do {
    path.push(pos)
    const index = pos.index + pos.dir
    pos = { index, dir: goNextStep({ index, dir: pos.dir }) }
    pos.symbol = tiles[pos.index]
  } while (pos.index !== start.index)

  path[0].symbol = getSymbol(start.dir, pos.dir)
  return path
}
