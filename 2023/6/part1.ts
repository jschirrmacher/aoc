import { getRaces } from "./Races"

export default function (rawData: string) {
  return getRaces(rawData)
    .map(getNumberOfWaysToWin)
    .reduce((acc, val) => acc * val, 1)
}

function getNumberOfWaysToWin([time, distance]: [number, number]) {
  return [...Array(time)].filter((_, index) => getDistance(index, time - index) > distance).length
}

function getDistance(pressDuration: number, runDuration: number) {
  return pressDuration * runDuration
}
