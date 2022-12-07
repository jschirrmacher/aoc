import { splitLines } from "../../utils"
import { parseStructure } from "./common"

export default function (rawData: string) {
  const fileSystem = parseStructure(splitLines(rawData))
  const folders = fileSystem
    .traverse()
    .filter(entry => entry.type === "dir")
    .map(dir => ({ name: dir.name, size: dir.size! }))
  folders.sort((a, b) => a.size - b.size)

  const freeSpace = 70000000 - fileSystem.size!
  const requiredSize = 30000000 - freeSpace
  return folders.find(dir => dir.size > requiredSize)?.size
}
