export function solve(rawData: string, getStrength: (hand: string[]) => number) {
  return rawData
    .split("\n")
    .map(line => line.split(" "))
    .map(([hand, bid]) => ({ hand: hand.split(""), bid: +bid }))
    .map(({ hand, bid }) => ({ bid, strength: getStrength(hand) }))
    .sort((a, b) => a.strength - b.strength)
    .map(({ bid }, rank) => bid * (rank + 1))
    .reduce((acc, val) => acc + val, 0)
}

export function getStrengthFunc(
  cards: string[],
  handSize: number,
  getType: (hand: string[]) => number
) {
  const cardValues = Object.fromEntries(cards.map((card, index) => [card, index]))
  const numCards = cards.length
  const maxCardStrength = Math.pow(numCards, handSize)

  return function getStrength(hand: string[]) {
    const cardStrength = hand.reduce((acc, card) => acc * numCards + cardValues[card], 0)
    return getType(hand) * maxCardStrength + cardStrength
  }
}

export function getTypeFromDistribution(first: number, second: number) {
  if (first === 5) {
    return 7
  } else if (first === 4) {
    return 6
  } else if (first === 3) {
    return second === 2 ? 5 : 4
  } else if (first === 2) {
    return second === 2 ? 3 : 2
  }
  return 1
}
