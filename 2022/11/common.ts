import { splitLines } from "../../utils"

export type Monkey = {
  items: string[]
  operation: string
  divisor: number
  then: number
  else: number
  inspections: number
}

export function parse(block: string) {
  const info = splitLines(block)
    .map(line => line.split(":").map(s => s.trim()))
    .reduce((info, [key, val]) => ({ ...info, [key]: val }), {} as Record<string, string>)

  return {
    items: info["Starting items"].split(","),
    operation: info["Operation"].replace("new = ", ""),
    divisor: Number(info["Test"].replace("divisible by ", "")),
    then: Number(info["If true"].replace("throw to monkey ", "")),
    else: Number(info["If false"].replace("throw to monkey ", "")),
    inspections: 0,
  } as Monkey
}

