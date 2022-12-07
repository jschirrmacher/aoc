import { splitLines, sum } from "../../utils"
import { parseStructure } from "./common"

export default function (rawData: string) {
  const fileSystem = parseStructure(splitLines(rawData))
  const largeFolders = fileSystem
    .traverse()
    .filter(entry => entry.type === "dir" && entry.size! < 100000)

  return sum(largeFolders.map(dir => dir.size as number))
}
