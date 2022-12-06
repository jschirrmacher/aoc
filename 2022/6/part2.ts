import { splitLines } from "../../utils"
import { processSignal } from "./common"

export default function (rawData: string) {
  return splitLines(rawData)
    .map(signal => processSignal(signal, 14))
    .map(({ end }) => end)
}
