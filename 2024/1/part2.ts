import { extractColumns } from "./lib"

export default function (rawData: string) {
  const [leftList, rightList] = extractColumns(rawData)

  const frequencyMap = rightList.reduce(
    (acc, num) => ({ ...acc, [num]: (acc[num] || 0) + 1 }),
    {} as Record<number, number>
  )

  return leftList.reduce((acc, num) => acc + (frequencyMap[num] ? num * frequencyMap[num] : 0), 0)
}
