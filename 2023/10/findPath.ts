type PosAndDir = {
  pos: number
  dir: number
}

export function findPath(rawData: string) {
  const tiles = rawData.replace(/\n/g, "")
  const width = rawData.split("\n").at(0)?.length!
  const [U, D, L, R] = [-width, width, -1, 1]

  function getStart() {
    const pos = tiles.indexOf("S")
    if (pos > width && ["7", "F", "|"].includes(tiles[pos + U])) return { pos, dir: U }
    if (pos % width > 0 && ["L", "F", "-"].includes(tiles[pos + L])) return { pos, dir: L }
    if (pos % width < width - 1 && ["J", "7", "-"].includes(tiles[pos + R])) return { pos, dir: R }
    return { pos, dir: D }
  }

  function goNextStep({ pos, dir }: PosAndDir) {
    if (dir !== D && pos > width && ["J", "L", "|"].includes(tiles[pos])) return U
    if (dir !== R && pos % width > 0 && ["7", "J", "-"].includes(tiles[pos])) return L
    if (dir !== L && pos % width < width - 1 && ["F", "L", "-"].includes(tiles[pos])) return R
    return D
  }

  const posAndDir = getStart()
  const startPos = posAndDir.pos
  const path = [] as PosAndDir[]
  do {
    path.push(posAndDir)
    posAndDir.pos = posAndDir.pos + posAndDir.dir
    posAndDir.dir = goNextStep(posAndDir)
  } while (posAndDir.pos !== startPos)
  return path
}
