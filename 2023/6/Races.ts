export function getRaces(rawData: string) {
  const nullValues = <T>(m: T) => m
  const [times, distances] = rawData
    .split("\n")
    .map(line => line.match(/.*:\s*([\d\s]+)/))
    .map(m => m?.at(1)?.split(/\s/).map(Number).filter(nullValues))

  return times?.map((time, index) => [time, distances?.at(index)]) as [number, number][]
}
