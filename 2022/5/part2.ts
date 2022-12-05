import { splitBlocks, splitLines } from "../../utils"
import { getCrates, parse } from "./common"

export default function (rawData: string) {
  const [stacks, instructions] = splitBlocks(rawData).map(splitLines)
  const crates = getCrates(stacks)

  parse(instructions).forEach(({ num, from, to }) => {
    crates[to].unshift(...crates[from].splice(0, num))
  })

  return crates.map(crate => crate.shift()).join("")
}
