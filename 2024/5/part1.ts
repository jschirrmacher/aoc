import { isUpdateInOrder, Rules } from "./lib"

export default function (rawData: string) {
  const [rulesInput, updatesInput] = rawData.split("\n\n")
  const rules: Rules[] = rulesInput.split("\n").map(line => line.split("|").map(Number) as Rules)

  return updatesInput
    .split("\n")
    .map(line => line.split(",").map(Number))
    .filter(update => isUpdateInOrder(update, rules))
    .reduce((sum, update) => sum + update[Math.floor(update.length / 2)], 0)
}
