const cardValues = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  T: 9,
  J: 10,
  Q: 11,
  K: 12,
  A: 13,
}

type Card = keyof typeof cardValues

const handSize = 5
const numCards = Object.values(cardValues).length
const maxCardStrength = Math.pow(numCards, handSize)

export default function (rawData: string) {
  const hands = rawData
    .split("\n")
    .map(line => line.split(" "))
    .map(([hand, bid]) => ({ hand: hand.split("") as Card[], bid: +bid }))

  const sortedHands = hands
    .map(({ hand, bid }) => ({ bid, strength: getStrength(hand) }))
    .sort((a, b) => a.strength - b.strength)

  return sortedHands.map(({ bid }, rank) => bid * (rank + 1)).reduce((acc, val) => acc + val, 0)
}

function getStrength(hand: Card[]) {
  return getType(hand) * maxCardStrength + getCardStrength(hand)
}

function getType(cards: Card[]) {
  const distribution = cards.reduce((distribution, card) => {
    distribution[card] = (distribution[card] || 0) + 1
    return distribution
  }, {} as Record<string, number>)

  const values = Object.values(distribution).sort((a, b) => b - a)
  if (values[0] === 5) {
    return 7
  } else if (values[0] === 4) {
    return 6
  } else if (values[0] === 3) {
    return values[1] === 2 ? 5 : 4
  } else if (values[0] === 2) {
    return values[1] === 2 ? 3 : 2
  }
  return 1
}

function getCardStrength(cards: Card[]) {
  return cards.reduce((acc, card) => acc * numCards + cardValues[card], 0)
}
