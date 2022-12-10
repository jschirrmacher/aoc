import { groupsOf, splitLines } from "../../utils"
import { CPU, Instruction } from "./common"

function CRT() {
  const pixels = Array(6 * 40).fill("")

  return {
    pixels,

    draw(cycle: number, value: number) {
      pixels[cycle - 1] = [value, value + 1, value + 2].includes(cycle % 40) ? "#" : "."
    },
  }
}

export default function (rawData: string) {
  const crt = CRT()
  const cpu = CPU(cpu => crt.draw(cpu.cycle, cpu.X))

  splitLines(rawData).map(line => {
    const [instruction, value] = line.split(" ")
    cpu.exec(instruction as Instruction, Number(value))
  })

  return (
    "\n" +
    groupsOf(40, crt.pixels)
      .map(group => group.join(""))
      .join("\n") +
    "\n"
  )
}
