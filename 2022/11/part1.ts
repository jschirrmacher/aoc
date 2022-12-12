import { splitBlocks, times } from "../../utils"
import { Monkey, parse } from "./common"

export default function (rawData: string) {
  function round(monkeys: Monkey[]) {
    monkeys.forEach(monkey => {
      monkey.items.forEach(item => {
        monkey.inspections++
        const newLevel = Math.floor(eval(monkey.operation.replaceAll("old", item)) / 3)
        const dest = monkey[newLevel % monkey.divisor === 0 ? "then" : "else"]
        monkeys[dest].items.push("" + newLevel)
      })
      monkey.items.length = 0
    })
    return monkeys
  }

  return times(20, round, splitBlocks(rawData).map(parse))
    .map(m => m.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((product, val) => product * val, 1)
}
