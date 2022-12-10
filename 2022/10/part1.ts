import { splitLines } from "../../utils"
import { CPU, Instruction } from "./common"

export default function (rawData: string) {
  let sum = 0
  const cpu = CPU(cpu => {
    if ((cpu.cycle - 20) % 40 === 0) {
      sum += cpu.X * cpu.cycle
    }
  })
  splitLines(rawData).map(line => {
    const [instruction, value] = line.split(" ")
    cpu.exec(instruction as Instruction, Number(value))
  })
  return sum
}
