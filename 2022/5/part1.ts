import { splitBlocks, splitLines } from "../../utils"
import { getCrates, parse } from "./common"

export default function (rawData: string) {
  const [stacks, instructions] = splitBlocks(rawData).map(splitLines)
  const crates = getCrates(stacks)

  parse(instructions).forEach(({ num, from, to }) => {
    for (let i = 0; i < num; i++) {
      crates[to].unshift(crates[from].shift() as string)
    }
  })

  return crates.map(crate => crate.shift()).join("")
}
