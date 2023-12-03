import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { join, resolve } from "path"
import { hrtime } from "process"

type SolveFunc = (rawData: string) => number | string | Promise<number | string>

async function runModule(
  part: number,
  dir: string,
  inputFile: string,
  module: { default: SolveFunc }
) {
  const input = resolve(dir, inputFile)
  if (existsSync(input)) {
    const data = readFileSync(input, "utf8")
    const start = hrtime.bigint()
    try {
      const result = await module.default(data)
      console.log(
        `Result of part ${part} on day ${day.getDate()} (${inputFile}): ${result} (${
          (hrtime.bigint() - start) / 1_000_000n
        }ms)`
      )
    } catch (error) {
      console.error(error)
    }
  } else {
    console.log(`No ${inputFile} defined for day ${day.getDate()}`)
  }
}

async function run(part: number) {
  function getFileName(baseName: string) {
    if (existsSync(resolve(dir, `${baseName}${part}.txt`))) {
      return `${baseName}${part}.txt`
    }
    return `${baseName}.txt`
  }

  const fileName = resolve(dir, `part${part}.ts`)
  if (existsSync(fileName)) {
    const module = await import(fileName)
    runModule(part, dir, getFileName("testdata"), module)
    runModule(part, dir, getFileName("input"), module)
  } else {
    console.log(`Part ${part} is not defined for day ${day.getDate()}`)
  }
}

const day = new Date(process.env.DAY || Date.now())
let dir = ""
if (day.getDate() < 26 && day.getMonth() === 11) {
  dir = resolve(process.cwd(), "" + day.getFullYear(), "" + day.getDate())
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, "input.txt"), "")
    writeFileSync(join(dir, "testdata.txt"), "")
    writeFileSync(
      join(dir, "part1.ts"),
      "export default function (rawData: string) {\n  return 0\n}\n"
    )
    writeFileSync(
      join(dir, "part2.ts"),
      "export default function (rawData: string) {\n  return 0\n}\n"
    )
  }
}

;(async function () {
  run(1)
  run(2)
})()
