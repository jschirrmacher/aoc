import { extractColumns } from "./lib"

export default function (rawData: string) {
  const [col1, col2] = extractColumns(rawData)
  return col1.reduce((acc, val, index) => acc + Math.abs(val - col2[index]), 0)
}
