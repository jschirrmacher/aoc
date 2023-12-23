import { getDistribution } from "./Distribution"
import { getStrengthFunc, getTypeFromDistribution, solve } from "./Deck"

export default function (rawData: string) {
  const cards = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"]
  return solve(rawData, getStrengthFunc(cards, 5, getType))
}

function getType(hand: string[]) {
  const distribution = getDistribution(hand)

  const values = Object.entries(distribution)
    .filter(([card]) => card !== "J")
    .map(([, num]) => num)
    .sort((a, b) => b - a)
  if (distribution["J"]) {
    if (values.length === 0) {
      return 7
    }
    values[0] += distribution["J"]
  }

  return getTypeFromDistribution(values[0], values[1])
}
