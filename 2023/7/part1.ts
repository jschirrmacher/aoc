import { getDistribution } from "./Distribution"
import { getStrengthFunc, getTypeFromDistribution, solve } from "./Deck"

export default function (rawData: string) {
  const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]
  return solve(rawData, getStrengthFunc(cards, 5, getType))
}

function getType(hand: string[]) {
  const distribution = getDistribution(hand)
  const values = Object.values(distribution).sort((a, b) => b - a)
  return getTypeFromDistribution(values[0], values[1])
}
