export default function (rawData: string) {
  const cards = rawData
    .split("\n")
    .filter(row => row)
    .map(row => row.split(":"))
    .map(([, numbers]) =>
      numbers.split("|").map(numbers =>
        numbers
          .split(" ")
          .filter(num => num)
          .map(Number)
      )
    )
    .map(([winning, having]) => having.filter(num => winning.includes(num)))
    .filter(card => card.length)
    .map(card => Math.pow(2, card.length - 1))
    .reduce((acc, val) => acc + val, 0)

  return JSON.stringify(cards, null, 2)
}
