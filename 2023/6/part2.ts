export default function (rawData: string) {
  const [time, distance] = rawData
    .split("\n")
    .map(line => line.match(/.*:\s*([\d\s]+)/))
    .map(m => m?.at(1))
    .map(m => m?.replaceAll(/\s/g, ""))
    .map(Number)

  return getNumberOfWaysToWin(time, distance)
}

function getNumberOfWaysToWin(time: number, distance: number) {
  return [...Array(time)].filter(
    (_, index) => index >= 14 && index <= time - 14 && getDistance(index, time - index) > distance
  ).length
}

function getDistance(pressDuration: number, runDuration: number) {
  return pressDuration * runDuration
}
